import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { MoveUpIcon } from "lucide-react";

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

const WeatherForecastItem: React.FC<WeatherForecastItemProps> = ({
  day,
  date,
  windDirection,
  windStrength,
  temperature,
  precipitation,
}) => {
  const formatDate = (dateValue: Date | string) => {
    const dateObj =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    return format(dateObj, "d MMMM", { locale: sv });
  };

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {/* Day and Date */}
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold text-foreground">{day}</h3>
        <p className="text-muted-foreground">{formatDate(date)}</p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {/* Column 1 */}
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground italic font-serif">
            Vindriktning
          </p>
          <p className="text-foreground inline-flex items-center gap-2">
            <div
              className="w-5 h-5"
              style={{ transform: `rotate(${windDirection.degrees}deg)` }}
            >
              <MoveUpIcon className="w-5 h-5" />
            </div>{" "}
            {windDirection.label}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground italic font-serif">Temperatur</p>
          <p className="text-foreground">{temperature}</p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground italic font-serif">Vindstyrka</p>
          <p className="text-foreground">{windStrength}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground italic font-serif">Nederbörd</p>
          <p className="text-foreground">{precipitation}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastItem;
