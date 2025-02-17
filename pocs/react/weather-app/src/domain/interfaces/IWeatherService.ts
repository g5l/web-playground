export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  humidity: number;
  windSpeed: number;
  unit: 'celsius' | 'fahrenheit';
}

export interface IWeatherService {
  getWeatherByCity(location: string, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData>;
  getWeatherByCoordinates(coords: Coordinates, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData>;
}