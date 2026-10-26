import { Droplets, Eye, Sun, Sunrise, Sunset, Wind } from "lucide-react";
import { motion } from "framer-motion";
import CurrentWeather from "@/components/weather/CurrentWeather";
import WeatherCard from "@/components/weather/WeatherCard";
import DashboardSkeleton from "@/components/weather/DashboardSkeleton";
import ErrorMessage from "@/components/weather/ErrorMessage";
import { useStore } from "@/store/useStore";
import { useWeather } from "@/hooks/useWeather";
import { useAQI } from "@/hooks/useAQI";
import { formatTime } from "@/utils/dateUtils";
import { getUVLabel } from "@/utils/weatherUtils";
import { formatVisibility, formatWindSpeed } from "@/utils/unitConverter";
import AQISection from "@/components/aqi/AQISection";

export default function DashboardPage() {
  const location = useStore((state) => state.selectedLocation);
  const tempUnit = useStore((state) => state.tempUnit);
  const windUnit = useStore((state) => state.windUnit);

  const weather = useWeather(location.lat, location.lon);
  const aqi = useAQI(location.lat, location.lon);

  if (weather.isLoading) {
    return <DashboardSkeleton />;
  }

  if (weather.error) {
    return (
      <ErrorMessage
        message={weather.error.message}
        onRetry={() => weather.refetch()}
      />
    );
  }

  if (!weather.data) {
    return null;
  }

  const current = weather.data.current;
  const daily = weather.data.daily;

  const locationName = location.country
    ? `${location.name}, ${location.country}`
    : location.name;

  const cards = [
    {
      title: "Humidity",
      icon: <Droplets className="h-4 w-4" />,
      value: `${current.relative_humidity_2m}%`,
      subtext: undefined,
    },
    {
      title: "Wind",
      icon: <Wind className="h-4 w-4" />,
      value: formatWindSpeed(current.wind_speed_10m, windUnit),
      subtext: undefined,
    },
    {
      title: "UV Index",
      icon: <Sun className="h-4 w-4" />,
      value: String(Math.round(current.uv_index)),
      subtext: getUVLabel(current.uv_index),
    },
    {
      title: "Visibility",
      icon: <Eye className="h-4 w-4" />,
      value: formatVisibility(current.visibility),
      subtext: undefined,
    },
    {
      title: "Sunrise",
      icon: <Sunrise className="h-4 w-4" />,
      value: formatTime(daily.sunrise[0]),
      subtext: undefined,
    },
    {
      title: "Sunset",
      icon: <Sunset className="h-4 w-4" />,
      value: formatTime(daily.sunset[0]),
      subtext: undefined,
    },
  ];

  return (
    <div className="space-y-4">
      <CurrentWeather
        locationName={locationName}
        weather={current}
        tempUnit={tempUnit}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.07 }}
          >
            <WeatherCard
              title={card.title}
              icon={card.icon}
              value={card.value}
              subtext={card.subtext}
            />
          </motion.div>
        ))}
      </div>

      <AQISection
        data={aqi.data?.data}
        isLoading={aqi.isLoading}
        errorMessage={aqi.error ? aqi.error.message : null}
      />
    </div>
  );
}