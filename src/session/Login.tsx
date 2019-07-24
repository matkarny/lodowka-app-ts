import React from 'react';
import { Redirect } from 'react-router-dom';
import Authenticator from './Authenticator';
import { store, login, logout } from '../store/storeConfigure';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    pinValue: ''
  };

  loginUser = () => {
    const users = store.getState().users;
    const user = users.find(user => user.pin === this.state.pinValue);
    if (user) {
      Authenticator.authenticate(user.id, () => {
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    } else console.log('User not found');
  };

  render() {
    const { from } = { from: { pathname: '/products' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
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
        <button onClick={this.loginUser}>Log in</button>
      </div>
    );
  }
}

export default Login;
