import * as React from 'react';
import './WeatherWidget.scss';

export interface Props {
  temperature: string;
  main: string;
  iconDescription: string;
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
            <span className="temperature__desc">{this.props.main}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
