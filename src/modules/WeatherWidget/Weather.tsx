import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { LONGTITUDE, LATITUDE } from '../../common/constants/Coordinates';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';
import { number } from 'prop-types';
import WeatherCard from './WeatherCard';

// INFO OD MICHAŁA:

// ZMIENIC NAZWE TEJ KLASY Z API NA WEATHER
// GEOLOKACJE ZROBIC Z NAVIGATOREM

// te wszystkie interfejsy zrobily sie z dodatkiem JSON to TS >> ctrl+shift+p >> clipboard (najpierw response json z przegladarki skopiowac do schowka)

// ponizsze interfejsy mozna do common/interfaces/weather
// mozna pousuwac zbedne propertisy

// properties ze '?' są opcjonalne

export interface WeatherProps {}

interface WeatherResponse {
  description: string;
  main: string;
  temperature: string;
  wind: number;
}
interface Coords {
  lat: string;
  lon: string;
}
interface WeatherState {
  coords: Coords | null;
  data: WeatherResponse | null;
}

class Weather extends React.Component<WeatherProps, WeatherState> {
  state: WeatherState = {
    data: null,
    coords: null
  };

  /* Get geolocation, then make call to OpenWeatherAPI based on coords, then update state */
  async prepareWeather() {
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

  /* Maki API call and format selected weather data, then update state*/
  async makeWeatherAPICall(): Promise<any> {
    //  console.log('pos', coords);
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${
          this.state.coords.lat
        }&lon=${this.state.coords.lon}&APPID=${WEATHER_API_KEY}&units=metric`
      )
      .then(response => {
        console.log(response);
        const dataFormatted = {
          description: response.data.weather[0].description,
          main: response.data.weather[0].main,
          temperature: response.data.main.temp.toString().substr(0, 2),
          wind: +response.data.wind.speed // + converts string to number
        };
        this.setState({ data: dataFormatted });

        return <div>{'elo'}</div>;
      })
      .catch(response => {
        console.log('# Error while calling API #\n', response);
      });
  }
  // WIND:
  // 0    - 2,77 m/s >> Windy
  // 3,06 - 5,56 m/s >> Moderate wind
  // 5,84+           >> Strong wind
  //if(wind >= 0 && wind <= 2.77) windDescription = 'and windy';
  //if (wind >= 2.77 && wind <= 5.56) windDescription = 'and moderately windy';
  //if (wind >= 5.84) windDescription = 'and strongly windy';

  renderWeather() {
    if (this.state.data && this.state.coords) {
      const { temperature, description, main, wind } = this.state.data;
      let windDescription = '';
      let mainDescription = main.toLowerCase();
      if (wind >= 4.2) windDescription = 'Windy';

      return (
        <div>
          <WeatherCard
            temperature={`${this.state.data.temperature}°C`}
            iconDescription={`wi wi-${mainDescription}`}
            main={`${windDescription} and ${mainDescription}y `}
          />
        </div>
      );
    } else
      return (
        <div>
          <WeatherCard
            temperature={'26°C'}
            iconDescription={'wi wi-rain'}
            main={'Cloudy and rainy'}
          />
        </div>
      );
  }

  componentDidMount() {
    this.prepareWeather();
    try {
      setInterval(() => this.prepareWeather(), 60000); // 60 sec interval is minimal at OpenWeatherAPI
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }

  render() {
    return <div>{this.renderWeather()}</div>;
  }
}

export default Weather;
