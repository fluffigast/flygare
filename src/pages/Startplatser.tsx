import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Wind, Mountain, MapPin } from "lucide-react";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";
import { useLaunches, useOtherSites } from "@/hooks/useCMS";
import { richTextToPlain } from "../lib/payload";

function parseCoords(coords: string): [number, number] | null {
  const match = coords.match(/(\d+)°(\d+)'(\d+)"?N,?\s*(\d+)°(\d+)'(\d+)"?E/);
  if (!match) return null;
  const lat = parseInt(match[1]) + parseInt(match[2])/60 + parseInt(match[3])/3600;
  const lon = parseInt(match[4]) + parseInt(match[5])/60 + parseInt(match[6])/3600;
  return [lat, lon];
}

function coordsToMapsUrl(coords: string): string | null {
  const parsed = parseCoords(coords);
  if (!parsed) return null;
  return `https://www.google.com/maps/search/?api=1&query=${parsed[0].toFixed(6)},${parsed[1].toFixed(6)}`;
}

const starterIcon = new L.DivIcon({
  html: `<div style="width:28px;height:28px;border-radius:50%;background:${T.accent};border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg></div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const landningIcon = new L.DivIcon({
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#b07d3a;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg></div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function Startplatser() {
  const { data: launchesData, loading: launchesLoading } = useLaunches();
  const { data: otherSitesData, loading: otherSitesLoading } = useOtherSites();

  const loading = launchesLoading || otherSitesLoading;

  const LAUNCHES = (launchesData || []).map(l => ({
    name: l.name,
    type: l.type,
    dir: l.direction || "",
    elev: l.elevation || "",
    coords: l.coords || "",
    desc: richTextToPlain(l.description),
    extra: richTextToPlain(l.extra),
  }));

  const OTHER_SITES = (otherSitesData || []).map(s => ({
    name: s.name,
    dir: s.direction || "",
    elev: s.elevationDrop || "",
    desc: richTextToPlain(s.description),
    coords: s.coords,
  }));
  const mapMarkers = useMemo(() => {
    const markers: { name: string; type: string; elev: string; dir: string; pos: [number, number] }[] = [];
    for (const l of LAUNCHES) {
      const pos = parseCoords(l.coords);
      if (pos) markers.push({ name: l.name, type: l.type, elev: l.elev, dir: l.dir, pos });
    }
    for (const s of OTHER_SITES) {
      if (s.coords) {
        const pos = parseCoords(s.coords);
        if (pos) markers.push({ name: s.name, type: "Starter", elev: s.elev, dir: s.dir, pos });
      }
    }
    return markers;
  }, [LAUNCHES, OTHER_SITES]);

  return (
    <>
      <PageHero img={IMG.areSky} title="Startplatser" subtitle="Åreskutans start- och landningsområden." height="clamp(280px, 40vh, 420px)" />

      {mapMarkers.length > 0 && (
        <section style={{ background: T.white, padding: "48px clamp(20px, 5vw, 40px) 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Fade>
              <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(0,0,0,.08)" }}>
                <MapContainer
                  center={[63.41, 13.07]}
                  zoom={13}
                  style={{ height: "clamp(320px, 45vw, 500px)", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapMarkers.map(m => (
                    <Marker key={m.name} position={m.pos} icon={m.type === "Landning" ? landningIcon : starterIcon}>
                      <Popup>
                        <div style={{ fontFamily: T.sans, minWidth: 140 }}>
                          <strong style={{ fontSize: 14, color: T.ink }}>{m.name}</strong>
                          <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>{m.elev} · {m.dir}</div>
                          <div style={{ fontSize: 11, color: m.type === "Landning" ? "#b07d3a" : T.accent, marginTop: 2, fontWeight: 600 }}>{m.type}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                <div style={{ padding: "10px 16px", background: T.bg, display: "flex", gap: 20, alignItems: "center", borderTop: `1px solid ${T.borderL}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.accent, border: "1.5px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                    <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>Starter</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#b07d3a", border: "1.5px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                    <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>Landning</span>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>
      )}

      <Wrap bg={T.bg}>
        {loading && <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, padding: "20px 0" }}>Laddar...</p>}
        <Fade>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 4 }}>
            Alla väderstreck är orienterade som om Kabinbanan ligger i rak nord-sydlig riktning.
            Draklanda är den officiella landningsplatsen — alla andra landningar betraktas som utelandningar vid XC-flyg.
          </p>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, lineHeight: 1.7, maxWidth: 720, marginBottom: 8 }}>
            Vajrarna passeras söder om Stötta 1 vid nedflyg utan höjdvinst. Nya och halverfarna piloter ska alltid följa denna regel. Vajrarna hänger minimum 60 m ovan mark.
          </p>
        </Fade>

        <Fade>
          <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Åreskutan</h3>
        </Fade>
        <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, marginBottom: 48 }}>
          {LAUNCHES.map((l, i) => {
            const isLanding = l.type === "Landning";
            const rowBg = isLanding ? "#faf6f0" : (i % 2 === 0 ? T.white : T.bg);
            return (
            <div key={l.name} style={{
              padding: "18px 24px", background: rowBg, transition: "background .2s",
              ...(isLanding ? { borderLeft: "3px solid #b07d3a" } : {}),
            }}
              onMouseEnter={e => e.currentTarget.style.background = T.accentBg}
              onMouseLeave={e => e.currentTarget.style.background = rowBg}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 500, color: T.ink }}>{l.name}</span>
                    <Badge variant="outline" style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: l.type === "Landning" ? "#b07d3a" : T.accent, borderColor: l.type === "Landning" ? "#b07d3a" : T.accent }}>{l.type}</Badge>
                  </div>
                  <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.ink3, lineHeight: 1.55, maxWidth: 540 }}>{l.desc}</p>
                  {l.extra && <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.muted, lineHeight: 1.5, marginTop: 4, fontStyle: "italic" }}>{l.extra}</p>}
                  {l.coords && (() => {
                    const url = coordsToMapsUrl(l.coords);
                    return url ? (
                      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={12} />{l.coords}
                        </a>
                      </p>
                    ) : (
                      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{l.coords}</p>
                    );
                  })()}
                </div>
                <div style={{ textAlign: "center", minWidth: 56 }}>
                  <Wind size={14} style={{ color: T.accent, marginBottom: 2 }} />
                  <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink2, maxWidth: 80 }}>{l.dir}</div>
                </div>
                <div style={{ textAlign: "center", minWidth: 64 }}>
                  <Mountain size={14} style={{ color: T.accent, marginBottom: 2 }} />
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink2 }}>{l.elev}</div>
                </div>
              </div>
            </div>
          );})}
        </div>

        <Fade>
          <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Andra flygområden</h3>
        </Fade>
        <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
          {OTHER_SITES.map((s, i) => (
            <div key={s.name} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "start",
              padding: "16px 24px", background: i % 2 === 0 ? T.white : T.bg,
            }}>
              <div>
                <span style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500, color: T.ink }}>{s.name}</span>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.ink3, lineHeight: 1.55, marginTop: 4 }}>{s.desc}</p>
                {s.coords && (() => {
                  const url = coordsToMapsUrl(s.coords);
                  return url ? (
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} />{s.coords}
                      </a>
                    </p>
                  ) : (
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{s.coords}</p>
                  );
                })()}
              </div>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <Wind size={14} style={{ color: T.accent, marginBottom: 2 }} />
                <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink2 }}>{s.dir}</div>
              </div>
              <div style={{ textAlign: "center", minWidth: 64 }}>
                <Mountain size={14} style={{ color: T.accent, marginBottom: 2 }} />
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink2 }}>{s.elev}</div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>

      <div style={{ position: "relative", height: "clamp(250px, 35vw, 440px)", overflow: "hidden" }}>
        <img src={IMG.areMullfjallet} alt="Mullfjället naturvy" loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(26,31,46,.45) 100%)" }} />
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Landning</p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", letterSpacing: "-.02em" }}>
              Draklanda — 380 m
            </h2>
          </Fade>
        </div>
      </div>
    </>
  );
}
