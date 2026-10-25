import type { TempUnit, WindUnit } from "@/store/useStore";

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

export function formatTemperature(celsius: number, unit: TempUnit): string {
  if (unit === "fahrenheit") {
    return `${Math.round(celsiusToFahrenheit(celsius))}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatWindSpeed(kmh: number, unit: WindUnit): string {
  if (unit === "mph") {
    return `${Math.round(kmhToMph(kmh))} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function formatVisibility(meters: number): string {
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}