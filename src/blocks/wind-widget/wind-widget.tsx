import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { MoveUpIcon } from "lucide-react";

interface WindData {
  station: string;
  wind_ms: number | null;
  wind_max: number | null;
  wind_min: number | null;
  wind_avg: number | null;
  wind_dir: number | null;
  temp_c: number | null;
  time: string | null;
}

function directionLabel(deg: number): string {
  const dirs = ["N", "NO", "O", "SO", "S", "SV", "V", "NV"];
  return dirs[Math.round(deg / 45) % 8];
}

const WindWidget: React.FC = () => {
  const [data, setData] = useState<WindData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/wind")
      .then((res) => {
        if (!res.ok) throw new Error("Wind API error");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Kunde inte hämta vinddata"));
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Väder</p>
          <h2 className="font-serif text-2xl md:text-3xl">Aktuellt väder</h2>
        </div>
        <Link
          to="/flyga-i-are/vader"
          className="text-sm text-primary hover:underline"
        >
          Alla vädertjänster →
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
          <a
            href="https://meac.se/sub_2/hummeln/wind.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Se vinddata på MEAC →
          </a>
        </div>
      )}

      {!error && !data && (
        <div className="rounded-lg border border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">Hämtar vinddata...</p>
        </div>
      )}

      {data && (
        <div className="rounded-lg border border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            {/* Wind speed — hero number */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                {data.wind_dir != null && (
                  <div
                    className="w-8 h-8 text-primary"
                    style={{ transform: `rotate(${data.wind_dir}deg)` }}
                  >
                    <MoveUpIcon className="w-8 h-8" />
                  </div>
                )}
                {data.wind_dir != null && (
                  <span className="text-xs text-muted-foreground">{directionLabel(data.wind_dir)}</span>
                )}
              </div>
              <div>
                <p className="font-serif text-4xl font-bold">
                  {data.wind_ms != null ? data.wind_ms.toFixed(1) : "—"}
                </p>
                <p className="text-xs text-muted-foreground">m/s</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 flex-1">
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Max (10 min)</p>
                <p className="font-semibold">{data.wind_max != null ? `${data.wind_max} m/s` : "—"}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Medel</p>
                <p className="font-semibold">{data.wind_avg != null ? `${data.wind_avg} m/s` : "—"}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Temperatur</p>
                <p className="font-semibold">{data.temp_c != null ? `${data.temp_c}°C` : "—"}</p>
              </div>
            </div>
          </div>

          {/* Timestamp + source */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Mätstation Hummeln, Åre
            </p>
            <p className="text-xs text-muted-foreground">
              {data.time ? `Uppdaterad ${data.time}` : ""}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default WindWidget;
