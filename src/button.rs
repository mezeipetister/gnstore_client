use crate::agent;
use yew::prelude::*;
use yew::{html, Component, ComponentLink, Html, ShouldRender};

pub struct Model {
    link: ComponentLink<Self>,
    name: String,
}

#[derive(Clone, Properties, PartialEq)]
pub struct Properties {
    pub name: String,
}

pub enum Msg {}

impl Component for Model {
    type Message = Msg;
    type Properties = Properties;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Model {
            link: link,
            name: props.name,
        }
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.name = props.name;
        true
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {}
        true
    }

    fn view(&self) -> Html {
        html! {
            <>
                <button class="button">{ &self.name }</button>
            </>
        }
    }
}
