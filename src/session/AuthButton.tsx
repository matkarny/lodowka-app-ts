import React from 'react';
import { withRouter } from 'react-router-dom';
import Authenticator from './Authenticator';
import './AuthButton.scss';
import { store, login, logout, getLoggedUser } from '../store/storeConfigure';

const AuthButton = withRouter(({ history }) =>
  Authenticator.isAuthenticated ? (
    <div style={{ backgroundColor: 'skyblue' }}>
      {(document.title = 'User: ' + getLoggedUser().name)}
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
