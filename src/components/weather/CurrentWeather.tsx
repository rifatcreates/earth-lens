import { motion } from "framer-motion";
import type { CurrentWeather as CurrentWeatherData } from "@/types";
import type { TempUnit } from "@/store/useStore";
import { getWeatherInfo } from "@/utils/weatherUtils";
import { formatTemperature } from "@/utils/unitConverter";
import { formatFullDate } from "@/utils/dateUtils";

interface CurrentWeatherProps {
  locationName: string;
  weather: CurrentWeatherData;
  tempUnit: TempUnit;
}

export default function CurrentWeather({
  locationName,
  weather,
  tempUnit,
}: CurrentWeatherProps) {
  const info = getWeatherInfo(weather.weather_code, weather.is_day === 1);

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">
        {formatFullDate(weather.time)}
      </p>
      <h1 className="mt-1 text-2xl font-bold">{locationName}</h1>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-6xl font-bold tabular-nums text-brass sm:text-7xl">
            {formatTemperature(weather.temperature_2m, tempUnit)}
          </p>
          <p className="mt-2 text-lg">{info.label}</p>
          <p className="text-sm text-muted-foreground">
            Feels like {formatTemperature(weather.apparent_temperature, tempUnit)}
          </p>
        </div>

        <motion.span
          className="text-7xl sm:text-8xl"
          role="img"
          aria-label={info.label}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {info.icon}
        </motion.span>
      </div>
    </section>
  );
}