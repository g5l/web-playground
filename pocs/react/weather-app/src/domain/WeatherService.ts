import { IWeatherService, WeatherData, Coordinates } from './interfaces/IWeatherService';

export class WeatherService {
  constructor(private weatherAdapter: IWeatherService) {}

  async getWeatherByCity(location: string, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData> {
    return await this.weatherAdapter.getWeatherByCity(location, unit);
  }

  async getWeatherByCoordinates(coords: Coordinates, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData> {
    return await this.weatherAdapter.getWeatherByCoordinates(coords, unit);
  }

  convertTemperature(temp: number, fromUnit: 'celsius' | 'fahrenheit'): number {
    if (fromUnit === 'celsius') {
      return (temp * 9/5) + 32; // Celsius to Fahrenheit
    }
    return (temp - 32) * 5/9; // Fahrenheit to Celsius
  }
}