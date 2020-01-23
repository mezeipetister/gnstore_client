use crate::Button;
use yew::services::{ConsoleService, IntervalService, Task};
use yew::{html, Callback, Component, ComponentLink, Html, InputData, ShouldRender};

struct FormLogin {
    username: String,
    password: String,
}

pub struct Model {
    link: ComponentLink<Self>,
    console: ConsoleService,
    formLogin: FormLogin,
}

pub enum Msg {
    Login,
    ForgetPassword,
    UpdateUsername(String),
    UpdatePassword(String),
}

impl Component for Model {
    type Message = Msg;
    type Properties = ();

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Model {
            link,
            console: ConsoleService::new(),
            formLogin: FormLogin {
                username: "".to_owned(),
                password: "".to_owned(),
            },
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Login => self.console.log(&format!(
                "Login! {} - {}",
                self.formLogin.username, self.formLogin.password
            )),
            Msg::ForgetPassword => self.console.log("Forget password!"),
            Msg::UpdateUsername(to) => self.formLogin.username = to,
            Msg::UpdatePassword(to) => self.formLogin.password = to,
        }
        true
    }

    fn view(&self) -> Html {
        html! {
            <>
                <section class="section">
                    <div class="container">
                        <p class="has-text-centered title is-spaced">{"Login"}</p>
                        <p class="subtitle has-text-centered is-size-6">
                            {"Gardenova áruház"}
                            <br/>
                            {"Eladói rendszer"}
                        </p>
                        <div class="columns">
                            <div class="column is-4-desktop is-offset-4-desktop is-12-mobile">
                                <div class="field">
                                    <label class="label">{"Felhasználói név"}</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="pl.: Granny János" value=&self.formLogin.username oninput=self.link.callback(|e: InputData| Msg::UpdateUsername(e.value))/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">{"Jelszó"}</label>
                                    <div class="control">
                                        <input class="input" type="password" placeholder="Erős jelszó" value=&self.formLogin.password oninput=self.link.callback(|e: InputData| Msg::UpdatePassword(e.value))/>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <div class="buttons">
                                            <button class="button is-info is-outlined" onclick=self.link.callback(|_| Msg::Login) >{"Belépés"}</button>
                                            <button class="button" onclick=self.link.callback(|_| Msg::ForgetPassword)>{"Elfelejtett jelszó"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        }
    }
}
