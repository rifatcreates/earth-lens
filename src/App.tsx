import { useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import { useAQI } from "./hooks/useAQI"
import { useWeather } from "./hooks/useWeather"
import { useStore } from "./store/useStore"
import { formatTemperature } from "./utils/unitConverter"

const App = () => {
  const theme = useStore((state) => state.theme)
  const location = useStore((state) => state.selectedLocation)
  const tempUnit = useStore((state) => state.tempUnit)

  const weather = useWeather(location.lat, location.lon)
  const aqi = useAQI(location.lat, location.lon)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-4 p-4">
        <h1 className="text-2xl font-bold">
          {location.name}
          {location.country && `, ${location.country}`}
        </h1>

        {weather.isLoading && <p>Weather loading...</p>}

        {weather.error && (
          <p className="text-destructive">
            Weather error: {weather.error.message}
          </p>
        )}

        {weather.data && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-6xl font-bold tabular-nums text-brass">
              {formatTemperature(weather.data.current.temperature_2m, tempUnit)}
            </p>

            <p className="mt-2 text-muted-foreground">
              Humidity: {weather.data.current.relative_humidity_2m}%
            </p>
          </div>
        )}

        {aqi.isLoading && <p>AQI loading...</p>}

        {aqi.error && (
          <p className="text-destructive">AQI: {aqi.error.message}</p>
        )}

        {aqi.data && <p>AQI: {aqi.data.data.aqi}</p>}
      </main>
    </div>
  )
}

export default App