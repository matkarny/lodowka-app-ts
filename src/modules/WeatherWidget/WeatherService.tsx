import React from 'react';

import { WeatherResponse } from '../../common/interfaces/Weather';

export const CLOUDINESS_CLOUDY = 50;
export const CLOUDINESS_SCATTERED = 25;

class WeatherService {
  static prepareWeather(data: WeatherResponse) {
    const dataFormatted = {
      weather: data.weather[0].main,
      main: data.main.temp.toString().substr(0, 2),
      wind: +data.wind.speed,
      clouds: +data.clouds.all
    };
    let { weather, main, wind, clouds } = dataFormatted;
    let iconDescription = '';
    let weatherDescription = '';

    console.log(weather);
    // CLOUDS

    let cloudsDescription =
      clouds > CLOUDINESS_SCATTERED ? 'Scattered clouds' : 'Cleary';
    if (clouds > CLOUDINESS_CLOUDY) cloudsDescription = 'Cloudy';

    if (weather.length > 0) {
      // VARIOUS WEATHER
      iconDescription = 'day-sunny-overcast ';
      weatherDescription = `${cloudsDescription}`;
      console.log('###NORMAL', weather, iconDescription, weatherDescription);

      // CLEAR / SUNNY
      if (weather === 'Clear') {
        iconDescription = 'day-sunny';
        weatherDescription = `${cloudsDescription} and sunny`;
        console.log('###CLEAR', weather, iconDescription, weatherDescription);
      }

      // RAIN
      if (
        weather === 'Rain' ||
        weather === 'Drizzle' ||
        weather === 'Thunderstorm'
      ) {
        iconDescription = 'rain';
        weatherDescription = `${cloudsDescription} and rainy`;
        console.log('###RAIN', weather, iconDescription, weatherDescription);
      }
    }

    console.log(weatherDescription);
    return { iconDescription, weatherDescription, main, wind };
  }
}

export default WeatherService;
