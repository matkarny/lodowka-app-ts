import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherAPI from './WeatherAPI';
import './WeatherWidget.scss';

class WeatherWidget extends React.Component {
  render() {
    return (
      <div>
        <WeatherAPI />
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
