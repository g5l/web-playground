import {Alert, AlertDescription} from '@/components/ui/alert.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';
import {Coordinates, WeatherData} from "@/domain/interfaces/IWeatherService.ts";
import {WeatherService} from "@/domain/WeatherService.ts";
import {OpenWeatherAdapter} from "@/infrastructure/adapters/OpenWeatherAdapter.ts";
import {unitType} from "@/types";
import {Loader, MapPin} from 'lucide-react';
import {useEffect, useState} from 'react';

const weatherAdapter = new OpenWeatherAdapter(import.meta.env.VITE_WEATHER_API_KEY);
const weatherService = new WeatherService(weatherAdapter);

interface Props {
  defaultLocation?: string;
}

export const WeatherDisplay = ({defaultLocation = 'London'}: Props) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>(defaultLocation!);
  const [unit, setUnit] = useState<unitType>('celsius');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingGeolocation, setUsingGeolocation] = useState(false);

  const fetchWeatherByCity = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getWeatherByCity(location, unit);
      setWeather(data);
    } catch (error: unknown) {
      setError(`Failed to get weather for ${location}. ${error.name}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByGeolocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingGeolocation(true);

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const coords: Coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      const data = await weatherService.getWeatherByCoordinates(coords, unit);
      setWeather(data);
      setLocation(data.location);
    } catch (err) {
      setError('Failed to get location. Please ensure location services are enabled.');
      setUsingGeolocation(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usingGeolocation) {
      fetchWeatherByGeolocation();
    } else {
      fetchWeatherByCity();
    }
  }, [location, unit, usingGeolocation]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Weather Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setUsingGeolocation(false);
            }}
            placeholder="Enter location..."
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fetchWeatherByGeolocation()}
            title="Use current location"
          >
            <MapPin className="h-4 w-4"/>
          </Button>
        </div>

        <Select
          value={unit}
          onValueChange={(value: unitType) => setUnit(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select unit"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="celsius">Celsius</SelectItem>
            <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
          </SelectContent>
        </Select>

        {loading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 animate-spin"/>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {weather && (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{weather.location}</h2>
            <p className="text-4xl font-bold">
              {weather.temperature.toFixed(0)}°{unit === 'celsius' ? 'C' : 'F'}
            </p>
            <p className="capitalize text-lg">{weather.description}</p>
            <div className="text-sm text-muted-foreground">
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind Speed: {weather.windSpeed.toFixed(0)} {unit === 'celsius' ? 'm/s' : 'mph'}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};