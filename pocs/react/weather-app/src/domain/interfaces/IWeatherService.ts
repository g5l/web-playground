import {unitType} from "@/types";

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
  unit: unitType;
}

export interface IWeatherService {
  getWeatherByCity(location: string, unit: unitType): Promise<WeatherData>;

  getWeatherByCoordinates(coords: Coordinates, unit: unitType): Promise<WeatherData>;
}