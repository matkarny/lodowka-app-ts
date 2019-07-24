import * as React from 'react';
import WelcomeView from './WelcomeView/WelcomeView';
import LoginPanel from './LoginPanel/LoginPanel';
import Register from '../Register/Register';
import {
  store,
  login,
  logout,
  getLoggedUser
} from '../../store/storeConfigure';
import { Redirect } from 'react-router-dom';
import Authenticator from '../../session/Authenticator';

export enum ActiveStep {
  FirstStep,
  SecondStep,
  ThirdStep
}

export interface LoginProps {}

export interface LoginState {
  isParentLogged: boolean;
  loginStep: number;
  clickedUserId: number;
  redirectToReferrer: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    isParentLogged: true,
    clickedUserId: null,
    loginStep: ActiveStep.FirstStep, // USTAWIĆ,
    redirectToReferrer: false
  };

  redirect = () => {
    console.log('REDIRECTING');
    const { from } = { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;
    console.log(redirectToReferrer);
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
  };

  loginUser = targetValue => {
    console.log('LOGGING');
    const users = store.getState().users.usersList;
    const user = users.find(user => user.pin === targetValue);

    if (user !== undefined) {
      Authenticator.authenticate(user.id, () => {
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    } else console.log('User not found');
  };

  getUsersData = () => {
    const currentData = store.getState();
    const usersData = currentData.users;
    return usersData;
  };
  getUsersAndLoggedUserId = () => {
    const currentData = store.getState();
    const usersData = currentData.users;
    const loggedUserId = currentData.loggedUser;
    return {
      usersData,
      loggedUserId
    };
  };

  handleUserLoginClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({
      clickedUserId: parseInt(e.currentTarget.dataset.id),
      loginStep: ActiveStep.SecondStep
    });
  };

  addNewUser = () => {
    this.setState({ loginStep: ActiveStep.ThirdStep });
  };

  goToWelcomeView = () => {
    this.setState({ loginStep: ActiveStep.FirstStep });
  };

  checkIsParentLogged = () => {
    const dataUsers = this.getUsersAndLoggedUserId();

    const usersList = dataUsers.usersData.usersList;
    const loggedUserId = dataUsers.loggedUserId;
    if (loggedUserId) {
      const activeUser = usersList.filter(user => user.id === loggedUserId);
      const activeUserRole = activeUser[0].role;
      if (activeUserRole) {
        this.setState({ isParentLogged: true });
      } else {
        this.setState({ isParentLogged: false });
      }
    } else if (!usersList.length) {
      this.setState({ isParentLogged: true });
    } else {
      this.setState({ isParentLogged: false });
    }
  };

  render() {
    return (
      <>
        {this.state.loginStep === ActiveStep.FirstStep && (
          <WelcomeView
            isParentLogged={this.state.isParentLogged}
            getUsersData={this.getUsersData}
            userClick={this.handleUserLoginClick}
            newMemberClick={this.addNewUser}
            checkIsParentLogged={this.checkIsParentLogged}
          />
        )}
        {this.state.loginStep === ActiveStep.SecondStep && (
          <LoginPanel
            loginUser={this.loginUser}
            redirect={this.redirect}
            clickedUserId={this.state.clickedUserId}
            getUsersData={this.getUsersData}
            goToWelcomeView={this.goToWelcomeView}
          />
        )}
        {this.state.loginStep === ActiveStep.ThirdStep && (
          <Register goToWelcomeView={this.goToWelcomeView} />
        )}
      </>
    );
  }
}

export default Login;
