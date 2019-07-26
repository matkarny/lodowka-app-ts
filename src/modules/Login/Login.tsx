import * as React from 'react';
import './Login.scss';
import WelcomeView from './WelcomeView/WelcomeView';
import LoginPanel from './LoginPanel/LoginPanel';
import Register from '../Register/Register';
import { IUser } from '../../common/interfaces/Users';
import { ADD_USER } from '../../store/actions/UsersActions';
import { connect } from 'react-redux';
import StoreType from '../../common/types/StoreType';
import { threadId } from 'worker_threads';
import authenticator from '../../session/Authenticator';
import { Redirect } from 'react-router-dom';

export enum ActiveStep {
  FirstStep,
  SecondStep,
  ThirdStep
}

export interface LoginProps {
  auth: string[];
  users: IUser[];
  location: any;
}

export interface LoginState {
  isParentLogged: boolean;
  loginStep: number;
  clickedUserId: string;
  registrationStep: number;
  auth: string[];
  users: IUser[];
  redirectToReferrer: boolean;
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    isParentLogged: true,
    clickedUserId: null,
    loginStep: ActiveStep.FirstStep,
    registrationStep: 0,
    auth: this.props.auth,
    users: this.props.users,
    redirectToReferrer: false
  };

  componentDidMount() {
    // this.props.location.state.startingAtFirst = true;
    this.redirecter();
  }

  redirecter() {
    console.log('$$$$$', this.props);
  }

  auth = () => {
    this.setState(() => ({
      redirectToReferrer: true
    }));
  };

  getUsersData = () => {
    const usersData = this.props.users;
    return usersData;
  };

  componentDidUpdate() {}

  handleUserLoginClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({
      clickedUserId: e.currentTarget.dataset.id,
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
    // const dataUsers = this.getUsersAndLoggedUserId();

    const usersList = this.props.users;
    const loggedUserId = this.props.auth[0];
    if (loggedUserId !== '-1') {
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

  increaseRegistrationStep = () => {
    this.setState(prevState => ({
      registrationStep: prevState.registrationStep + 1
    }));
  };

  decreaseRegistrationStep = () => {
    this.setState(prevState => ({
      registrationStep: prevState.registrationStep - 1
    }));
  };

  resetRegistartionStep = () => {
    this.setState({ registrationStep: 0 });
  };

  render() {
    //   debugger;
    const { from } = { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (authenticator.isAuthenticated && redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div
        className={`login-main__container ${
          this.state.loginStep === ActiveStep.ThirdStep
            ? 'login-main__container--smaller login-main__container--step-' +
              this.state.registrationStep
            : ''
        }`}
      >
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
            clickedUserId={this.state.clickedUserId}
            getUsersData={this.getUsersData}
            goToWelcomeView={this.goToWelcomeView}
            authFunc={this.auth}
          />
        )}
        {this.state.loginStep === ActiveStep.ThirdStep && (
          <Register
            selectClick={this.increaseRegistrationStep}
            backClick={this.decreaseRegistrationStep}
            confirmClick={this.resetRegistartionStep}
            goToWelcomeView={this.goToWelcomeView}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
