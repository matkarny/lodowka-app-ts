import React, { Component } from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';
import TimeWidget from '../TimeWidget/TimeWidget';
import ProductListWidget from '../ProductListWidget/ProductListWidget';
import NotesWidget from '../NotesWidget/NotesWidget';
import { loadState } from '../../store/globalLocalStorage';
import { Link } from 'react-router-dom';
import * as Routes from '../../common/constants/Routes';
import LogoutButton from '../../session/LogoutButton';
import { connect } from 'react-redux';
import { IUser } from '../../common/interfaces/Users';

export interface DashboardModuleProps {
  auth: number[];
  users: IUser[];
}

export interface DashboardModuleState {
  auth: number[];
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

  componentDidUpdate() { }

  authorize() {
    const loggedUser = this.state.auth;
    const users = this.state.users;
    const authorizedUser = users.find(user => user.id === this.state.auth[0]);
    if (authorizedUser.role === 1) this.setState({ loggedChild: true });

    // const { loggedUser } = store.getState();
    // const { usersList } = store.getState().users;
    // const authUser = usersList.find(user => user.id === loggedUser);
    // if (authUser.role === 1) this.setState({ loggedRole: true });
  }

  render() {
    return (
      <div className="dashboard-module">
        <div className="dashboard__navi">
          <Link to={Routes.LOGIN} className="full-list__link ">
            <div className="dashboard__button">🡠</div>
          </Link>

          <LogoutButton />
        </div>

        {this.state.loggedChild ? (
          <DrawingComponent />
        ) : (
            <div>NO DRAWING FOR PARENTS</div>
          )}

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
