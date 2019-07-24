import * as React from 'react';
import './LoginPanel.scss';
import * as Routes from '../../../common/constants/Routes';
import {
  store,
  login,
  logout,
  getLoggedUser
} from '../../../store/storeConfigure';
import Authenticator from '../../../session/Authenticator';
import { Redirect, Link } from 'react-router-dom';
export interface LoginPanelProps {
  clickedUserId: number;
  getUsersData: any;
  goToWelcomeView: any;
  redirect();
  loginUser(inputValue);
}

export interface LoginPanelState {
  inputValue: string;
  isErrorVisible: boolean;
  clickedUserData: object;
  // redirectToReferrer: boolean;
}

class LoginPanel extends React.Component<LoginPanelProps, LoginPanelState> {
  state = {
    inputValue: '',
    isErrorVisible: false,
    clickedUserData: null
    // redirectToReferrer: false
  };

  redirectStep = () => {};

  inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = e.target.value;
    const lastChar = targetValue.charAt(targetValue.length - 1);
    const parsedLastChar = parseInt(lastChar);

    if (!isNaN(parsedLastChar) || !targetValue)
      this.setState({
        inputValue: targetValue,
        isErrorVisible: false
      });
    else {
      targetValue = this.state.inputValue;
    }
    if (targetValue.length === 4) {
      if (targetValue === this.state.clickedUserData.pin) {
        this.setState({
          isErrorVisible: false,
          inputValue: targetValue
        });
        console.log('ACCESS GRANTED');

        this.props.loginUser(targetValue);
        this.props.redirect();
        // this.redirectStep();
      } else {
        this.setState({
          isErrorVisible: true
        });
      }
    }
  };

  componentDidMount() {
    const usersData = this.props.getUsersData();
    const clickedUserList = usersData.usersList.filter(user => {
      return user.id === this.props.clickedUserId;
    });

    const clickedUser = clickedUserList[0];
    this.setState({ clickedUserData: clickedUser });
  }

  componentDidUpdate() {
    console.log(this.state.inputValue);
  }

  render() {
    return (
      <>
        <Link to={Routes.DASHBOARD}>Public Page - Login</Link>
        <div className="login-pin__container">
          <p className="login-pin__title">PIN</p>
          <input
            type="password"
            className="login-pin__input"
            value={this.state.inputValue}
            onChange={e => {
              this.inputChangeHandler(e);
            }}
            pattern="[0-9]{4}"
            maxLength={4}
            minLength={4}
          />
          <p
            className={`login-pin__error-label ${
              this.state.isErrorVisible ? 'login-pin__error-label--active' : ''
            }`}
          >
            PIN is invalid
          </p>
          <div className="login-confirmation__btn-container">
            <button
              className="login-confirmation__button login-confirmation__button--cancel"
              onClick={this.props.goToWelcomeView}
            >
              Back
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPanel;
