import React, { Component } from 'react';
import './DashboardModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';
import WeatherWidgetView from '../WeatherWidget/WeatherWidgetView';
import YoutubeWidget from '../YoutubeWidget/YoutubeWidget';

export default class DashboardModule extends Component {
  render() {
    return (
      <div className="dashboard-module">
        <DrawingComponent />
        <WeatherWidgetView />
        <YoutubeWidget />
      </div>
    );
  }
}
