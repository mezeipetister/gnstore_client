use serde::{Deserialize, Serialize};
use yew::services::IntervalService;
use yew::services::Task;
use yew::worker::*;

pub struct Worker {
    link: AgentLink<Worker>,
    counter: i32,
    job: Option<Box<dyn Task>>,
    clients: Vec<HandlerId>,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Request {
    Subscribe,
    StartStop,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Response {
    SetCounterTo(i32),
}

pub enum Msg {
    Increment,
}

impl Agent for Worker {
    // Available:
    // - `Job` (one per bridge on the main thread)
    // - `Context` (shared in the main thread)
    // - `Private` (one per bridge in a separate thread)
    // - `Public` (shared in a separate thread)
    type Reach = Context; // Spawn only one instance on the main thread (all components can share this agent)
    type Message = Msg;
    type Input = Request;
    type Output = Response;

    // Create an instance with a link to the agent.
    fn create(link: AgentLink<Self>) -> Self {
        Worker {
            link: link.clone(),
            counter: 0,
            job: Some(Box::new(IntervalService::new().spawn(
                std::time::Duration::from_millis(50),
                link.callback(|_| Msg::Increment),
            ))),
            clients: Vec::new(),
        }
    }

    // Handle inner messages (from callbacks)
    fn update(&mut self, msg: Self::Message) {
        match msg {
            Msg::Increment => {
                self.counter += 1;
                for client in &self.clients {
                    self.link
                        .respond(*client, Response::SetCounterTo(self.counter));
                }
            }
        }
    }

    // Handle incoming messages from components of other agents.
    fn handle_input(&mut self, msg: Self::Input, who: HandlerId) {
        match msg {
            Request::Subscribe => {
                let mut exist = false;
                for item in &self.clients {
                    if item == &who {
                        exist = true;
                    }
                }
                if exist {
                    self.clients
                        .iter()
                        .position(|&x| x == who)
                        .map(|p| self.clients.remove(p));
                } else {
                    self.clients.push(who);
                }
                // self.link
                //     .respond(who, Response::Answer("That's cool!".into()));
            }
            Request::StartStop => {
                if self.job.is_some() {
                    self.job = None;
                } else {
                    self.job = Some(Box::new(IntervalService::new().spawn(
                        std::time::Duration::from_millis(50),
                        self.link.callback(|_| Msg::Increment),
                    )));
                }
            }
        }
    }
}
