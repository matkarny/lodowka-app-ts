import React from 'react';
import WeatherCard from './WeatherCard';
import './WeatherWidget.scss';

class WeatherWidget extends React.Component {
  render() {
    return (
      <div>
        <WeatherCard
          weatherIconName={'wi wi-day-rain'}
          tempDegrees={'27°C'}
          tempDesc={'Cloudy and rainy'}
        />
      </div>
    );
  }
}

export default WeatherWidget;
