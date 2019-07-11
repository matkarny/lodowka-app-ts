import React, { Component } from 'react'
import "./LoginModule.scss"
import login from "./Images/login.png"
import BasicComponent from "../../common/components/BasicComponent/BasicComponent"

export default class LoginModule extends Component {
    render() {
        return (
            <div className="login-module">
                <div className="login-module__header">
                    <h1> Welcome to Lodówkapp</h1>
                    <p>Start by adding members of your family for a more personalised experience.</p>
                </div>
                <div className="login-module__body">
                <h1> Family members</h1>
                    <p>Tap an avatar to log in as a family member.</p>
                    <BasicComponent>
                        <a href="#"> <img src={login} /> </a>
                         </BasicComponent>
                </div>
                <div className="login-module__footer"></div>


                
            </div>
        )
    }
}
