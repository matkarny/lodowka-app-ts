import React from 'react';
import axios from 'axios';
import { LONGTITUDE, LATITUDE } from '../../common/constants/Coordinates';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';

(async () => {
  const response = await axios({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGTITUDE}&APPID=${WEATHER_API_KEY}`,
    method: 'get'
  });

  console.log(response);
})();

const WeatherAPI: React.FC = () => {
  return <div>api</div>;
};

export default WeatherAPI;
