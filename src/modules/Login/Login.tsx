import * as React from 'react';
import WelcomeView from './WelcomeView/WelcomeView';
import Register from '../Register/Register';
import { getCurrentStore } from '../../store/UserStore';

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
};

const ActiveComponent = {
    [ActiveStep.FirstStep]: WelcomeView,
    [ActiveStep.SecondStep]: WelcomeView, // to change
    [ActiveStep.ThirdStep]: Register,
}

export interface LoginProps {

}

export interface LoginState {
    isUserLoggedIn: boolean,
    isParent: boolean,
    loginStep: number,
}

class Login extends React.Component<LoginProps, LoginState> {
    state = {
        isUserLoggedIn: true,
        isParent: true,
        loginStep: ActiveStep.FirstStep
    }

    getUsersData = () => {
        const currentData = getCurrentStore();
        const usersData = currentData.users;
        return usersData;
    }
    handleUserLoginClick = e => {
        console.log(e.currentTarget.dataset.id);
    }

    addNewUser = () => {
        this.setState({ loginStep: ActiveStep.ThirdStep })
    }
    goToLoginPanel = () => {
        this.setState({ loginStep: ActiveStep.SecondStep })
    }
    goToWelcomeView = () => {
        this.setState({ loginStep: ActiveStep.FirstStep })
    }


    render() {
        const ActiveComp: React.ReactType = ActiveComponent[this.state.loginStep]
        return (
            <>
                {this.state.loginStep === ActiveStep.FirstStep && <WelcomeView
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    isParent={true}
                    getUsersData={this.getUsersData}
                    userClick={this.handleUserLoginClick}
                    newMemberClick={this.addNewUser}
                />}
                {this.state.loginStep === ActiveStep.ThirdStep && <Register goToWelcomeView={this.goToWelcomeView} />}
            </>
        );
    }
}

export default Login;