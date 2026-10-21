import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Location } from "@/types";

export type Theme = "light" | "dark";
export type TempUnit = "celsius" | "fahrenheit";

interface StoreState {
  theme: Theme;
  tempUnit: TempUnit;
  selectedLocation: Location;
  toggleTheme: () => void;
  toggleTempUnit: () => void;
  setSelectedLocation: (location: Location) => void;
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

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      toggleTempUnit: () =>
        set((state) => ({
          tempUnit: state.tempUnit === "celsius" ? "fahrenheit" : "celsius",
        })),

      setSelectedLocation: (location) => set({ selectedLocation: location }),
    }),
    {
      name: "earthlens-storage",
    }
  )
);