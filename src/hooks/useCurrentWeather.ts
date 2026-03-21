import { useState, useEffect } from "react";
import type { CurrentWeather } from "../types.ts";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=63.40&longitude=13.08&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m&wind_speed_unit=ms";

export function useCurrentWeather() {
  const [weather, setWeather] = useState<CurrentWeather>({ wind: 0, gusts: 0, direction: 0, temp: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        const c = data.current;
        setWeather({
          wind: c.wind_speed_10m ?? 0,
          gusts: c.wind_gusts_10m ?? 0,
          direction: c.wind_direction_10m ?? 0,
          temp: c.temperature_2m ?? 0,
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { ...weather, loading, error };
}
