use crate::agent;
use http::Request;
use serde::Deserialize;
use std::cell::RefCell;
use std::rc::Rc;
use yew::format::{Format, Json, Nothing};
use yew::prelude::*;
use yew::services::{
    fetch::*, ConsoleService, FetchService, IntervalService, Task, TimeoutService,
};
use yew::{html, Component, ComponentLink, Html, ShouldRender};

pub struct Model {
    link: ComponentLink<Self>,
    console: ConsoleService,
    agentTimer: Box<dyn Bridge<agent::Worker>>,
    name: String,
    counter: i32,
}

#[derive(Clone, Properties, PartialEq)]
pub struct Properties {
    pub name: String,
}

pub enum Msg {
    AgentCounterChannel(agent::Response),
    Subscribe,
    StartStop,
    Hit,
}

impl Component for Model {
    type Message = Msg;
    type Properties = Properties;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        let callback = link
            .clone()
            .callback(|response| Msg::AgentCounterChannel(response));
        let mut m = Model {
            link: link,
            console: ConsoleService::new(),
            agentTimer: agent::Worker::bridge(callback),
            name: props.name,
            counter: 0,
        };
        m.agentTimer.send(agent::Request::Subscribe);
        m
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.name = props.name;
        true
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::AgentCounterChannel(response) => match response {
                agent::Response::SetCounterTo(to) => self.counter = to,
            },
            Msg::Hit => self.console.log("Agent HIT"),
            Msg::Subscribe => {
                self.agentTimer.send(agent::Request::Subscribe);
                self.console.log("Subscribe...");
            }
            Msg::StartStop => {
                self.agentTimer.send(agent::Request::StartStop);
            }
        }
        true
    }

    fn view(&self) -> Html {
        html! {
            <div>
                <button onclick=self.link.callback(|_| Msg::Subscribe)>{ &self.name } {" + "} { self.counter }</button>
                <button onclick=self.link.callback(|_| Msg::StartStop)>{ "Start/Stop" }</button>
            </div>
        }
    }
}
