import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Authenticator from './Authenticator';
import './AuthButton.scss';

const AuthButton = withRouter(({ history }) =>
  Authenticator.isAuthenticated ? (
    <div style={{ backgroundColor: 'skyblue' }}>
      {' '}
      AUTHORIZED Welcome!{' '}
      <div className="auth-button">
        <button
          onClick={() => {
            Authenticator.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  ) : (
    <p style={{ backgroundColor: 'skyblue' }}>You are not logged in.</p>
  )
);

export default AuthButton;
