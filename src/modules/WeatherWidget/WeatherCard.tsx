import * as React from 'react';
import './WeatherWidget.scss';

export interface Props {
  icon: string;
  description: string;
  temperature: string;
  wind: number;
}

class WeatherCard extends React.Component<Props> {
  render() {
    return (

      <div className="weather">
        <i className={`weather__icon wi wi-${this.props.icon}`} />
        <div className="temperature">
          <span className="temperature__degrees">
            {this.props.temperature}°C
          </span>
          <span className="temperature__desc">
            {this.props.description}
            <p className="temperature__wind">Wind: {this.props.wind}m/s</p>
          </span>
        </div>
        </div>
    );
  }
}

export default WeatherCard;