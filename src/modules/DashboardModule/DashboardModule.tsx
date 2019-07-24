import React from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';
import TimeWidget from '../TimeWidget/TimeWidget';
import ProductListWidget from '../ProductListWidget/ProductListWidget';
import NotesWidget from '../NotesWidget/NotesWidget';
import { loadState } from '../../store/globalLocalStorage';
import { store } from '../../store/storeConfigure';
import { Link } from 'react-router-dom';
import * as Routes from '../../common/constants/Routes';

export default class DashboardModule extends React.Component {
  state = {
    loggedRole: false
  };
  componentDidMount() {
    loadState();
    this.authorize();
  }

  authorize() {
    const { users, currentUserId } = store.getState();
    const authUser = users.find(user => user.id === currentUserId);
    if (authUser.role === 1) this.setState({ loggedRole: true });
  }

  render() {
    return (
      <div className="dashboard-module">
        <div className="dashboard__navi">
          <Link to={Routes.LOGIN} className="full-list__link ">
            <div className="dashboard__button">🡠</div>
          </Link>
          <button className="dashboard__button dashboard__button--secondary">
            ◉
          </button>
        </div>
        {this.state.loggedRole ? (
          <DrawingComponent />
        ) : (
          <div>NO DRAWING FOR YOU</div>
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
