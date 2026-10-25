import { UV_LEVELS, WEATHER_CODES } from "@/constants/weather";
import type { WeatherCodeInfo } from "@/constants/weather";

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? { label: "Unknown", icon: "🌡️" };
}

export function getUVLabel(uv: number): string {
  const level = UV_LEVELS.find((item) => uv <= item.max);
  return level ? level.label : "Unknown";
}