import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherAPI from './WeatherAPI';
import './WeatherWidget.scss';
export interface WeatherWidgetProps {
  //stuff: string;
}

export interface WeatherWidgetState {
  stuff: string;
}

class WeatherWidget extends React.Component<
  WeatherWidgetProps,
  WeatherWidgetState
> {
  state = { stuff: '1' };
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
