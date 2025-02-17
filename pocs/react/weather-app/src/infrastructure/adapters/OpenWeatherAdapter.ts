import {Coordinates, IWeatherService, WeatherData} from '@/domain/interfaces/IWeatherService';

export class OpenWeatherAdapter implements IWeatherService {
  private readonly API_KEY: string;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  private async fetchWeatherData(url: string, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      const data = await response.json();

      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        unit
      };
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getWeatherByCity(location: string, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData> {
    console.log({API_KEY: this.API_KEY, location});
    const unitSystem = unit === 'celsius' ? 'metric' : 'imperial';
    const url = `${this.BASE_URL}/weather?q=${location}&units=${unitSystem}&appid=${this.API_KEY}`;
    return this.fetchWeatherData(url, unit);
  }

  async getWeatherByCoordinates(coords: Coordinates, unit: 'celsius' | 'fahrenheit'): Promise<WeatherData> {
    const unitSystem = unit === 'celsius' ? 'metric' : 'imperial';
    const url = `${this.BASE_URL}/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=${unitSystem}&appid=${this.API_KEY}`;
    return this.fetchWeatherData(url, unit);
  }
}