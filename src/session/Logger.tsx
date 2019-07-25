import React from 'react';
import { Redirect } from 'react-router-dom';
import Authenticator from './Authenticator';
import { connect } from 'react-redux';
import { IUser } from '../common/interfaces/Users';
import StoreType from '../common/types/StoreType';
import { LOGIN_USER, LOGOUT_USER } from '../store/actions/AuthActions';
import { stat } from 'fs';

export interface LoggerProps {
  loginUser;
  logoutUser;
  users: IUser[];
  auth: number[];
}

export interface LoggerState {
  auth: number[];
  users: IUser[];
  redirectToReferrer: boolean;
  pinValue: string;
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

class Logger extends React.Component<LoggerProps, LoggerState> {
  state = {
    auth: [],
    users: [],
    redirectToReferrer: false,
    pinValue: ''
  };

  componentDidMount() {
    this.setState({ users: this.props.users, auth: this.props.auth });
  }

  login = () => {
    const users = this.state.users;
    const user = users.find(user => user.pin === this.state.pinValue);
    console.log('users', users, 'userId', user.id);

    if (user) {
      this.props.loginUser(user.id);
      if (this.state.auth[0] !== -1) document.title = user.name;
      Authenticator.authenticate(() => {
        document.title = user.name;
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    } else console.log('User not found');
  };

  render() {
    const { from } = { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (Authenticator.isAuthenticated && redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div style={{ backgroundColor: 'yellowgreen' }}>
        <p>You must log in to view the page</p>

        <input
          type="text"
          placeholder="pin"
          value={this.state.pinValue}
          onChange={e => this.setState({ pinValue: e.target.value })}
        />
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logger);
