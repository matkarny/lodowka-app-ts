import React from 'react';
import axios from 'axios';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';
import WeatherCard from './WeatherCard';
import { Coords, WeatherResponse } from '../../common/interfaces/Weather';
/*
This component on DidMount gets geolocation and based on returned coords calls OpenWeatherAPI. Repeat every 60 seconds.
Both coords and data from API are stored in state. When state properties are not null the WeatherCard gets rendered with formatted weather data as props.

*/
export interface WeatherProps {}

interface WeatherState {
  coords: Coords | null;
  data: WeatherResponse | null;
}

class Weather extends React.Component<WeatherProps, WeatherState> {
  state: WeatherState = {
    data: null,
    coords: null
  };

  /* Maki API call and format selected weather data, then update state */
  async makeWeatherAPICall(): Promise<any> {
    let { lat, lon } = this.state.coords;
    // lat = '25'; // Dubai
    // lon = '37';

    // lat = '-77'; // Antartica
    // lon = '166';

    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
      )
      .then(response => {
        //   console.log(response);
        const dataFormatted = {
          description: response.data.weather[0].description,
          main: response.data.weather[0].main,
          temperature: response.data.main.temp.toString().substr(0, 2),
          windSpeed: +response.data.wind.speed, // + converts string to number
          cloudiness: +response.data.clouds.all
        };
        this.setState({ data: dataFormatted });

        return <div>{'elo'}</div>;
      })
      .catch(response => {
        console.log('# Error while calling API #\n', response);
      });
  }

  /* Get geolocation, then make call to OpenWeatherAPI based on coords, then update state */
  async makeCallByGeoloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          lat: position.coords.latitude.toString().substr(0, 5),
          lon: position.coords.longitude.toString().substr(0, 5)
        };
        this.setState({ coords: coords });
        this.makeWeatherAPICall();
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  prepareWeather() {
    if (this.state.data && this.state.coords) {
      const {
        temperature,
        description,
        windSpeed,
        cloudiness
      } = this.state.data;

      let iconDescription = '';
      let weatherDescription = '';
      let windDescription = windSpeed >= 4.2 ? 'Windy' : 'Not windy';
      let cloudsDescription = cloudiness > 25 ? 'Scattered clouds' : 'Cleary';
      if (cloudiness > 50) cloudsDescription = 'Cloudy';

      if (description.length > 0) {
        iconDescription = 'day-sunny-overcast ';
        weatherDescription = `${cloudsDescription}`;
      }

      if (description === 'clear sky') {
        iconDescription = 'day-sunny';
        weatherDescription = `${cloudsDescription} and sunny`;
      }

      if (description === 'light rain') {
        iconDescription = 'rain';
        weatherDescription = `${cloudsDescription} and rainy`;
      }

      return (
        <div>
          <WeatherCard
            temperature={`${temperature}°C`}
            iconDescription={`wi wi-${iconDescription}`}
            main={`${weatherDescription} `}
            wind={`${windDescription}`}
          />
        </div>
      );
    } else
      return (
        <div>
          <WeatherCard
            temperature={`00°C`}
            iconDescription={`wi wi-horizon`}
            main={``}
            wind={``}
          />
        </div>
      );
  }

  componentDidMount() {
    this.makeCallByGeoloc();
    try {
      setInterval(() => this.makeCallByGeoloc(), 60000); // 60 sec interval is minimal at OpenWeatherAPI
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }

  render() {
    return <div>{this.prepareWeather()}</div>;
  }
}

export default Weather;
