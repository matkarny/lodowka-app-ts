import React from 'react';
import WeatherCard from './WeatherCard';
import './WeatherWidget.scss';
import axios from 'axios';

class WeatherWidget extends React.Component {
  render() {
    return (
      <div>
        <WeatherCard
          weatherIconName={'wi wi-day-rain'}
          tempDegrees={'26°C'}
          tempDesc={'Cloudy and rainy'}
        />
      </div>
    );
  }
}

export default WeatherWidget;
