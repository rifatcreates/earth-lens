import { NIGHT_ICONS, UV_LEVELS, WEATHER_CODES } from "@/constants/weather";
import type { WeatherCodeInfo } from "@/constants/weather";

export function getWeatherInfo(
  code: number,
  isDay: boolean = true
): WeatherCodeInfo {
  const info = WEATHER_CODES[code] ?? { label: "Unknown", icon: "🌡️" };

  if (!isDay && NIGHT_ICONS[code]) {
    return { label: info.label, icon: NIGHT_ICONS[code] };
  }

  return info;
}

export function getUVLabel(uv: number): string {
  const level = UV_LEVELS.find((item) => uv <= item.max);
  return level ? level.label : "Unknown";
}