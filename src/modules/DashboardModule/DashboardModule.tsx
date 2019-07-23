import React, { Component } from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';
import TimeWidget from '../TimeWidget/TimeWidget';
import ProductListWidget from '../ProductListWidget/ProductListWidget';
import NotesWidget from '../NotesWidget/NotesWidget';
import { store, login } from '../../store/storeConfigure';

export default class DashboardModule extends React.Component {
  state = {
    loggedRole: false
  };
  componentDidMount() {
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
