import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Authenticator from './Authenticator';
import { store, login, logout } from '../store/storeConfigure';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    nameValue: ''
  };

  onChange = e => {
    this.setState({ nameValue: e.target.value });
  };

  login = () => {
    const users = store.getState().users;
    const user = users.find(user => user.name === this.state.nameValue);
    if (user) {
      Authenticator.authenticate(user.id, () => {
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    } else console.log('User not found');
  };

  render() {
    const { from } = { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div style={{ backgroundColor: 'yellowgreen' }}>
        <p>You must log in to view the page</p>

        <input
          type="text"
          placeholder="name"
          value={this.state.nameValue}
          onChange={this.onChange}
        />
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
