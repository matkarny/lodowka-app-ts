import React from 'react';
import Weather from './Weather';
import './WeatherWidget.scss';
export interface WeatherWidgetProps {}

export interface WeatherWidgetState {
  stuff: string;
}

class WeatherWidgetView extends React.Component<
  WeatherWidgetProps,
  WeatherWidgetState
> {
  state = { stuff: '1' };

  render() {
    return (
      <div>
        <Weather />
      </div>
    );
  }
}

export default WeatherWidgetView;
