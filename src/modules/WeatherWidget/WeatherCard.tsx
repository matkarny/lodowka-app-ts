import * as React from 'react';
import './WeatherWidget.scss';

export interface Props {
  temperature: string;
  main: string;
  iconDescription: string;
  wind: string;
}

class WeatherCard extends React.Component<Props> {
  render() {
    return (
      <div className="weather-container">
        WEATHER WIDGET COMPONENT
        <div className="weather">
          <i className={`weather__icon ${this.props.iconDescription}`} />
          <div className="temperature">
            <span className="temperature__degrees">
              {this.props.temperature}
            </span>
            <span className="temperature__desc">
              {this.props.main}
              <p className="temperature__wind">{this.props.wind}</p>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
