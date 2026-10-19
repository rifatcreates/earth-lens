import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, API_KEYS } from "@/constants/api";
import type { AQIResponse } from "@/types";

async function fetchAQI(lat: number, lon: number): Promise<AQIResponse> {
  const token = API_KEYS.aqicn;

  if (!token) {
    throw new Error("AQICN token is missing in .env file");
  }

  const url = `${API_ENDPOINTS.aqicn.base}/feed/geo:${lat};${lon}/?token=${token}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const data: AQIResponse = await response.json();

  if (data.status !== "ok") {
    throw new Error("No air quality data found for this location");
  }

  return data;
}

export function useAQI(lat: number, lon: number) {
  return useQuery({
    queryKey: ["aqi", lat, lon],
    queryFn: () => fetchAQI(lat, lon),
  });
}