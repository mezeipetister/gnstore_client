#![recursion_limit = "5000"]

extern crate failure;
extern crate serde;

pub mod agent;
pub mod button;
pub mod login;

use button::Model as Button;
use login::Model as Login;
use yew::services::{ConsoleService, IntervalService, Task};
use yew::{html, Callback, Component, ComponentLink, Html, ShouldRender};

pub struct Model {
    link: ComponentLink<Self>,
    console: ConsoleService,
}

pub enum Msg {}

impl Component for Model {
    type Message = Msg;
    type Properties = ();

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Model {
            link,
            console: ConsoleService::new(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {}
        true
    }

    fn view(&self) -> Html {
        html! {
            <>
                <Login />
            </>
        }
    }
}
