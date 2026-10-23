import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_RECENT_SEARCHES } from "@/constants/api";
import type { Location } from "@/types";

export type Theme = "light" | "dark";
export type TempUnit = "celsius" | "fahrenheit";

interface StoreState {
  theme: Theme;
  tempUnit: TempUnit;
  selectedLocation: Location;
  recentSearches: Location[];
  toggleTheme: () => void;
  toggleTempUnit: () => void;
  setSelectedLocation: (location: Location) => void;
  addRecentSearch: (location: Location) => void;
  clearRecentSearches: () => void;
}

const DEFAULT_LOCATION: Location = {
  name: "Dhaka",
  country: "Bangladesh",
  lat: 23.8103,
  lon: 90.4125,
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: "dark",
      tempUnit: "celsius",
      selectedLocation: DEFAULT_LOCATION,
      recentSearches: [],

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      toggleTempUnit: () =>
        set((state) => ({
          tempUnit: state.tempUnit === "celsius" ? "fahrenheit" : "celsius",
        })),

      setSelectedLocation: (location) => set({ selectedLocation: location }),

      addRecentSearch: (location) =>
        set((state) => {
          const others = state.recentSearches.filter(
            (item) => !(item.lat === location.lat && item.lon === location.lon)
          );
          return {
            recentSearches: [location, ...others].slice(0, MAX_RECENT_SEARCHES),
          };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "earthlens-storage",
    }
  )
);