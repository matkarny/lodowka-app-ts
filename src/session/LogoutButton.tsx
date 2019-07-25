import React from 'react';
import { withRouter } from 'react-router-dom';
import Authenticator from './Authenticator';
import { connect } from 'react-redux';
import { LOGOUT_USER } from '../store/actions/AuthActions';

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      console.log('LOGOUT');
      dispatch({ type: LOGOUT_USER, payload: -1 });
    }
  };
};

const LogoutButton = withRouter(({ history, logoutUser }) => {
  return Authenticator.isAuthenticated ? (
    <>
      <div className="auth-button">
        <button
          className="dashboard__button dashboard__button--secondary"
          onClick={() => {
            Authenticator.signout(() => history.push('/'));
            logoutUser();
          }}
        >
          ◉
        </button>
      </div>
    </>
  ) : (
    <p>You are not logged in.</p>
  );
});

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
