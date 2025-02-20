import {unitType} from "@/types";
import {Coordinates, IWeatherService, WeatherData} from './interfaces/IWeatherService';

export class WeatherService {
  constructor(private weatherAdapter: IWeatherService) {
  }

  async getWeatherByCity(location: string, unit: unitType): Promise<WeatherData> {
    return await this.weatherAdapter.getWeatherByCity(location, unit);
  }

  async getWeatherByCoordinates(coords: Coordinates, unit: unitType): Promise<WeatherData> {
    return await this.weatherAdapter.getWeatherByCoordinates(coords, unit);
  }
}