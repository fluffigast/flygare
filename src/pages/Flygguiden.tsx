import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap, SH, PageHero } from "../shared";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import type { ThermalZone, ThermalData, CurrentWeather } from "@/types";
import { useFlyingGuide } from "@/hooks/useCMS";
import { richTextToPlain } from "../lib/payload";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, Popup, Polyline } from "react-leaflet";
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
  const windOk = weather.wind <= pc.maxWind;
  const dirOk = angularDistance(weather.direction, pc.avgWindDirection) <= pc.windDirectionSpread + 30;
  const tempOk = weather.temp >= pc.minTemp - 5;
  // Direction is a hard requirement — wrong direction = no thermal regardless
  return dirOk && windOk && tempOk;
}

function zoneColor(strength: number): string {
  if (strength < 1.5) return "#5bc0a0";   // light green — weak lift
  if (strength < 3.0) return "#f0a030";   // amber — moderate
  if (strength < 5.0) return "#e06030";   // orange — strong
  return "#c03020";                        // red — powerful
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
  const [showKK7] = useState(false);
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
          <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 24 }}>
            Kartan visar {zones.length} termikzoner identifierade från GPS-spår i 177 flygningar nära Åre (2021–2026, 50 piloter).
            Cirkelns storlek visar styrka, färgen intensitet. Klicka för detaljer — månader, höjdvinst och vindvillkor.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { color: "#5bc0a0", label: "< 1.5 m/s" },
              { color: "#f0a030", label: "1.5–3" },
              { color: "#e06030", label: "3–5" },
              { color: "#c03020", label: "> 5 m/s" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, opacity: 0.6 }} />
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink3 }}>{item.label}</span>
              </div>
            ))}
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
                return (
                  <Circle
                    key={i}
                    center={[zone.lat, zone.lon]}
                    radius={80 + zone.strength * 40}
                    pathOptions={{
                      color: active ? "#2e7d32" : color,
                      fillColor: active ? "#4caf50" : color,
                      fillOpacity: active ? 0.45 : 0.2,
                      weight: active ? 2 : 0.8,
                      className: active ? "thermal-active" : undefined,
                    }}
                  >
                    <Popup>
                      <div style={{ fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, minWidth: 180 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>
                          {zone.strength.toFixed(1)} – {zone.maxStrength.toFixed(1)} m/s
                        </div>

                        <table style={{ fontSize: 11, color: T.ink3, marginTop: 6, borderSpacing: "0 2px" }}>
                          <tbody>
                            <tr><td style={{ color: T.muted, paddingRight: 8 }}>Höjdvinst</td><td>{zone.minAltGain ?? 0}–{zone.maxAltGain ?? 0}m</td></tr>
                            {zone.startAltRange && <tr><td style={{ color: T.muted, paddingRight: 8 }}>Starthöjd</td><td>{zone.startAltRange[0]}–{zone.startAltRange[1]}m</td></tr>}
                            {zone.topAltRange && <tr><td style={{ color: T.muted, paddingRight: 8 }}>Topphöjd</td><td>{zone.topAltRange[0]}–{zone.topAltRange[1]}m</td></tr>}
                            <tr><td style={{ color: T.muted, paddingRight: 8 }}>Temp</td><td>{pc.minTemp}–{pc.maxTemp}°C</td></tr>
                            <tr><td style={{ color: T.muted, paddingRight: 8 }}>Vind</td><td>&le;{pc.maxWind} m/s, {Math.round(pc.avgWindDirection)}°</td></tr>
                          </tbody>
                        </table>

                        {zone.months && zone.months.length > 0 && (
                          <div style={{ marginTop: 8, borderTop: `1px solid ${T.borderL}`, paddingTop: 6 }}>
                            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                              {zone.months.map(([m, c]) => (
                                <span key={m} style={{
                                  fontSize: 10, padding: "1px 5px", borderRadius: 3,
                                  background: c >= 10 ? "#e8f5e9" : c >= 5 ? "#fff8e1" : "#f5f5f5",
                                  color: c >= 10 ? "#2e7d32" : c >= 5 ? "#f57f17" : T.muted,
                                  fontWeight: c >= 5 ? 600 : 400,
                                }}>
                                  {["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][m-1]} {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Circle>
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
