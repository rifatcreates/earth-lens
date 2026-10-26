import { motion } from "framer-motion";
import { getAQILevel } from "@/constants/aqi";

interface AQIGaugeProps {
  value: number;
}

const MAX_GAUGE_VALUE = 300;
const ARC_PATH = "M 20 100 A 80 80 0 0 1 180 100";

export default function AQIGauge({ value }: AQIGaugeProps) {
  const rounded = Math.round(value);
  const level = getAQILevel(rounded);
  const fraction = Math.min(rounded, MAX_GAUGE_VALUE) / MAX_GAUGE_VALUE;

  return (
    <div className="relative mx-auto w-full max-w-xs">
      <svg
        viewBox="0 0 200 110"
        className="w-full"
        role="img"
        aria-label={`Air quality index ${rounded}, ${level.label}`}
      >
        <path
          d={ARC_PATH}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          className="stroke-muted"
        />

        <motion.path
          d={ARC_PATH}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          stroke={level.color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: fraction }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="text-5xl font-bold tabular-nums">{rounded}</p>
        <p className="text-sm text-muted-foreground">AQI</p>
      </div>
    </div>
  );
}