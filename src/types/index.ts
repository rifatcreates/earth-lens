export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  uv_index: number;
  visibility: number;
  is_day: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export interface PollutantValue {
  v: number;
}

export interface AQIData {
  aqi: number;
  dominentpol: string;
  city: {
    name: string;
    geo: number[];
  };
  iaqi: {
    pm25?: PollutantValue;
    pm10?: PollutantValue;
    o3?: PollutantValue;
    no2?: PollutantValue;
    so2?: PollutantValue;
    co?: PollutantValue;
    t?: PollutantValue;
    h?: PollutantValue;
  };
}

export interface AQIResponse {
  status: string;
  data: AQIData;
}

export interface Location {
  name: string;
  country: string;
  region?: string;
  lat: number;
  lon: number
}

export interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface GeoResponse {
  results?: GeoResult[];
}