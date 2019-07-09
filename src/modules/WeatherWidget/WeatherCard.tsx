import React from 'react';
import './WeatherCard.scss';

const WeatherCard: React.FC = () => {
  return (
    <div className="weather-container">
      WEATHER WIDGET COMPONENT
      <div className="weather">
        <i className="weather__icon wi wi-day-rain" />
        <div className="temperature">
          <span className="temperature__degrees">26°C</span>
          <span className="temperature__desc">Cloudy and rainy</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
