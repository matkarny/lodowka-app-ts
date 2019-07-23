import * as React from 'react';
import WelcomeView from './WelcomeView/WelcomeView';
import LoginPanel from './LoginPanel/LoginPanel';
import Register from '../Register/Register';
import { store } from '../../store/UserStore';

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
};

export interface LoginProps {

}

export interface LoginState {
    isUserLoggedIn: boolean,
    isParent: boolean,
    loginStep: number,
    clickedUserId: number,
}

class Login extends React.Component<LoginProps, LoginState> {
    state = {
        isUserLoggedIn: true,
        isParent: true,
        clickedUserId: null,
        loginStep: ActiveStep.FirstStep, // USTAWIĆ
    }

    getUsersData = () => {
        const currentData = store.getState();
        const usersData = currentData.users;
        return usersData;
    }

    handleUserLoginClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({
            clickedUserId: parseInt(e.currentTarget.dataset.id),
            loginStep: ActiveStep.SecondStep
        })
    }

    addNewUser = () => {
        this.setState({ loginStep: ActiveStep.ThirdStep })
    }

    goToWelcomeView = () => {
        this.setState({ loginStep: ActiveStep.FirstStep })
    }



    render() {
        return (
            <>
                {this.state.loginStep === ActiveStep.FirstStep && <WelcomeView
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    isParent={true}
                    getUsersData={this.getUsersData}
                    userClick={this.handleUserLoginClick}
                    newMemberClick={this.addNewUser}
                />}
                {this.state.loginStep === ActiveStep.SecondStep && <LoginPanel
                    clickedUserId={this.state.clickedUserId}
                    getUsersData={this.getUsersData}
                    goToWelcomeView={this.goToWelcomeView}
                />}
                {this.state.loginStep === ActiveStep.ThirdStep && <Register
                    goToWelcomeView={this.goToWelcomeView} />}
            </>
        );
    }
}

export default Login;