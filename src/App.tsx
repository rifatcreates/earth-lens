import { useWeather } from "@/hooks/useWeather";
import { useAQI } from "@/hooks/useAQI";

function App() {
  const weather = useWeather(23.8103, 90.4125);
  const aqi = useAQI(23.8103, 90.4125);

  console.log("Weather:", weather.data);
  console.log("AQI:", aqi.data);

  if (weather.isLoading || aqi.isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  if (weather.error || aqi.error) {
    return <p className="p-8 text-destructive">Something went wrong</p>;
  }

  return (
    <div className="space-y-2 p-8">
      <p>Temperature: {weather.data?.current.temperature_2m}°C</p>
      <p>Humidity: {weather.data?.current.relative_humidity_2m}%</p>
      <p>AQI: {aqi.data?.data.aqi}</p>
      <p>City: {aqi.data?.data.city.name}</p>
    </div>
  );
}

export default App;