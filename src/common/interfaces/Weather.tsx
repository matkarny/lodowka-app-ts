export interface WeatherResponse {
  description: string;
  main: string;
  temperature: string;
  windSpeed: number;
  cloudiness: number;
}

export interface Coords {
  lat: string;
  lon: string;
}
