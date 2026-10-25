import type { ReactNode } from "react";

interface WeatherCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  subtext?: string;
}

export default function WeatherCard({
  title,
  icon,
  value,
  subtext,
}: WeatherCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{title}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
      {subtext && <p className="mt-1 text-sm text-muted-foreground">{subtext}</p>}
    </div>
  );
}