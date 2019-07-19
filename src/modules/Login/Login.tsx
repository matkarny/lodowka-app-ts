import * as React from 'react';
import WelcomeView from './WelcomeView/WelcomeView';
export interface LoginProps {

}

export interface LoginState {

}

class Login extends React.Component<LoginProps, LoginState> {
    state = { h: 1 }
    render() {
        return (
            <WelcomeView />
        );
    }
}

export default Login;