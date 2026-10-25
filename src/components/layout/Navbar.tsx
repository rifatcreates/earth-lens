import { Globe, LocateFixed, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/layout/SearchBar";
import { useStore } from "@/store/useStore";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function Navbar() {
  const theme = useStore((state) => state.theme);
  const tempUnit = useStore((state) => state.tempUnit);
  const windUnit = useStore((state) => state.windUnit);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const toggleTempUnit = useStore((state) => state.toggleTempUnit);
  const toggleWindUnit = useStore((state) => state.toggleWindUnit);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  const { isLocating, error, getCurrentPosition } = useGeolocation();

  function handleMyLocation() {
    getCurrentPosition((coords) => {
      setSelectedLocation({
        name: "My Location",
        country: "",
        lat: coords.lat,
        lon: coords.lon,
      });
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
        <div className="flex h-12 items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">EarthLens</span>
        </div>

        <div className="order-last w-full md:order-0 md:max-w-md md:flex-1">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMyLocation}
            disabled={isLocating}
            aria-label="Use my current location"
          >
            <LocateFixed className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={toggleTempUnit}
            aria-label="Switch temperature unit"
          >
            {tempUnit === "celsius" ? "°C" : "°F"}
          </Button>

          <Button
            variant="ghost"
            onClick={toggleWindUnit}
            aria-label="Switch wind speed unit"
          >
            {windUnit === "kmh" ? "km/h" : "mph"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-brass" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {error && (
        <p className="bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">
          {error}
        </p>
      )}
    </header>
  );
}