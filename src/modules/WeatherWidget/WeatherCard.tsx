import * as React from 'react';
import './WeatherWidget.scss';

export interface Props {
  tempDegrees: string;
  tempDesc: string;
  weatherIconName: string;
}

export interface State {
  tempDegrees: string;
  tempDesc: string;
  weatherIconName: string;
}

class WeatherCard extends React.Component<Props, State> {
  state = {
    tempDegrees: this.props.tempDegrees,
    tempDesc: this.props.tempDesc,
    weatherIconName: this.props.weatherIconName
  };

  render() {
    return (
      <div className="weather-container">
        WEATHER WIDGET COMPONENT
        <div className="weather">
          <i className={`weather__icon ${this.state.weatherIconName}`} />
          <div className="temperature">
            <span className="temperature__degrees">
              {this.state.tempDegrees}
            </span>
            <span className="temperature__desc">{this.state.tempDesc}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
