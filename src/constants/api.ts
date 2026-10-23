export const API_ENDPOINTS = {
  openMeteo: {
    forecast: "https://api.open-meteo.com/v1/forecast",
    archive: "https://archive-api.open-meteo.com/v1/archive",
    airQuality: "https://air-quality-api.open-meteo.com/v1/air-quality",
    geocoding: "https://geocoding-api.open-meteo.com/v1/search",
  },
  aqicn: {
    base: "https://api.waqi.info",
  },
  geodb: {
    cities: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  },
  openWeather: {
    geocoding: "https://api.openweathermap.org/geo/1.0",
  },
} as const;

export const API_KEYS = {
  aqicn: import.meta.env.VITE_AQICN_TOKEN as string | undefined,
  openWeather: import.meta.env.VITE_OPENWEATHER_KEY as string | undefined,
  geodb: import.meta.env.VITE_GEODB_KEY as string | undefined,
} as const;

export const SEARCH_DEBOUNCE_MS = 500;
export const MAX_FAVORITES = 10;
export const MAX_RECENT_SEARCHES = 5;
export const MIN_SEARCH_LENGTH = 3;