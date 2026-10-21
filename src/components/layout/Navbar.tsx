import { Globe, LocateFixed, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@/store/useStore";
import { useGeolocation } from "@/hooks/useGeolocation";

const Navbar = () => {
  const theme = useStore((state) => state.theme)
  const tempUnit = useStore((state) => state.tempUnit)
  const toggleTheme = useStore((state) => state.toggleTheme);
  const toggleTempUnit = useStore((state) => state.toggleTempUnit);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  const { isLocating, error, getCurrentPosition } = useGeolocation()

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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="hidden text-lg font-bold sm:inline">EarthLens</span>
            </div>

            <div className="hidden h-10 max-w-md flex-1 items-center rounded-xl border border-border bg-card px-4 text-sm text-muted-foreground md:flex">
                Search city (coming in Day 4)
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
                    {
                        tempUnit === "celsius" ? "°C" : "°F"
                    }
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                >
                    {
                        theme === "dark" ? ( <Sun /> ) : ( <Moon /> )
                    }
                </Button>
            </div>
        </div>
        {error && (
            <p className="bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">
                {error}
            </p>
        )}
    </header>
  )
}

export default Navbar