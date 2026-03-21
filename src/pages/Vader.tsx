import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, CloudRain, Droplets, ArrowUp, Compass, Wind, AlertTriangle } from "lucide-react";
import { T, IMG, Fade, Wrap, SH, PageHero } from "../shared";
import { useCurrentWeather } from "@/hooks/useCurrentWeather.ts";
import type { PredictionData, MetricsData, PredictionEntry } from "@/types.ts";
import { useWeatherLinks } from "@/hooks/useCMS";

/* ═══════════════════════════════════════════════════════════
   WEATHER SYMBOLS — SVG icons for Yr.no symbol_code
   ═══════════════════════════════════════════════════════════ */

function WeatherIcon({ code, size = 48 }: { code: string; size?: number }) {
  const base = code.replace(/_day|_night|_polartwilight/g, "");
  const isNight = code.includes("_night");
  const s = size;
  const c = s / 2;

  // Sun
  const Sun = ({ x = c, y = c, r = s * 0.22 }: { x?: number; y?: number; r?: number }) => (
    <g>
      <circle cx={x} cy={y} r={r} fill="#f5c542" stroke="#e8a920" strokeWidth={1} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const inner = r + 3;
        const outer = r + 7;
        return <line key={angle} x1={x + Math.cos(rad) * inner} y1={y + Math.sin(rad) * inner} x2={x + Math.cos(rad) * outer} y2={y + Math.sin(rad) * outer} stroke="#e8a920" strokeWidth={1.5} strokeLinecap="round" />;
      })}
    </g>
  );

  // Moon
  const Moon = ({ x = c, y = c, r = s * 0.18 }: { x?: number; y?: number; r?: number }) => (
    <g>
      <circle cx={x} cy={y} r={r} fill="#d4d8e0" />
      <circle cx={x + r * 0.35} cy={y - r * 0.2} r={r * 0.85} fill={T.bg} />
    </g>
  );

  // Cloud
  const Cloud = ({ x = c, y = c * 1.1, scale = 1, color = "#b0b8c8" }: { x?: number; y?: number; scale?: number; color?: string }) => (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={12} ry={7} fill={color} />
      <ellipse cx={-7} cy={2} rx={7} ry={5} fill={color} />
      <ellipse cx={7} cy={2} rx={8} ry={5} fill={color} />
      <circle cx={-3} cy={-5} r={6} fill={color} />
      <circle cx={5} cy={-4} r={5} fill={color} />
    </g>
  );

  // Rain drops
  const Rain = ({ x = c, y = s * 0.72, n = 3 }: { x?: number; y?: number; n?: number }) => (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const dx = x - 6 + i * 6;
        return <line key={i} x1={dx} y1={y} x2={dx - 1.5} y2={y + 5} stroke="#5b9bd5" strokeWidth={1.5} strokeLinecap="round" />;
      })}
    </g>
  );

  // Snow dots
  const Snow = ({ x = c, y = s * 0.72, n = 3 }: { x?: number; y?: number; n?: number }) => (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const dx = x - 5 + i * 5;
        return <circle key={i} cx={dx} cy={y + (i % 2) * 3} r={1.5} fill="#5b9bd5" />;
      })}
    </g>
  );

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: "block" }}>
      {(() => {
        switch (base) {
          case "clearsky":
            return isNight ? <Moon /> : <Sun />;
          case "fair":
            return <>
              {isNight ? <Moon x={c - 4} y={c - 4} r={s * 0.14} /> : <Sun x={c - 4} y={c - 5} r={s * 0.16} />}
              <Cloud x={c + 4} y={c + 6} scale={0.65} />
            </>;
          case "partlycloudy":
            return <>
              {isNight ? <Moon x={c - 6} y={c - 6} r={s * 0.13} /> : <Sun x={c - 6} y={c - 7} r={s * 0.15} />}
              <Cloud x={c + 2} y={c + 4} scale={0.8} />
            </>;
          case "cloudy":
            return <>
              <Cloud x={c - 3} y={c - 2} scale={0.7} color="#c8cdd6" />
              <Cloud x={c + 2} y={c + 4} scale={0.85} color="#a8afc0" />
            </>;
          case "lightrain":
          case "rain":
            return <>
              <Cloud x={c} y={c - 2} scale={0.85} color="#8e97a8" />
              <Rain n={base === "lightrain" ? 2 : 3} />
            </>;
          case "heavyrain":
            return <>
              <Cloud x={c} y={c - 2} scale={0.9} color="#7a8496" />
              <Rain n={4} />
            </>;
          case "lightsleet":
          case "sleet":
            return <>
              <Cloud x={c} y={c - 2} scale={0.85} color="#8e97a8" />
              <Rain n={1} x={c - 3} />
              <Snow n={2} x={c + 3} />
            </>;
          case "lightsnow":
          case "snow":
          case "heavysnow":
            return <>
              <Cloud x={c} y={c - 2} scale={0.85} color="#8e97a8" />
              <Snow n={base === "heavysnow" ? 4 : 3} />
            </>;
          case "fog":
            return <>
              {[0, 5, 10].map(dy => (
                <line key={dy} x1={c - 12} y1={c - 2 + dy} x2={c + 12} y2={c - 2 + dy} stroke="#b8bcc8" strokeWidth={2} strokeLinecap="round" opacity={0.6 + dy * 0.03} />
              ))}
            </>;
          case "lightrainshowers":
          case "rainshowers":
          case "heavyrainshowers":
            return <>
              {isNight ? <Moon x={c - 8} y={c - 8} r={s * 0.1} /> : <Sun x={c - 8} y={c - 9} r={s * 0.12} />}
              <Cloud x={c + 2} y={c} scale={0.75} color="#8e97a8" />
              <Rain n={2} />
            </>;
          case "lightrainandthunder":
          case "rainandthunder":
            return <>
              <Cloud x={c} y={c - 3} scale={0.9} color="#6b7488" />
              <Rain n={2} />
              <path d={`M${c + 2} ${s * 0.65} l-3 6 h4 l-3 6`} stroke="#f5c542" strokeWidth={1.5} fill="none" strokeLinecap="round" />
            </>;
          default:
            // Fallback: partly cloudy
            return <>
              {isNight ? <Moon x={c - 5} y={c - 5} r={s * 0.13} /> : <Sun x={c - 5} y={c - 6} r={s * 0.15} />}
              <Cloud x={c + 2} y={c + 4} scale={0.75} />
            </>;
        }
      })()}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   YR.NO FORECAST
   ═══════════════════════════════════════════════════════════ */

interface ForecastDay {
  day: string; date: string; windDir: string; windDirDeg: number;
  windMin: number; windMax: number; tempMin: number; tempMax: number;
  precip: number; symbol: string;
}

const WEEKDAYS = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function degToName(deg: number): string {
  return ["Nordlig", "Nordostlig", "Ostlig", "Sydostlig", "Sydlig", "Sydvästlig", "Västlig", "Nordvästlig"][Math.round(deg / 45) % 8];
}

function useForecast() {
  const [days, setDays] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.40&lon=13.08")
      .then(r => { if (!r.ok) throw new Error("API error"); return r.json(); })
      .then(data => {
        const ts = data.properties.timeseries;
        const byDay = new Map<string, { temps: number[]; winds: number[]; windDirs: number[]; precip: number[]; symbols: string[] }>();
        for (const t of ts) {
          const d = new Date(t.time);
          const key = d.toISOString().slice(0, 10);
          if (!byDay.has(key)) byDay.set(key, { temps: [], winds: [], windDirs: [], precip: [], symbols: [] });
          const b = byDay.get(key)!;
          const det = t.data.instant.details;
          b.temps.push(det.air_temperature);
          b.winds.push(det.wind_speed);
          b.windDirs.push(det.wind_from_direction);
          b.precip.push(t.data.next_1_hours?.details?.precipitation_amount ?? t.data.next_6_hours?.details?.precipitation_amount ?? 0);
          const sym = t.data.next_1_hours?.summary?.symbol_code ?? t.data.next_6_hours?.summary?.symbol_code ?? "";
          if (sym) b.symbols.push(sym);
        }
        const result: ForecastDay[] = [];
        let count = 0;
        for (const [key, v] of byDay) {
          if (count >= 5) break;
          const d = new Date(key + "T12:00:00Z");
          // Pick the midday symbol (most representative)
          const midSym = v.symbols[Math.floor(v.symbols.length * 0.4)] || "partlycloudy_day";
          result.push({
            day: count === 0 ? "Idag" : WEEKDAYS[d.getUTCDay()],
            date: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`,
            windDir: degToName(v.windDirs.reduce((a, b) => a + b, 0) / v.windDirs.length),
            windDirDeg: v.windDirs.reduce((a, b) => a + b, 0) / v.windDirs.length,
            windMin: Math.round(v.winds.reduce((a, b) => a + b, 0) / v.winds.length),
            windMax: Math.round(Math.max(...v.winds)),
            tempMin: Math.round(Math.min(...v.temps)),
            tempMax: Math.round(Math.max(...v.temps)),
            precip: Math.round(v.precip.reduce((a, b) => a + b, 0)),
            symbol: midSym,
          });
          count++;
        }
        setDays(result);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);
  return { days, loading, error };
}

/* ═══════════════════════════════════════════════════════════
   FLYABILITY + PREDICTIONS HELPERS
   ═══════════════════════════════════════════════════════════ */

function flyabilityBadge(wind: number, direction: number) {
  const westerly = direction >= 220 && direction <= 300;
  const bonus = westerly ? 2 : 0;
  const greenMax = 6 + bonus;
  const yellowMax = 10 + bonus;

  if (wind < greenMax) return { label: "Flygbart", color: "#22a66a", bg: "#e6f7ef" };
  if (wind < yellowMax) return { label: "Marginellt", color: "#c49012", bg: "#fef6e0" };
  return { label: "Ej flygbart", color: "#c44022", bg: "#fde8e3" };
}

function filterPredictions(entries: PredictionEntry[]): PredictionEntry[] {
  const now = new Date().getHours();
  const next6 = entries.filter(e => {
    const h = parseInt(e.hour);
    return ((h - now + 24) % 24) <= 6 && ((h - now + 24) % 24) > 0;
  });
  return next6.length >= 3 ? next6 : entries.slice(0, 6);
}

function windColor(ms: number): string {
  if (ms < 6) return "#22a66a";
  if (ms < 10) return "#c49012";
  return "#c44022";
}

/* ═══════════════════════════════════════════════════════════
   LINKS
   ═══════════════════════════════════════════════════════════ */

const WEATHER_LINKS_FALLBACK = [
  { label: "SMHI Fjällväder", url: "https://www.smhi.se/vader/prognoser/fjallvader/areskutan" },
  { label: "Yr.no Åreskutan", url: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-6539391/Sverige/%C3%84re%20kommun/%C3%85reskutan" },
  { label: "XCMeteo", url: "http://www.xcmeteo.net/?p=13.092x63.431" },
  { label: "Windguru", url: "https://www.windguru.cz/368687" },
  { label: "Windy", url: "https://www.windy.com/63.396/13.079?63.396,13.079,10" },
  { label: "TAF/METAR Frösön", url: "https://aro.lfv.se/Links/Link/ViewLink?TorLinkId=229&type=MET" },
  { label: "MEAC Hummeln", url: "https://meac.se/sub_2/hummeln/wind.asp" },
  { label: "MetOffice Isobarer", url: "https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure" },
  { label: "SMHI Satellit", url: "https://www.smhi.se/vader/observationer/satellitbilder" },
];

/* ═══════════════════════════════════════════════════════════
   PREDICTIONS COLUMN
   ═══════════════════════════════════════════════════════════ */

function PredictionColumn({ title, entries }: { title: string; entries: PredictionEntry[] }) {
  const filtered = filterPredictions(entries);
  const maxHigh = Math.max(...filtered.map(e => e.high), 1);

  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.ink2, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(e => {
          const barWidth = Math.max((e.high / maxHigh) * 100, 8);
          const lowWidth = Math.max((e.low / maxHigh) * 100, 2);
          const color = windColor(e.wind_ms);
          return (
            <div key={e.hour} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, width: 42, flexShrink: 0 }}>{e.hour}</span>
              <div style={{ flex: 1, position: "relative", height: 20, background: T.bg, borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  position: "absolute", left: `${lowWidth}%`, width: `${barWidth - lowWidth}%`,
                  top: 0, bottom: 0, background: color, opacity: 0.25, borderRadius: 4,
                }} />
                <div style={{
                  position: "absolute", left: `${(e.wind_ms / maxHigh) * 100}%`,
                  top: 2, bottom: 2, width: 3, background: color, borderRadius: 2,
                  transform: "translateX(-50%)",
                }} />
              </div>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color, width: 50, textAlign: "right", flexShrink: 0 }}>
                {e.wind_ms.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */

export default function Vader() {
  const { days, loading, error } = useForecast();
  const today = days[0];
  const rest = days.slice(1);

  const cw = useCurrentWeather();
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  const { data: weatherLinksData } = useWeatherLinks();
  const WEATHER_LINKS = weatherLinksData?.length
    ? weatherLinksData.map(l => ({ label: l.label, url: l.url }))
    : WEATHER_LINKS_FALLBACK;

  useEffect(() => {
    fetch("/predictions.json")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setPredictions(d as PredictionData))
      .catch(() => {});
    fetch("/metrics.json")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setMetrics(d as MetricsData))
      .catch(() => {});
  }, []);

  const badge = flyabilityBadge(cw.wind, cw.direction);
  const westerly = cw.direction >= 220 && cw.direction <= 300;

  // Staleness check: generated_at > 6h ago
  const stale = predictions ? (Date.now() - new Date(predictions.generated_at).getTime()) > 6 * 3600 * 1000 : false;

  // Pick area — use first available
  const areaKey = predictions ? Object.keys(predictions.areas)[0] : null;
  const area = areaKey ? predictions!.areas[areaKey] : null;

  return (
    <>
      <PageHero img={IMG.arePier} title="Väder & vind" subtitle="Aktuella förhållanden och prognoser för Åreskutan." height="clamp(280px, 40vh, 420px)" />

      {/* ── CURRENT CONDITIONS (Section A) ── */}
      <Wrap bg={T.white}>
        <SH italic="Just nu" title="Aktuella förhållanden" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />

        {cw.loading && <p style={{ fontFamily: T.sans, color: T.muted, padding: "20px 0" }}>Laddar aktuellt väder...</p>}
        {cw.error && <p style={{ fontFamily: T.sans, color: T.muted, padding: "20px 0" }}>Kunde inte ladda aktuellt väder.</p>}

        {!cw.loading && !cw.error && (
          <Fade>
            {/* Flyability badge — prominent at top */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "12px 24px", borderRadius: 10,
              background: badge.bg, border: `1px solid ${badge.color}22`,
              marginBottom: 36,
            }}>
              <Wind size={20} style={{ color: badge.color }} />
              <span style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 700, color: badge.color, letterSpacing: ".02em" }}>
                {badge.label}
              </span>
              {westerly && (
                <span style={{ fontFamily: T.sans, fontSize: 12, color: "#22a66a", marginLeft: 8 }}>
                  Gynnsam vindriktning
                </span>
              )}
            </div>

            {/* Main weather display */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-end" }}>
              {/* Temperature */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 72, fontWeight: 200, letterSpacing: "-.04em", color: T.ink, lineHeight: 1 }}>
                    {Math.round(cw.temp) > 0 ? "+" : ""}{Math.round(cw.temp)}
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 24, fontWeight: 300, color: T.muted }}>&deg;C</span>
                </div>
              </div>

              {/* Wind */}
              <div style={{ minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <ArrowUp size={18} style={{ color: T.accent, transform: `rotate(${cw.direction}deg)`, flexShrink: 0 }} />
                  <span style={{ fontFamily: T.sans, fontSize: 32, fontWeight: 400, color: T.ink2, letterSpacing: "-.02em" }}>
                    {cw.wind.toFixed(1)}
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, color: T.muted }}>m/s</span>
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, marginBottom: 4 }}>
                  {degToName(cw.direction)} ({Math.round(cw.direction)}&deg;)
                </p>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>
                  Byar {cw.gusts.toFixed(1)} m/s
                </p>
              </div>
            </div>
          </Fade>
        )}
      </Wrap>

      {/* ── AI PREDICTIONS (Section B) ── */}
      {area && (
        <Wrap bg={T.bg}>
          <SH italic="AI-prognos" title="Vindprediktion" />
          <Separator style={{ background: T.border, margin: "28px 0 40px" }} />

          {stale && (
            <Fade>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 18px", borderRadius: 8,
                background: "#fef6e0", border: "1px solid #c4901233",
                marginBottom: 28,
              }}>
                <AlertTriangle size={16} style={{ color: "#c49012", flexShrink: 0 }} />
                <span style={{ fontFamily: T.sans, fontSize: 13, color: "#c49012" }}>
                  Prediktionerna genererades f&ouml;r mer &auml;n 6 timmar sedan och kan vara inaktuella.
                </span>
              </div>
            </Fade>
          )}

          <Fade>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <PredictionColumn title="Topp" entries={area.top} />
              <PredictionColumn title="Dal" entries={area.valley} />
            </div>
          </Fade>

          {/* Metrics badge */}
          {metrics && (
            <Fade delay={0.1}>
              <div style={{
                marginTop: 36, padding: "16px 20px", borderRadius: 10,
                background: T.white, border: `1px solid ${T.border}`,
                display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.white,
                    background: T.accent, borderRadius: 4, padding: "3px 8px",
                    textTransform: "uppercase", letterSpacing: ".06em",
                  }}>MAE</span>
                  <span style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.ink2 }}>{metrics.mae} m/s</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.white,
                    background: "#22a66a", borderRadius: 4, padding: "3px 8px",
                    textTransform: "uppercase", letterSpacing: ".06em",
                  }}>{Math.round(metrics.improvement_pct)}% b&auml;ttre</span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>
                    &auml;n persistensprognos
                  </span>
                </div>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, marginTop: 12 }}>
                LightGBM, {(metrics.samples / 1000).toFixed(0)}k observationer, MAE {metrics.mae} m/s ({Math.round(metrics.improvement_pct)}% b&auml;ttre &auml;n persistensprognos)
              </p>
            </Fade>
          )}
        </Wrap>
      )}

      {/* ── TODAY ── */}
      <Wrap bg={T.white}>
        {loading && <p style={{ fontFamily: T.sans, color: T.muted, padding: "20px 0" }}>Laddar prognos...</p>}
        {error && (
          <Fade>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
              <iframe
                src="https://forecast.io/embed/#lat=63.40&lon=13.08&name=Åreskutan&units=si&color=#4a6a8a"
                title="Prognos Åreskutan"
                style={{ width: "100%", height: 240, border: "none" }}
              />
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 12 }}>
              Detaljerad prognos: <a href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-6539391/Sverige/%C3%84re%20kommun/%C3%85reskutan" target="_blank" rel="noopener noreferrer" style={{ color: T.accent }}>Yr.no Åreskutan</a>
            </p>
          </Fade>
        )}

        {today && (
          <Fade>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <WeatherIcon code={today.symbol} size={80} />
                <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, textAlign: "center" }}>
                  {today.day} &middot; {today.date}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Idag &middot; Åreskutan</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 64, fontWeight: 200, letterSpacing: "-.04em", color: T.ink, lineHeight: 1 }}>
                    {today.tempMax > 0 ? "+" : ""}{today.tempMax}
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 300, color: T.muted }}>&deg;C</span>
                </div>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ArrowUp size={16} style={{ color: T.accent, transform: `rotate(${today.windDirDeg}deg)` }} />
                    <span style={{ fontFamily: T.sans, fontSize: 20, fontWeight: 500, color: T.ink2 }}>{today.windDir} {today.windMin}–{today.windMax} m/s</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Droplets size={15} style={{ color: T.accent }} />
                    <span style={{ fontFamily: T.sans, fontSize: 15, color: T.ink2 }}>{today.precip} mm</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: T.sans, fontSize: 14, color: T.muted }}>Min {today.tempMin}&deg; / Max {today.tempMax}&deg;</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* NEXT DAYS */}
        {rest.length > 0 && (
          <>
            <Separator style={{ background: T.border, margin: "48px 0 36px" }} />
            <Fade>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.accent, marginBottom: 6 }}>Prognos</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", marginBottom: 32 }}>Kommande dagar</h2>
            </Fade>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
              {rest.map((d, i) => (
                <Fade key={d.date} delay={i * 0.06}>
                  <div style={{
                    background: T.bg, borderRadius: 12, padding: "24px 20px",
                    border: `1px solid ${T.border}`, transition: "transform .3s",
                    textAlign: "center",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 2 }}>{d.day}</p>
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.accent, marginBottom: 14 }}>{d.date}</p>

                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                      <WeatherIcon code={d.symbol} size={52} />
                    </div>

                    <p style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 300, color: T.ink, letterSpacing: "-.02em", marginBottom: 14 }}>
                      {d.tempMax > 0 ? "+" : ""}{d.tempMax}<span style={{ fontSize: 16, color: T.muted }}>&deg;C</span>
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
                      <ArrowUp size={13} style={{ color: T.accent, transform: `rotate(${d.windDirDeg}deg)` }} />
                      <span style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>{d.windDir}</span>
                    </div>
                    <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, marginBottom: 10 }}>{d.windMin}–{d.windMax} m/s</p>

                    <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                      <CloudRain size={12} style={{ color: T.muted }} />
                      <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>{d.precip} mm</span>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </>
        )}

        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted, marginTop: 32 }}>
          Data: <a href="https://www.yr.no" target="_blank" rel="noopener noreferrer" style={{ color: T.accent }}>Yr.no / MET Norway</a>
        </p>
      </Wrap>

      {/* ── WINDY ── */}
      <Wrap bg={T.bg}>
        <SH italic="Vindkarta" title="Windy — 850 hPa" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />
        <Fade>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
            <iframe src="https://embed.windy.com/embed2.html?lat=63.396&lon=13.079&detailLat=63.400&detailLon=13.080&width=1200&height=450&zoom=10&level=850h&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&metricWind=m%2Fs&metricTemp=%C2%B0C"
              title="Windy" style={{ width: "100%", height: 450, border: "none" }} loading="lazy" />
          </div>
        </Fade>
      </Wrap>

      {/* ── HUMMELN ── */}
      <Wrap bg={T.white}>
        <SH italic="Realtid" title="Hummeln vindstation" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />
        <Fade>
          <div style={{ background: T.white, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderL}`, display: "flex", alignItems: "center", gap: 8 }}>
              <Compass size={14} style={{ color: T.accent }} />
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.ink }}>Hummeln</span>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>Mörvikshummeln · ~900 m</span>
            </div>
            <iframe src="https://meac.se/sub_2/hummeln/wind.asp" title="MEAC Hummeln"
              style={{ width: "100%", height: 480, border: "none" }} loading="lazy" />
          </div>
        </Fade>
      </Wrap>

      {/* ── QUICK LINKS ── */}
      <Wrap bg={T.white}>
        <SH italic="Resurser" title="Snabblänkar" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />
        <Fade>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {WEATHER_LINKS.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 18px", borderRadius: 8,
                background: T.bg, border: `1px solid ${T.border}`,
                fontFamily: T.sans, fontSize: 13.5, color: T.ink2, textDecoration: "none",
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = T.accentBg; e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.bg; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink2; }}
              >
                {l.label}
                <ExternalLink size={11} style={{ opacity: 0.4 }} />
              </a>
            ))}
          </div>
        </Fade>
      </Wrap>
    </>
  );
}
