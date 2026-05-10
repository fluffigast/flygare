import React, { useEffect, useState } from "react";
import WeatherForecastItem from "./weather-forecast-item";
import {
  fetchSMHIForecast,
  transformSMHIData,
  type WeatherForecastItem as WeatherItem,
} from "../../utils/smhi-api";

export interface WeatherForecastProps {
  location?: string;
  items?: Array<{
    day: string;
    date: Date | string;
    windDirection: {
      degrees: number;
      label: string;
    };
    windStrength: string;
    temperature: string;
    precipitation: string;
  }>;
}

// Åreskutan coordinates
const ARESKUTAN_LAT = 63.4313938;
const ARESKUTAN_LON = 13.0932779;

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  location = "Åreskutan",
  items,
}) => {
  const [forecastItems, setForecastItems] = useState<WeatherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If items are provided as props, use them directly
    if (items) {
      const mappedItems = items.map((item) => ({
        ...item,
        date: typeof item.date === "string" ? new Date(item.date) : item.date,
      })) as WeatherItem[];
      setForecastItems(mappedItems);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from SMHI API
    const loadForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSMHIForecast(ARESKUTAN_LAT, ARESKUTAN_LON);
        const transformed = transformSMHIData(data, 3);
        setForecastItems(transformed);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load forecast"
        );
        console.error("Error fetching weather forecast:", err);
      } finally {
        setLoading(false);
      }
    };

    loadForecast();
  }, [items]);

  // Fallback default items if API fails
  const defaultItems: WeatherItem[] = [
    {
      day: "Tisdag",
      date: new Date(2026, 1, 3),
      windDirection: {
        degrees: 0,
        label: "Nordlig",
      },
      windStrength: "2-6 m/s",
      temperature: "12°C",
      precipitation: "0 mm",
    },
    {
      day: "Onsdag",
      date: new Date(2026, 1, 4),
      windDirection: {
        degrees: 270,
        label: "Västlig",
      },
      windStrength: "3-7 m/s",
      temperature: "10°C",
      precipitation: "2 mm",
    },
    {
      day: "Torsdag",
      date: new Date(2026, 1, 5),
      windDirection: {
        degrees: 90,
        label: "Östlig",
      },
      windStrength: "1-4 m/s",
      temperature: "8°C",
      precipitation: "5 mm",
    },
  ];

  const displayItems = forecastItems.length > 0 ? forecastItems : defaultItems;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="italic font-serif text-muted-foreground">Väder</p>
        <h2 className="text-3xl font-semibold text-foreground">
          Väderprognos för {location}
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-sm text-muted-foreground">Laddar väderdata...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-sm text-red-500">
          Kunde inte ladda väderdata: {error}
        </p>
      )}

      {/* Forecast Items */}
      {!loading && (
        <div className="flex gap-8 justify-between">
          {displayItems.map((item, index) => (
            <WeatherForecastItem key={index} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WeatherForecast;
