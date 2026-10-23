import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, SEARCH_DEBOUNCE_MS, MIN_SEARCH_LENGTH } from "@/constants/api";
import { useDebounce } from "@/hooks/useDebounce";
import type { GeoResponse, GeoResult } from "@/types";

async function fetchCities(query: string): Promise<GeoResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: "6",
    language: "en",
    format: "json",
  });

  const url = `${API_ENDPOINTS.openMeteo.geocoding}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search cities");
  }

  const data: GeoResponse = await response.json();
  return data.results ?? [];
}

export function useCitySearch(query: string) {
  const debouncedQuery = useDebounce(query.trim(), SEARCH_DEBOUNCE_MS);

  const result = useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: () => fetchCities(debouncedQuery),
    enabled: debouncedQuery.length >= MIN_SEARCH_LENGTH,
  });

  return {
    cities: result.data ?? [],
    isLoading: result.isLoading,
    error: result.error,
    debouncedQuery,
  };
}