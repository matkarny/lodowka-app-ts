import * as React from 'react';
import './LoginPanel.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import StoreType from '../../../common/types/StoreType';
import { LOGIN_USER, LOGOUT_USER } from '../../../store/actions/AuthActions';
import { IUser } from '../../../common/interfaces/Users';
import authenticator from '../../../session/Authenticator';
import { any } from 'prop-types';

export interface LoginPanelProps {
  clickedUserId: number;
  getUsersData: any;
  goToWelcomeView: any;
  auth: number[];
  loginUser;
  authFunc;
}

export interface LoginPanelState {
  inputValue: string;
  isErrorVisible: boolean;
  clickedUserData: object;
  //   redirectToReferrer: boolean;
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userId: number) => {
      console.log('login userId', userId);
      dispatch({ type: LOGIN_USER, payload: userId });
    },
    logoutUser: () => dispatch({ type: LOGOUT_USER, payload: -1 })
  };
};

const mapStateToProps = state => ({ users: state.users, auth: state.auth });

class LoginPanel extends React.Component<LoginPanelProps, LoginPanelState> {
  state = {
    inputValue: '',
    isErrorVisible: false,
    clickedUserData: null
    // redirectToReferrer: false,
  };
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
          isErrorVisible: false
        });
        console.log('ACCESS GRANTED');
        this.props.loginUser(this.state.clickedUserData.id);
        authenticator.authenticate(() => {
          this.props.authFunc();
        });
      } else {
        this.setState({
          isErrorVisible: true
        });
      }
    }
  };

  componentDidMount() {
    const usersData = this.props.getUsersData();
    const clickedUserList = usersData.filter(user => {
      return user.id === this.props.clickedUserId;
    });

    const clickedUser = clickedUserList[0];
    this.setState({ clickedUserData: clickedUser });
  }


  render() {
    return (
      <>
        <div className="login-pin__container">
          <div className="login-pin__wrapper">

            <p className="login-pin__title">Insert your PIN</p>
            <div className="login-pin__items-wrapper">

              <input
                type='password'
                className="login-pin__input"
                value={this.state.inputValue}
                onChange={e => { this.inputChangeHandler(e) }}
                pattern="[0-9]{4}"
                maxLength={4}
                minLength={4}
              />
              <p className={`login-pin__error-label ${this.state.isErrorVisible ? 'login-pin__error-label--active' : ''}`}>PIN is invalid</p>
            </div>
          </div>
          <div className="login-confirmation__btn-container">
            <button
              className="login-confirmation__button login-confirmation__button--cancel"
              onClick={this.props.goToWelcomeView}>Back</button>
          </div>
        </div>
      </>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPanel);
