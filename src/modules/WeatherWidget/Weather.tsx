/*
This component when Mounted gets geolocation and based on returned coords calls OpenWeatherAPI. Repeat every 60 seconds.
Both coords and data from API are stored in state. When state properties are not null the WeatherCard gets rendered with formatted weather data as props.
*/

import React from 'react';
import axios from 'axios';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';
import WeatherCard from './WeatherCard';
import {
  PreparedData,
  Coord,
  WeatherResponse
} from '../../common/interfaces/Weather';
import WeatherService from './WeatherService';

export interface WeatherProps {}

interface WeatherState {
  coord: Coord | null;
  data: PreparedData | null;
}

class Weather extends React.Component<WeatherProps, WeatherState> {
  state: WeatherState = {
    data: null,
    coord: null
  };

  /* Maki API call and format selected weather data, then update state */
  async makeWeatherAPICall(): Promise<any> {
    let { lat, lon } = this.state.coord;
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
      )
      .then(response => {
        console.log('# response #', response);
        const weatherData: WeatherResponse = response.data;
        const preparedData = WeatherService.prepareWeather(weatherData);
        this.setState({ data: preparedData });
      })
      .catch(response => {
        console.log('# Error while calling API #\n', response);
      });
  }

  /* Get geolocation and make call to OpenWeatherAPI */
  async makeCallByGeoloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coord = {
          lat: position.coords.latitude.toString().substr(0, 5),
          lon: position.coords.longitude.toString().substr(0, 5)
        };
        this.setState({ coord: coord });
        this.makeWeatherAPICall();
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  componentDidMount() {
    this.makeCallByGeoloc();
    try {
      setInterval(() => this.makeCallByGeoloc(), 60000);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }

  render() {
    return (
      this.state.data &&
      this.state.coord && (
        <div>
          <WeatherCard
            icon={this.state.data.iconDescription}
            description={this.state.data.weatherDescription}
            temperature={this.state.data.main}
            wind={this.state.data.wind}
          />
        </div>
      )
    );
  }
}

export default Weather;
