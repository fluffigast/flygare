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
    windDirection: { degrees: number; label: string };
    windStrength: string;
    temperature: string;
    precipitation: string;
  }>;
}

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
    if (items) {
      const mapped = items.map((item) => ({
        ...item,
        date: typeof item.date === "string" ? new Date(item.date) : item.date,
      })) as WeatherItem[];
      setForecastItems(mapped);
      setLoading(false);
      return;
    }

    const loadForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSMHIForecast(ARESKUTAN_LAT, ARESKUTAN_LON);
        const transformed = transformSMHIData(data, 3);
        setForecastItems(transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load forecast");
      } finally {
        setLoading(false);
      }
    };

    loadForecast();
  }, [items]);

  const defaultItems: WeatherItem[] = [
    { day: "Tisdag", date: new Date(2026, 1, 3), windDirection: { degrees: 0, label: "Nordlig" }, windStrength: "2-6 m/s", temperature: "12\u00b0C", precipitation: "0 mm" },
    { day: "Onsdag", date: new Date(2026, 1, 4), windDirection: { degrees: 270, label: "Västlig" }, windStrength: "3-7 m/s", temperature: "10\u00b0C", precipitation: "2 mm" },
    { day: "Torsdag", date: new Date(2026, 1, 5), windDirection: { degrees: 90, label: "Östlig" }, windStrength: "1-4 m/s", temperature: "8\u00b0C", precipitation: "5 mm" },
  ];

  const displayItems = forecastItems.length > 0 ? forecastItems : defaultItems;

  return (
    <section className="mt-24">
      <div className="site-container">
        {/* Header */}
        <div className="border-t border-hairline pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <p className="eyebrow-sm text-base mb-1">Väder</p>
            <h2 className="h-section">Väderprognos för {location}</h2>
          </div>
          <p className="text-sm text-slate-2">Källa: SMHI &middot; Uppdaterad 02:00</p>
        </div>

        {loading && <p className="text-sm text-slate">Laddar väderdata...</p>}
        {error && <p className="text-sm text-red-500">Kunde inte ladda väderdata: {error}</p>}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-0 md:px-5">
            {displayItems.map((item, i) => (
              <WeatherForecastItem key={i} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherForecast;
