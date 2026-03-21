import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap, SH, PageHero } from "../shared";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import type { ThermalZone, ThermalData, CurrentWeather } from "@/types";
import { useFlyingGuide } from "@/hooks/useCMS";
import { richTextToPlain } from "../lib/payload";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;

/* ═══════════════════════════════════════════════════════════
   THERMAL HOOKS & HELPERS
   ═══════════════════════════════════════════════════════════ */

function useThermals() {
  const [zones, setZones] = useState<ThermalZone[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/thermals.json")
      .then((r) => r.json())
      .then((data: ThermalData) => {
        setZones(data.thermalZones);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return { zones, loading };
}

function angularDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function isZoneActive(zone: ThermalZone, weather: CurrentWeather): boolean {
  const pc = zone.preferredConditions;
  let matches = 0;
  if (weather.wind <= pc.maxWind) matches++;
  if (angularDistance(weather.direction, pc.avgWindDirection) <= pc.windDirectionSpread + 30) matches++;
  if (weather.temp >= pc.minTemp - 5) matches++;
  return matches >= 2;
}

function zoneColor(strength: number): string {
  if (strength < 2.5) return "#33bb99";
  if (strength < 4) return "#e89020";
  return "#d04030";
}

/* ═══════════════════════════════════════════════════════════
   XCONTEST HOOK
   ═══════════════════════════════════════════════════════════ */

interface ScrapedFlight {
  trip_id: string;
  pilot: string;
  date: string;
  distance: string;
  type: string;
  country: string;
  track: [number, number, number][] | null; // [lat, lon, alt]
  thermals: { lat: number; lon: number; strength: number; altGain: number }[];
  nearAre?: boolean;
  link?: string;
}

function useFlights() {
  const [flights, setFlights] = useState<ScrapedFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/flights.json")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        // Deduplicate by trip_id
        const seen = new Set<string>();
        const deduped = (data.flights as ScrapedFlight[]).filter(f => {
          if (seen.has(f.trip_id)) return false;
          seen.add(f.trip_id);
          return true;
        });
        setFlights(deduped);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return { flights, loading, error };
}

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Flygguiden() {
  const { zones, loading: thermalsLoading } = useThermals();
  const weatherHook = useCurrentWeather();
  const weather: CurrentWeather = {
    wind: weatherHook.wind,
    gusts: weatherHook.gusts,
    direction: weatherHook.direction,
    temp: weatherHook.temp,
  };
  const [showKK7, setShowKK7] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<ScrapedFlight | null>(null);

  const { flights, loading: flightsLoading, error: flightsError } = useFlights();
  const { data: guide } = useFlyingGuide();

  const anyActive = !weatherHook.loading && !weatherHook.error && zones.some((z) => isZoneActive(z, weather));

  return (
    <>
      <style>{`
        .thermal-active { animation: thermal-pulse 2s ease-in-out infinite; }
        @keyframes thermal-pulse {
          0%, 100% { stroke-width: 3; }
          50% { stroke-width: 6; }
        }
      `}</style>

      <PageHero img={IMG.soaring} title="Flygguiden" subtitle="Information för säkert och härligt flygande vid Åreskutan." height="clamp(280px, 40vh, 420px)" />

      {/* ── Winter / Summer info ── */}
      <Wrap bg={T.bg}>
        <Fade>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 40 }}>
            Guiden är tänkt att främja vår flygsäkerhet samt informera om starter och landningar.
            Hängflygare startar normalt från 1000m starten eller Tväråvalvet. Skärmflygare når alla startområdena
            med olika liftar och korta promenader. Vi önskar dig många härliga flyg från Åreskutan!
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Fade>
            <div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Vintertid</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
                {guide?.winterTitle || "Flyga på vintern"}
              </h2>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <img src={IMG.areWinter} alt="Skärmflyg vinter" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              </div>
              {guide?.winterContent ? (
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {richTextToPlain(guide.winterContent)}
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                    Det bästa med vinterflygning är att nästan alla startplatser är släta och fina. Om snöförhållandena tillåter
                    hjälper Skistar oss att med pistmaskiner göra i ordning fina startplatser. Jakten på de första termikblåsorna
                    brukar starta i början på mars när solen gassar på ordentligt i sydsluttningarna.
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                    Vintersäsongen är mycket passande om du ska flyga in dig på ny utrustning och träna att landa på Draklanda.
                    Att vinterflyga i Åre är en fantastisk upplevelse!
                  </p>
                </>
              )}
            </div>
          </Fade>
          <Fade delay={0.15}>
            <div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Sommartid</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
                {guide?.summerTitle || "Flyga på sommaren"}
              </h2>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <img src={IMG.soaringSunset} alt="Skärmflyg sommar termik" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              </div>
              {guide?.summerContent ? (
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {richTextToPlain(guide.summerContent)}
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                    På sommaren är flygningen lite mer krävande. Framförallt landningen på Draklanda kan vara utmanande.
                    Sök av sydsluttningen mellan Hummeln och Rödkullen — Svartberget, Störtloppet eller Bräckebäcken
                    kan vara svaren på frågan var termiken finns.
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                    Distansrekordet för hängflygare från Åreskutan är 116 km och för skärmflygare drygt 230 km (Åre–Sollefteå).
                    Har du tur vid dina sommarflyg kan det hända att du får sällskap av en kungsörn i termikblåsorna.
                  </p>
                </>
              )}
            </div>
          </Fade>
        </div>
      </Wrap>

      {/* ── Hang gliding ── */}
      <Wrap bg={T.white}>
        <Fade>
          <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Drakflyg</p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
            {guide?.hangGlidingTitle || "Hängflygning från Skutan"}
          </h2>
        </Fade>
        <Separator style={{ background: T.border, margin: "0 0 32px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
          <Fade>
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <img src={IMG.hangGlider} alt="Drakflygare" loading="lazy" style={{ width: "100%", height: 300, objectFit: "cover" }} />
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div>
              {guide?.hangGlidingContent ? (
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {richTextToPlain(guide.hangGlidingContent)}
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                    Under 1980-talet dominerades flygningen av drakar, men under 1990-talet har skärmarna tagit över.
                    Idag görs 95% av all flygning från Skutan med skärm. Hängflygare startar normalt från 1000m starten
                    eller Tväråvalvet.
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                    Trots att skärmflyg dominerar är drakflyg fortfarande en viktig del av klubbens historia och identitet.
                  </p>
                </>
              )}
            </div>
          </Fade>
        </div>
      </Wrap>

      {/* ── Thermal map ── */}
      <Wrap bg={T.bg}>
        <SH italic="Termik" title="Termikkarta Åre" />
        <Separator style={{ background: T.border, margin: "24px 0 32px" }} />

        <Fade>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => setShowKK7(!showKK7)}
              style={{
                fontFamily: T.sans,
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${showKK7 ? T.accent : T.border}`,
                background: showKK7 ? T.accentBg : T.bg,
                color: showKK7 ? T.accent : T.ink3,
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {showKK7 ? "Dölj" : "Visa"} thermal.kk7.ch
            </button>
          </div>
        </Fade>

        {thermalsLoading ? (
          <Fade>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted }}>Laddar termikkarta...</p>
          </Fade>
        ) : (
          <Fade>
            <MapContainer
              center={[63.40, 13.08]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: 500, borderRadius: 12, border: `1px solid ${T.border}` }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {showKK7 && (
                <TileLayer
                  url="https://thermal.kk7.ch/tiles/skyways_all_all/{z}/{x}/{y}.png"
                  opacity={0.5}
                />
              )}
              {zones.map((zone, i) => {
                const active = !weatherHook.loading && !weatherHook.error && isZoneActive(zone, weather);
                const color = zoneColor(zone.strength);
                const pc = zone.preferredConditions;

                // Condition match details
                const windOk = weather.wind <= pc.maxWind;
                const dirOk = angularDistance(weather.direction, pc.avgWindDirection) <= pc.windDirectionSpread + 30;
                const tempOk = weather.temp >= pc.minTemp - 5;

                return (
                  <CircleMarker
                    key={i}
                    center={[zone.lat, zone.lon]}
                    radius={Math.min(8 + zone.frequency * 2, 24)}
                    pathOptions={{
                      color,
                      fillColor: color,
                      fillOpacity: active ? 0.85 : 0.5,
                      weight: active ? 3 : 1.5,
                      className: active ? "thermal-active" : undefined,
                    }}
                  >
                    <Popup>
                      <div style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.6 }}>
                        <strong style={{ fontSize: 14, color: T.ink }}>
                          Styrka: {zone.strength.toFixed(1)} / {zone.maxStrength.toFixed(1)} m/s
                        </strong>
                        <span style={{ display: "block", color: T.ink3, fontSize: 12 }}>(medel / max)</span>
                        <br />
                        Frekvens: {zone.frequency} observationer
                        <br />
                        GPS-höjd vid termik: {Math.round(zone.avgAltitude)}m
                        <br />
                        <br />
                        {!weatherHook.loading && !weatherHook.error ? (
                          <>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "2px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                background: active ? "#d4edda" : "#e9ecef",
                                color: active ? "#155724" : "#6c757d",
                                marginBottom: 6,
                              }}
                            >
                              {active ? "Troligen aktiv" : "Inaktiv"}
                            </span>
                            <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>
                              <div>Vind: {windOk ? "OK" : "ej"} ({weather.wind.toFixed(1)} m/s, max {pc.maxWind})</div>
                              <div>Riktning: {dirOk ? "OK" : "ej"} ({weather.direction}° vs {pc.avgWindDirection}°)</div>
                              <div>Temp: {tempOk ? "OK" : "ej"} ({weather.temp.toFixed(1)}°C, min {pc.minTemp - 5}°C)</div>
                            </div>
                          </>
                        ) : (
                          <span style={{ fontSize: 12, color: T.muted }}>Väderdata ej tillgänglig</span>
                        )}
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
              {/* Selected flight track */}
              {selectedFlight?.track && (
                <Polyline
                  positions={selectedFlight.track.map(c => [c[0], c[1]] as [number, number])}
                  pathOptions={{ color: T.accent, weight: 2.5, opacity: 0.8 }}
                />
              )}
            </MapContainer>

            {!anyActive && (
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, marginTop: 16, lineHeight: 1.6 }}>
                Termikdata baseras på sommarflygningar — aktivitetsdetektering är mest tillförlitlig maj–september.
              </p>
            )}
          </Fade>
        )}
      </Wrap>

      {/* ── XContest flights ── */}
      <Wrap bg={T.white}>
        <SH italic="Flygningar" title="Senaste flygningar" />
        <Separator style={{ background: T.border, margin: "24px 0 32px" }} />

        {flightsLoading ? (
          <Fade>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted }}>Laddar flygningar...</p>
          </Fade>
        ) : flightsError ? (
          <Fade>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
              Kunde inte hämta flygningar.{" "}
              <a
                href="https://www.xcontest.org/sweden/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: T.accent, textDecoration: "underline" }}
              >
                Besök XContest direkt
              </a>
            </p>
          </Fade>
        ) : (
          <Fade>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
              {flights.map((f, i) => {
                const isSelected = selectedFlight?.trip_id === f.trip_id;
                return (
                <div
                  key={f.trip_id + "-" + i}
                  onClick={() => {
                    if (f.track) {
                      setSelectedFlight(isSelected ? null : f);
                      if (f.track && !isSelected) {
                        // Scroll to map
                        document.querySelector(".leaflet-container")?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }
                  }}
                  style={{
                    background: isSelected ? T.accentBg : T.bg,
                    border: `1px solid ${isSelected ? T.accent : T.border}`,
                    borderRadius: 12,
                    padding: 20,
                    transition: "all .2s",
                    cursor: f.track ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.ink }}>
                      {f.pilot}
                    </p>
                    {f.track && (
                      <span style={{
                        fontFamily: T.sans, fontSize: 10, fontWeight: 600,
                        padding: "2px 6px", borderRadius: 4,
                        background: isSelected ? T.accent : T.border,
                        color: isSelected ? T.white : T.muted,
                      }}>
                        {isSelected ? "PÅ KARTAN" : "VISA"}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginBottom: 10 }}>
                    {f.date} — {f.country}
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, marginBottom: 4 }}>
                    {f.distance} — {f.type}
                  </p>
                  {f.thermals.length > 0 && (
                    <p style={{ fontFamily: T.sans, fontSize: 11, color: T.muted }}>
                      {f.thermals.length} termiker detekterade
                    </p>
                  )}
                </div>
                );
              })}
            </div>
          </Fade>
        )}
      </Wrap>
    </>
  );
}
