import axios from 'axios';
import { WEATHER_API_KEY } from '../../common/constants/API_Keys';
import { Coord } from '../../common/interfaces/WeatherInterfaces';

class WeatherAPI {
  async getWeatherData(coord: Coord) {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${
        coord.lon
      }&APPID=${WEATHER_API_KEY}&units=metric`
    );
  }
}

const weatherAPI = new WeatherAPI();
export default weatherAPI;
