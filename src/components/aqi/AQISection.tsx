import { Skeleton } from "@/components/ui/skeleton";
import AQIGauge from "@/components/aqi/AQIGauge";
import PollutantCard from "@/components/aqi/PollutantCard";
import AQIChart from "@/components/charts/AQIChart";
import type { AQIChartItem } from "@/components/charts/AQIChart";
import { POLLUTANTS, getAQILevel } from "@/constants/aqi";
import type { AQIData } from "@/types";

interface AQISectionProps {
  data?: AQIData;
  isLoading: boolean;
  errorMessage: string | null;
}

interface PollutantItem {
  label: string;
  name: string;
  value: number;
}

export default function AQISection({
  data,
  isLoading,
  errorMessage,
}: AQISectionProps) {
  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Air Quality</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </section>
    );
  }

  // AQICN এ সব জায়গায় station নেই, তাই এটা স্বাভাবিক অবস্থা
  const aqiValue = data ? Number(data.aqi) : NaN;

  if (!data || errorMessage || Number.isNaN(aqiValue)) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Air Quality</h2>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-3xl">🌫️</p>
          <p className="mt-2 font-medium">
            Air quality data isn't available for this location
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            There may be no monitoring station nearby. Try a larger city.
          </p>
        </div>
      </section>
    );
  }

  const rounded = Math.round(aqiValue);
  const level = getAQILevel(rounded);

  // যে pollutant গুলোর মান আছে শুধু সেগুলো নিচ্ছি
  const pollutants: PollutantItem[] = [];
  for (const pollutant of POLLUTANTS) {
    const found = data.iaqi[pollutant.key];
    if (found) {
      pollutants.push({
        label: pollutant.label,
        name: pollutant.name,
        value: Math.round(found.v),
      });
    }
  }

  const chartData: AQIChartItem[] = pollutants.map((item) => ({
    label: item.label,
    value: item.value,
    color: getAQILevel(item.value).color,
  }));

  const dominant = POLLUTANTS.find((item) => item.key === data.dominentpol);
  const dominantLabel = dominant ? dominant.label : data.dominentpol;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Air Quality</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <AQIGauge value={rounded} />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${level.bgClass} ${level.textClass}`}
            >
              {level.label}
            </span>
            {data.dominentpol && (
              <span className="text-sm text-muted-foreground">
                Main pollutant: {dominantLabel}
              </span>
            )}
          </div>

          <p
            className="mt-4 rounded-xl border-l-4 bg-muted p-3 text-sm"
            style={{ borderLeftColor: level.color }}
          >
            {level.healthAdvice}
          </p>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Station: {data.city.name}
          </p>
        </div>

        {pollutants.length > 0 ? (
          <div className="grid grid-cols-2 content-start gap-4">
            {pollutants.map((item) => (
              <PollutantCard
                key={item.label}
                label={item.label}
                name={item.name}
                value={item.value}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            This station doesn't report individual pollutants.
          </div>
        )}
      </div>

      {chartData.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-medium">Pollutant levels</h3>
          <AQIChart data={chartData} />
        </div>
      )}
    </section>
  );
}