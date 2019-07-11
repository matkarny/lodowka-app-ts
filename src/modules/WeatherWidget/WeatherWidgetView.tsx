/*
This component when Mounted gets geolocation and based on returned coords calls OpenWeatherAPI. Repeat every 60 seconds.
*/

import React from 'react';
import WeatherCard from './WeatherCard';
import { PreparedData } from '../../common/interfaces/WeatherInterfaces';
import WeatherService from './WeatherService';

export interface WeatherProps {}

interface WeatherState {
  data: PreparedData | null;
}

class WeatherWidgetView extends React.Component<WeatherProps, WeatherState> {
  state: WeatherState = {
    data: null
  };

  async getData() {
    try {
      let data = await WeatherService.getWeatherData();
      this.setState({ data: data });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.getData();
    try {
      setInterval(() => this.getData(), 60000);
    } catch (e) {
      console.log(e);
    }
    /* 
    try {
      let data = await WeatherServiceNEW.getWeatherData();
      this.setState({ data: data });
    } catch (e) {
      console.log(e);
    }*/
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }

  render() {
    return (
      this.state.data && (
        <WeatherCard
          icon={this.state.data.icon}
          description={this.state.data.description}
          temperature={this.state.data.temperature}
          wind={this.state.data.wind}
        />
      )
    );
  }
}

export default WeatherWidgetView;
