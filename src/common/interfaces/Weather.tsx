export interface WeatherResponse {
  weather: Weather[]; // weather[0].main: "Rain" etc/
  main: Main; // main: temp
  wind: Wind; // .speed: "6.38"
  clouds: Clouds; // .all : "100"
}

export interface Coord {
  lon: string;
  lat: string;
}

export interface PreparedData {
  iconDescription: string;
  weatherDescription: string;
  main: string;
  wind: number;
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

interface WeatherState {
  data: WeatherResponse | null;
  coord?: Coord;
}
