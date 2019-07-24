import React, { Component } from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';
import TimeWidget from '../TimeWidget/TimeWidget';
import ProductListWidget from '../ProductListWidget/ProductListWidget';
import NotesWidget from '../NotesWidget/NotesWidget';
import { loadState } from '../../store/globalLocalStorage';
import LogoutButton from '../../session/LogoutButton';
import { store } from '../../store/storeConfigure';
import { Link } from 'react-router-dom';
import * as Routes from '../../common/constants/Routes';

export default class DashboardModule extends Component {
  state = {
    loggedRole: false
  };
  componentDidMount() {
    this.authorize();
    loadState();
  }

  authorize() {
    const { loggedUser } = store.getState();
    const { usersList } = store.getState().users;
    const authUser = usersList.find(user => user.id === loggedUser);
    if (authUser.role === 1) this.setState({ loggedRole: true });
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
        {this.state.loggedRole ? (
          <DrawingComponent />
        ) : (
          <div>NO DRAWING FOR PARENTS</div>
        )}
        <WeatherWidgetView />
        <YoutubeWidget />
        <TimeWidget />
        <ProductListWidget />
        <NotesWidget />
      </div>
    );
  }
}
