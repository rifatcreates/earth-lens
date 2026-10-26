import { getAQILevel } from "@/constants/aqi";

interface PollutantCardProps {
  label: string;
  name: string;
  value: number;
}

export default function PollutantCard({
  label,
  name,
  value,
}: PollutantCardProps) {
  const level = getAQILevel(value);
  const barWidth = Math.min(value / 300, 1) * 100;

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-semibold">{label}</span>
        <span className="text-xl font-semibold tabular-nums">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground">{name}</p>

      <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${barWidth}%`, backgroundColor: level.color }}
        />
      </div>
    </div>
  );
}