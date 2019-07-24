import React from 'react';
import { withRouter } from 'react-router-dom';
import Authenticator from './Authenticator';

const LogoutButton = withRouter(({ history }) =>
  Authenticator.isAuthenticated ? (
    <div>
      <div className="auth-button">
        <button
          className="dashboard__button dashboard__button--secondary"
          onClick={() => {
            Authenticator.signout(() => history.push('/'));
          }}
        >
          ◉
        </button>
      </div>
    </div>
  ) : (
    <p>You are not logged in.</p>
  )
);

export default LogoutButton;
