import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { LONGTITUDE, LATITUDE } from '../../common/constants/Coordinates';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';

export interface WeatherAPIProps {}

// INFO OD MICHAŁA:

//ZMIENIC NAZWE TEJ KLASY Z API NA WEATHER
// GEOLOKACJE ZROBIC Z NAVIGATOREM

// te wszystkie interfejsy zrobily sie z JSON to TS >> ctrl+shift+p >> clipboard (najpierw response json z przegladarki skopiowac do schowka)

// interfejsy mozna do common/interfaces i np /weather
// mozna pousuwac zbedne propertisys

// properties ze '?' są opcjonalne
interface WeatherAPIResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Rain {
  '3h': number;
}

interface Wind {
  speed: number;
  deg?: number;
}

interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

interface WeatherAPIState {
  data: WeatherAPIResponse | null;
  // inicjacyjnie data moze byc TLYKO albo null albo tego typu
  JAKIS?: number;
}
class WeatherAPI extends React.Component<WeatherAPIProps, WeatherAPIState> {
  state: WeatherAPIState = {
    data: null
  };

  // ASYNC AWAIT
  async APICall(): Promise<any> {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGTITUDE}&APPID=${WEATHER_API_KEY}`
      )
      .then(response => {
        const data = response.data;
        console.log(typeof data);
        this.setState({ data });
      })
      .catch(response => {
        console.log('# Error while calling weather API #\n', response);
      });
  }

  componentDidMount() {
    this.APICall();
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }
  render() {
    return <div>hi</div>;
  }
}

export default WeatherAPI;
