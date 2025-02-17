import './App.css';
import {WeatherService} from "@/domain/WeatherService.ts";
import {OpenWeatherAdapter} from "@/infrastructure/adapters/OpenWeatherAdapter.ts";
import {WeatherDisplay} from "@/presentation/WeatherDisplay.tsx";

function App() {
  const weatherAdapter = new OpenWeatherAdapter(import.meta.env.VITE_WEATHER_API_KEY);
  const weatherService = new WeatherService(weatherAdapter);

  return (
    <>
      <WeatherDisplay weatherService={weatherService}/>
    </>
  );
}

export default App;
