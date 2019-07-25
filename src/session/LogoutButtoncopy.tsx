import React from 'react';
import { withRouter } from 'react-router-dom';
import Authenticator from './Authenticator';
import { connect } from 'react-redux';
import { LOGOUT_USER } from '../store/actions/AuthActions';
import { IUser } from '../common/interfaces/Users';

export interface LogoutProps {
  auth: number[];
  logoutUser;
}

export interface LogoutState {
  auth: number[];
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch({ type: LOGOUT_USER })
  };
};

const mapStateToProps = state => ({ auth: state.auth });

const LogoutButton = withRouter(({ history }) => {
  //console.log('LOGOUT BUTTON');
  return class Logout extends React.Component<LogoutProps, LogoutState> {
    state = { auth: [] };
    render() {
      console.log('LOGOUT BUTTON');
      return (
        <div>
          Authenticator.isAuthenticated ? (
          <div>
            <div className="auth-button">
              <button
                className="dashboard__button dashboard__button--secondary"
                onClick={() => {
                  Authenticator.signout(() => history.push('/'));
                  this.props.logoutUser();
                }}
              >
                ◉
              </button>
            </div>
          </div>
          ) : (<p>You are not logged in.</p>)
        </div>
      );
    }
  };
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);

// const mapDispatchToProps = dispatch => {
//   return {
//     loginUser: (userId: number) =>
//       dispatch({ type: LOGIN_USER, payload: userId }),
//     logoutUser: () => dispatch({ type: LOGOUT_USER })
//   };
// };

// const mapStateToProps = state => ({ auth: state.auth, users: state.users });

// export default _LogoutButton;

// const LogoutButton = connect(dispatch => {return},null )(_LogoutButton)
