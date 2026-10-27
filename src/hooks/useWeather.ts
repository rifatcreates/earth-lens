import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/constants/api";
import type { WeatherResponse } from "@/types";

async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index,visibility,is_day",
    hourly:
      "temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "auto",
    forecast_days: "7",
  });

  const url = `${API_ENDPOINTS.openMeteo.forecast}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherResponse = await response.json();
  return data;
}

export function useWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
  });
}