export const AQI_LEVELS = [
  {
    key: "good",
    min: 0,
    max: 50,
    label: "Good",
    color: "var(--aqi-good)",
    bgClass: "bg-aqi-good",
    textClass: "text-white",
    healthAdvice: "Air quality is satisfactory. Enjoy outdoor activities.",
  },
  {
    key: "moderate",
    min: 51,
    max: 100,
    label: "Moderate",
    color: "var(--aqi-moderate)",
    bgClass: "bg-aqi-moderate",
    textClass: "text-black",
    healthAdvice:
      "Acceptable air quality. Unusually sensitive people should limit long outdoor exertion.",
  },
  {
    key: "sensitive",
    min: 101,
    max: 150,
    label: "Unhealthy for Sensitive Groups",
    color: "var(--aqi-sensitive)",
    bgClass: "bg-aqi-sensitive",
    textClass: "text-black",
    healthAdvice:
      "Children, elderly and people with respiratory issues should reduce outdoor activity.",
  },
  {
    key: "unhealthy",
    min: 151,
    max: 200,
    label: "Unhealthy",
    color: "var(--aqi-unhealthy)",
    bgClass: "bg-aqi-unhealthy",
    textClass: "text-white",
    healthAdvice:
      "Everyone may experience health effects. Limit outdoor activity and consider a mask.",
  },
  {
    key: "very-unhealthy",
    min: 201,
    max: 300,
    label: "Very Unhealthy",
    color: "var(--aqi-very-unhealthy)",
    bgClass: "bg-aqi-very-unhealthy",
    textClass: "text-white",
    healthAdvice:
      "Health alert. Avoid outdoor activity and keep windows closed.",
  },
  {
    key: "hazardous",
    min: 301,
    max: 500,
    label: "Hazardous",
    color: "var(--aqi-hazardous)",
    bgClass: "bg-aqi-hazardous",
    textClass: "text-white",
    healthAdvice:
      "Emergency conditions. Stay indoors and use an air purifier if possible.",
  },
] as const;

export type AQILevel = (typeof AQI_LEVELS)[number];
export type AQILevelKey = AQILevel["key"];

export function getAQILevel(value: number): AQILevel {
  const found = AQI_LEVELS.find((l) => value >= l.min && value <= l.max);
  return found ?? AQI_LEVELS[AQI_LEVELS.length - 1];
}

export const POLLUTANTS = [
  { key: "pm25", label: "PM2.5", unit: "µg/m³" },
  { key: "pm10", label: "PM10", unit: "µg/m³" },
  { key: "o3", label: "O₃", unit: "ppb" },
  { key: "no2", label: "NO₂", unit: "ppb" },
  { key: "so2", label: "SO₂", unit: "ppb" },
  { key: "co", label: "CO", unit: "ppm" },
] as const;

export type PollutantKey = (typeof POLLUTANTS)[number]["key"];