import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

export interface WeatherForecastItemProps {
  day: string;
  date: Date | string;
  windDirection: { degrees: number; label: string };
  windStrength: string;
  temperature: string;
  precipitation: string;
}

function WindArrow({ deg }: { deg: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  );
}

const WeatherForecastItem: React.FC<WeatherForecastItemProps> = ({
  day,
  date,
  windDirection,
  windStrength,
  temperature,
  precipitation,
}) => {
  const formatDate = (d: Date | string) => {
    const obj = typeof d === "string" ? new Date(d) : d;
    return format(obj, "d MMMM", { locale: sv });
  };

  return (
    <div className="flex flex-col gap-5 pt-2 border-t border-hairline">
      <div className="flex flex-col gap-1 pt-2">
        <h3 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-none text-ink-2 tracking-tight">
          {day}
        </h3>
        <p className="text-sm text-slate-2 tracking-wide">{formatDate(date)}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-1 gap-y-4">
        <div className="flex flex-col gap-1">
          <p className="font-serif italic text-base text-ink-2">Vindriktning</p>
          <p className="text-base text-slate inline-flex gap-1.5 items-center">
            <span className="text-slate-3"><WindArrow deg={windDirection.degrees} /></span>
            {windDirection.label}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif italic text-base text-ink-2">Vindstyrka</p>
          <p className="text-base text-slate">{windStrength}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif italic text-base text-ink-2">Temperatur</p>
          <p className="text-base text-slate">{temperature}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif italic text-base text-ink-2">Nederbörd</p>
          <p className="text-base text-slate">{precipitation}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastItem;
