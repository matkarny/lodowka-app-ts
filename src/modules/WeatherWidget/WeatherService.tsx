import WeatherAPI from './WeatherAPI';
import {
  PreparedData,
  Coord,
  WeatherResponse
} from '../../common/interfaces/WeatherInterfaces';
import {
  CLOUDINESS_CLOUDY,
  CLOUDINESS_SCATTERED
} from '../../common/constants/WeatherConstants';
const promiseGetGeolocation = () =>
  new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve));

class WeatherServiceNEW {
  async downloadWeatherData(): Promise<PreparedData> {
    // Get Geolocation
    if (navigator.geolocation) {
      const position: any = await promiseGetGeolocation();
      let coord: Coord = {
        lat: position.coords.latitude.toString().substr(0, 5),
        lon: position.coords.longitude.toString().substr(0, 5)
      };
      try {
        // Make API call based on coordinates
        const response = await WeatherAPI.getWeatherData(coord);

        console.log('# response #', response);
        const weatherData: WeatherResponse = response.data;

        // Get only relevant data from response then format it and return to View
        const preparedData: PreparedData = this.prepareWeather(weatherData);

        return preparedData;
      } catch (e) {}
    }
    return { icon: '', description: '', temperature: '', wind: 0 };
  }

  prepareWeather(data: WeatherResponse) {
    const dataFormatted = {
      weather: data.weather[0].main,
      temperature: data.main.temp.toString().substr(0, 2),
      wind: +data.wind.speed,
      clouds: +data.clouds.all
    };
    let { weather, temperature, wind, clouds } = dataFormatted;
    let icon = '';
    let description = '';

    // CLOUDS
    let cloudsDescription =
      clouds > CLOUDINESS_SCATTERED ? 'Scattered clouds' : 'Cleary';
    if (clouds > CLOUDINESS_CLOUDY) cloudsDescription = 'Cloudy';

    if (weather.length > 0) {
      // VARIOUS WEATHER
      icon = 'day-sunny-overcast ';
      description = `${cloudsDescription}`;

      if (weather === 'Clear') {
        icon = 'day-sunny';
        description = `${cloudsDescription} and sunny`;
      }

      if (
        weather === 'Rain' ||
        weather === 'Drizzle' ||
        weather === 'Thunderstorm'
      ) {
        icon = 'rain';
        description = `${cloudsDescription} and rainy`;
      }
    }

    return { icon, description, temperature, wind };
  }

  getWeatherData() {
    return this.downloadWeatherData();
  }
}
const weatherServiceNEW = new WeatherServiceNEW();
export default weatherServiceNEW;