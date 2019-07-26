import React, { Component } from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';
import TimeWidget from '../TimeWidget/TimeWidget';
import ProductListWidget from '../ProductListWidget/ProductListWidget';
import NotesWidget from '../NotesWidget/NotesWidget';
import { loadState } from '../../store/globalLocalStorage';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import * as Routes from '../../common/constants/Routes';
import LogoutButton from '../../session/LogoutButton';
import { connect } from 'react-redux';
import { IUser } from '../../common/interfaces/Users';
import history from '../../history';

export interface DashboardModuleProps {
  auth: string[];
  users: IUser[];
}

export interface DashboardModuleState {
  auth: string[];
  users: IUser[];
  loggedChild: boolean;
}

const mapStateToProps = state => ({ users: state.users, auth: state.auth });

class DashboardModule extends React.Component<
  DashboardModuleProps,
  DashboardModuleState
> {
  state = {
    auth: this.props.auth,
    users: this.props.users,
    loggedChild: false
  };

  componentDidMount() {
    this.authorize();
    loadState();
    console.log('>>', this.state);
  }

  componentDidUpdate() {}

  authorize() {
    const users = this.state.users;
    const authorizedUser = users.find(user => user.id === this.state.auth[0]);
    if (authorizedUser.role === 1) this.setState({ loggedChild: true });
  }

  render() {
    return (
      <div className="dashboard-module">
        <div className="dashboard__navi">
          {this.state.loggedChild ? (
            <div
              className="dashboard__button"
              onClick={() => history.push('/')}
            >
              +
            </div>
          ) : (
            <div />
          )}

          <LogoutButton />
        </div>

        {!this.state.loggedChild ? <DrawingComponent /> : <div />}

        {/* <DrawingComponent /> */}
        <WeatherWidgetView />
        <YoutubeWidget />
        <TimeWidget />
        <ProductListWidget />
        <NotesWidget />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(DashboardModule);
