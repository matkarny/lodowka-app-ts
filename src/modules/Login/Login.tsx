import * as React from 'react';
import './Login.scss';
import WelcomeView from './WelcomeView/WelcomeView';
import LoginPanel from './LoginPanel/LoginPanel';
import Register from '../Register/Register';
import { IUser } from '../../common/interfaces/Users';
import { ADD_USER } from '../../store/actions/UsersActions';
import { connect } from 'react-redux';
import StoreType from '../../common/types/StoreType';

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
};

export interface LoginProps extends Pick<StoreType, 'users'> {

}

export interface LoginState {
    isParentLogged: boolean,
    loginStep: number,
    clickedUserId: string,
    registrationStep: number,
}


const mapStateToProps = state => ({ users: state.users })

class Login extends React.Component<LoginProps, LoginState> {
    state = {
        isParentLogged: true,
        clickedUserId: null,
        loginStep: ActiveStep.FirstStep,
        registrationStep: 0,
    }

    getUsersData = () => {
        const usersData = this.props.users
        return usersData;
    }
    getUsersAndLoggedUserId = () => {
        const usersData = this.props.users;
        // const loggedUserId = currentData.loggedUser;
        return {
            usersData,
            // loggedUserId
        }
    }

    handleUserLoginClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({
            clickedUserId: e.currentTarget.dataset.id,
            loginStep: ActiveStep.SecondStep
        })
    }


    addNewUser = () => {
        this.setState({ loginStep: ActiveStep.ThirdStep })
    }

    goToWelcomeView = () => {
        this.setState({ loginStep: ActiveStep.FirstStep })
    }

    // checkIsParentLogged = () => {

    //     const dataUsers = this.getUsersAndLoggedUserId();

    //     const usersList = dataUsers.usersData;
    //     const loggedUserId = dataUsers.loggedUserId
    //     if (loggedUserId) {

    //         const activeUser = usersList.filter(user => user.id === loggedUserId)
    //         const activeUserRole = activeUser[0].role
    //         if (activeUserRole) {
    //             this.setState({ isParentLogged: true })
    //         }
    //         else { this.setState({ isParentLogged: false }) }

    //     }
    //     else if (!usersList.length) {
    //         this.setState({ isParentLogged: true })
    //     }
    //     else { this.setState({ isParentLogged: false }) }
    // }
    increaseRegistrationStep = () => {
        this.setState(prevState => (
            { registrationStep: prevState.registrationStep + 1 }
        ))
    }
    decreaseRegistrationStep = () => {
        this.setState(prevState => (
            { registrationStep: prevState.registrationStep - 1 }
        ))
    }
    resetRegistartionStep = () => {
        this.setState(
            { registrationStep: 0 }
        )

    }
    render() {
        return (
            <div className={`login-main__container ${this.state.loginStep === ActiveStep.ThirdStep ? 'login-main__container--smaller login-main__container--step-' + this.state.registrationStep : ''
                }`}>

                {this.state.loginStep === ActiveStep.FirstStep && <WelcomeView
                    isParentLogged={this.state.isParentLogged}
                    getUsersData={this.getUsersData}
                    userClick={this.handleUserLoginClick}
                    newMemberClick={this.addNewUser}
                // checkIsParentLogged={this.checkIsParentLogged}
                />}
                {this.state.loginStep === ActiveStep.SecondStep && <LoginPanel
                    clickedUserId={this.state.clickedUserId}
                    getUsersData={this.getUsersData}
                    goToWelcomeView={this.goToWelcomeView}
                />}
                {this.state.loginStep === ActiveStep.ThirdStep && <Register
                    selectClick={this.increaseRegistrationStep}
                    backClick={this.decreaseRegistrationStep}
                    confirmClick={this.resetRegistartionStep}
                    goToWelcomeView={this.goToWelcomeView} />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Login);
