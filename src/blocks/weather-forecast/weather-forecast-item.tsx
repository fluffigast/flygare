import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { NavigationIcon } from "lucide-react";

export interface WeatherForecastItemProps {
  day: string;
  date: Date | string;
  windDirection: {
    degrees: number;
    label: string;
  };
  windStrength: string;
  temperature: string;
  precipitation: string;
}

/**
 * Tröskel-färgning för vindstyrka:
 *   ≤ 8 m/s  — grön (flygbart)
 *   9–14 m/s — amber (starkt)
 *   ≥ 15 m/s — röd (för starkt)
 * Parsar högsta värdet från en sträng som "12-16 m/s".
 */
const windColor = (strength: string): string => {
  const matches = strength.match(/\d+/g) ?? [];
  const max = Math.max(0, ...matches.map(Number));
  if (max >= 15) return "var(--signal-danger, #dc2626)";
  if (max >= 9) return "var(--signal-safety, #b45309)";
  if (max > 0) return "var(--signal-ok, #16a34a)";
  return "var(--slate, #62748e)";
};

const WeatherForecastItem: React.FC<WeatherForecastItemProps> = ({
  day,
  date,
  windDirection,
  windStrength,
  temperature,
  precipitation,
}) => {
  const formatDate = (dateValue: Date | string) => {
    const dateObj = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    return format(dateObj, "d MMMM", { locale: sv });
  };

  const color = windColor(windStrength);

  return (
    <div
      className="flex flex-col gap-4 w-full p-5 md:p-6 h-full"
      style={{
        background: "#fafbfc",
        border: "1px solid var(--border, #e2e8f0)",
        borderRadius: "var(--radius, 10px)",
      }}
    >
      {/* Day + Date */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif font-bold text-2xl leading-none" style={{ color: "var(--ink-2, #0f172b)" }}>
          {day}
        </h3>
        <p className="text-sm font-mono tabular-nums" style={{ color: "var(--slate, #62748e)" }}>
          {formatDate(date)}
        </p>
      </div>

      {/* Primary: wind strength with threshold color */}
      <div className="flex items-center gap-3">
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ background: color }}
          aria-hidden="true"
        />
        <p
          className="font-mono tabular-nums font-semibold text-xl"
          style={{ color }}
        >
          {windStrength}
        </p>
      </div>

      {/* Wind direction with rotated arrow */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          style={{
            background: "#fff",
            border: "1px solid var(--border, #e2e8f0)",
            transform: `rotate(${windDirection.degrees}deg)`,
            transformOrigin: "center",
          }}
          aria-hidden="true"
        >
          <NavigationIcon size={14} strokeWidth={1.8} style={{ color: "var(--ink-2, #0f172b)" }} />
        </span>
        <p className="text-sm" style={{ color: "var(--slate-3, #45556c)" }}>
          {windDirection.label}
        </p>
      </div>

      {/* Secondary: temp + precipitation */}
      <div
        className="grid grid-cols-2 gap-4 mt-auto pt-4"
        style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
            Temp
          </p>
          <p className="font-mono tabular-nums text-sm" style={{ color: "var(--ink-2, #0f172b)" }}>
            {temperature}
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
            Nederbörd
          </p>
          <p className="font-mono tabular-nums text-sm" style={{ color: "var(--ink-2, #0f172b)" }}>
            {precipitation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastItem;
