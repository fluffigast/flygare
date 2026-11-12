import maplibregl from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { RadioGroup } from "radix-ui";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { Site } from "../../data/sites";
import { sites as defaultSites } from "../../data/sites";
import { cn } from "../../utils/cn";

const OPENTOPO_STYLE: StyleSpecification = {
  version: 8,
  projection: { type: "mercator" },
  sources: {
    opentopomap: {
      type: "raster",
      tiles: ["https://tile.opentopomap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '© <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>), © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxzoom: 17,
    },
  },
  layers: [
    {
      id: "opentopomap",
      type: "raster",
      source: "opentopomap",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const BASEMAP_OPTIONS = [
  {
    id: "liberty" as const,
    label: "Standard",
    style: "https://tiles.openfreemap.org/styles/liberty" as const,
  },
  { id: "topo" as const, label: "Topografisk", style: "inline-topo" as const },
] as const;

type BasemapId = (typeof BASEMAP_OPTIONS)[number]["id"];

function styleForBasemap(id: BasemapId): string | StyleSpecification {
  const opt = BASEMAP_OPTIONS.find((o) => o.id === id);
  if (!opt) return BASEMAP_OPTIONS[0].style;
  if (opt.style === "inline-topo") return OPENTOPO_STYLE;
  return opt.style;
}

function sitesLngLatBounds(sites: Site[]): maplibregl.LngLatBounds {
  const bounds = new maplibregl.LngLatBounds();
  for (const site of sites) {
    bounds.extend([
      site.overview.position.wgs84.lon,
      site.overview.position.wgs84.lat,
    ]);
  }
  return bounds;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type AirspaceKind = "restricted" | "danger" | "supplement";

type AirspaceProperties = {
  designator: string | null;
  name: string | null;
  kind: AirspaceKind;
  kindLabel: string;
  lower: string | null;
  upper: string | null;
  validFrom: string | null;
  validTo: string | null;
};

type AirspaceResponse = GeoJSON.FeatureCollection & {
  coverageNote?: string;
};

// Speglar --signal-danger, --signal-safety och --accent i index.css.
// MapLibre-paint kan inte läsa CSS-variabler, därför literalerna här.
const AIRSPACE_COLOR: Record<AirspaceKind, string> = {
  restricted: "#dc2626",
  danger: "#b45309",
  supplement: "#3774a3",
};

const AIRSPACE_LEGEND: { kind: AirspaceKind; label: string }[] = [
  { kind: "restricted", label: "R-område" },
  { kind: "danger", label: "D-område" },
  { kind: "supplement", label: "Supplement" },
];

const airspaceColorExpression = [
  "match",
  ["get", "kind"],
  "restricted",
  AIRSPACE_COLOR.restricted,
  "danger",
  AIRSPACE_COLOR.danger,
  AIRSPACE_COLOR.supplement,
];

function airspaceHoverPopupHtml(props: AirspaceProperties): string {
  const heading = [props.designator, props.name].filter(Boolean).join(" ");
  const limits =
    props.lower && props.upper ? `${props.lower} – ${props.upper}` : null;
  return [
    '<div class="flex max-w-[18rem] flex-col gap-1">',
    `<strong class="text-sm font-semibold text-foreground">${escapeHtml(
      heading || props.kindLabel
    )}</strong>`,
    `<p class="text-xs leading-snug text-muted-foreground">${escapeHtml(
      props.kindLabel
    )}</p>`,
    limits
      ? `<p class="text-xs tabular-nums text-muted-foreground">${escapeHtml(
          limits
        )}</p>`
      : "",
    "</div>",
  ].join("");
}

// "GND"/"SFC" = marknivå, "FL 95" = 9500 fot, rena tal är redan fot.
function lowerLimitFeet(lower: string | null): number {
  if (!lower) return Number.POSITIVE_INFINITY;
  const text = lower.trim().toUpperCase();
  if (text === "GND" || text === "SFC") return 0;
  const flightLevel = text.match(/^FL\s*(\d+)$/);
  if (flightLevel) return Number(flightLevel[1]) * 100;
  const feet = text.match(/^(\d+)/);
  return feet ? Number(feet[1]) : Number.POSITIVE_INFINITY;
}

const FREEFLIGHT_CEILING_FEET = 10000;
const FREEFLIGHT_RADIUS_KM = 60;

function distanceKm(a: [number, number], b: [number, number]): number {
  const toRad = Math.PI / 180;
  const [lonA, latA] = a;
  const [lonB, latB] = b;
  const h =
    Math.sin(((latB - latA) * toRad) / 2) ** 2 +
    Math.cos(latA * toRad) *
      Math.cos(latB * toRad) *
      Math.sin(((lonB - lonA) * toRad) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

function geometryPositions(
  coordinates: GeoJSON.Position | GeoJSON.Position[] | GeoJSON.Position[][] | GeoJSON.Position[][][],
  out: GeoJSON.Position[] = []
): GeoJSON.Position[] {
  if (typeof coordinates[0] === "number") {
    out.push(coordinates as GeoJSON.Position);
    return out;
  }
  for (const part of coordinates as GeoJSON.Position[][]) {
    geometryPositions(part, out);
  }
  return out;
}

function extendBoundsWithGeometry(
  bounds: maplibregl.LngLatBounds,
  coordinates: GeoJSON.Position | GeoJSON.Position[] | GeoJSON.Position[][] | GeoJSON.Position[][][]
): void {
  if (typeof coordinates[0] === "number") {
    bounds.extend(coordinates as [number, number]);
    return;
  }
  for (const part of coordinates as GeoJSON.Position[][]) {
    extendBoundsWithGeometry(bounds, part);
  }
}

function sitesToGeoJSON(sites: Site[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: sites.map((site) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [
          site.overview.position.wgs84.lon,
          site.overview.position.wgs84.lat,
        ],
      },
      properties: {
        slug: site.slug,
        title: site.title,
        excerpt: site.excerpt,
        takeoffMetersAboveSea: site.overview.altitude.takeoffMetersAboveSea,
      },
    })),
  };
}

function siteHoverPopupHtml(props: {
  title: string;
  excerpt: string;
  takeoffMetersAboveSea: number;
}): string {
  const altLabel = `${props.takeoffMetersAboveSea} m ö.h.`;
  return [
    '<div class="flex max-w-[18rem] flex-col gap-1">',
    `<strong class="text-sm font-semibold text-foreground">${escapeHtml(
      props.title
    )}</strong>`,
    `<p class="text-xs leading-snug text-muted-foreground">${escapeHtml(
      props.excerpt
    )}</p>`,
    `<p class="text-xs tabular-nums text-muted-foreground">${escapeHtml(
      altLabel
    )}</p>`,
    "</div>",
  ].join("");
}

export interface SitesMapProps {
  sites?: Site[];
  className?: string;
}

const SitesMap: React.FC<SitesMapProps> = ({
  sites = defaultSites,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const navigate = useNavigate();
  const [basemap, setBasemap] = useState<BasemapId>("liberty");
  const [airspace, setAirspace] = useState<AirspaceResponse | null>(null);
  const [showAirspace, setShowAirspace] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/airspace", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: AirspaceResponse | null) => {
        if (data?.features?.length) setAirspace(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("airspace-fill")) return;
    const visibility = showAirspace ? "visible" : "none";
    for (const id of ["airspace-fill", "airspace-outline"]) {
      map.setLayoutProperty(id, "visibility", visibility);
    }

    if (!showAirspace || !airspace) return;

    // Närmaste område ligger långt utanför startplatsernas vy. Utan den här
    // vidgningen slår man på lagret och ser en tom karta, vilket läser som
    // "inga restriktioner här".
    const bounds = sitesLngLatBounds(sites);
    const centre = bounds.getCenter().toArray() as [number, number];

    // Vidga bara till det som rör skärmflyg. Utan filtret drar ett
    // korridorområde på FL520 ut vyn över halva Skandinavien, och då syns
    // inte längre områdena som faktiskt ligger nära startplatserna.
    for (const feature of airspace.features) {
      if (!feature.geometry || !("coordinates" in feature.geometry)) continue;
      const properties = feature.properties as unknown as AirspaceProperties;
      if (lowerLimitFeet(properties.lower) > FREEFLIGHT_CEILING_FEET) continue;

      const positions = geometryPositions(feature.geometry.coordinates);
      const near = positions.some(
        (position) =>
          distanceKm(centre, position as [number, number]) <=
          FREEFLIGHT_RADIUS_KM
      );
      if (near) extendBoundsWithGeometry(bounds, feature.geometry.coordinates);
    }
    map.fitBounds(bounds, { padding: 48, duration: 600 });
  }, [showAirspace, airspace, sites]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || sites.length === 0) return;

    // React 19 strict mode mounts effects twice; if the container already has a
    // canvas from a previous mount, clear it before constructing a new map —
    // maplibre's style migration crashes when a leftover instance is present.
    while (el.firstChild) el.removeChild(el.firstChild);

    const bounds = sitesLngLatBounds(sites);

    const map = new maplibregl.Map({
      container: el,
      style: styleForBasemap(basemap),
      bounds,
      fitBoundsOptions: { padding: 56, maxZoom: 13, duration: 0 },
    });
    mapRef.current = map;
    map.on("style.load", () => map.setProjection({ type: "mercator" }));

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    let hoverPopup: maplibregl.Popup | null = null;
    let currentHoverFeatureKey: string | undefined;

    const attachAirspaceLayer = () => {
      if (!airspace || map.getSource("airspace")) return;

      map.addSource("airspace", { type: "geojson", data: airspace });

      map.addLayer({
        id: "airspace-fill",
        type: "fill",
        source: "airspace",
        layout: { visibility: showAirspace ? "visible" : "none" },
        paint: {
          "fill-color": airspaceColorExpression as never,
          "fill-opacity": 0.12,
        },
      });

      map.addLayer({
        id: "airspace-outline",
        type: "line",
        source: "airspace",
        layout: { visibility: showAirspace ? "visible" : "none" },
        paint: {
          "line-color": airspaceColorExpression as never,
          "line-width": 1.5,
        },
      });

      map.on("mousemove", "airspace-fill", (e) => {
        const feature = e.features?.[0];
        if (!feature || !hoverPopup) return;
        hoverPopup
          .setLngLat(e.lngLat)
          .setHTML(
            airspaceHoverPopupHtml(
              feature.properties as unknown as AirspaceProperties
            )
          )
          .addTo(map);
      });

      map.on("mouseleave", "airspace-fill", () => hoverPopup?.remove());
    };

    const attachSitesLayer = () => {
      if (map.getSource("sites")) return;

      hoverPopup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "sites-map-popup",
      });

      map.addSource("sites", {
        type: "geojson",
        data: sitesToGeoJSON(sites),
      });

      map.addLayer({
        id: "sites-circles",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": 10,
          "circle-color": "#1a2332",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.on("click", "sites-circles", (e) => {
        const slug = e.features?.[0]?.properties?.slug;
        if (typeof slug === "string") navigate(`/flyga-i-are/startplatser/${slug}`);
      });

      map.on("mousemove", "sites-circles", (e) => {
        const features = e.features;
        if (!features?.length) return;

        const feature = features[0];
        const geometry = feature.geometry;
        if (geometry.type !== "Point") return;

        const coords = geometry.coordinates;
        const featureKey = coords.toString();
        if (currentHoverFeatureKey === featureKey) return;

        currentHoverFeatureKey = featureKey;
        map.getCanvas().style.cursor = "pointer";

        const coordinates = coords.slice() as [number, number];
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const p = feature.properties;
        const title = typeof p?.title === "string" ? p.title : "";
        const excerpt = typeof p?.excerpt === "string" ? p.excerpt : "";
        const rawAlt = p?.takeoffMetersAboveSea;
        const takeoffMetersAboveSea =
          typeof rawAlt === "number"
            ? rawAlt
            : typeof rawAlt === "string"
            ? Number.parseFloat(rawAlt)
            : Number.NaN;

        const html = siteHoverPopupHtml({
          title,
          excerpt,
          takeoffMetersAboveSea: Number.isFinite(takeoffMetersAboveSea)
            ? takeoffMetersAboveSea
            : 0,
        });

        hoverPopup?.setLngLat(coordinates).setHTML(html).addTo(map);
      });

      map.on("mouseleave", "sites-circles", () => {
        currentHoverFeatureKey = undefined;
        map.getCanvas().style.cursor = "";
        hoverPopup?.remove();
      });
    };

    // `load` waits for a visually complete render (tiles, etc.). `styledata` with
    // dataType `style` runs once the stylesheet is ready — enough to add GeoJSON.
    map.on("styledata", (e) => {
      if (e.dataType !== "style") return;
      attachAirspaceLayer();
      attachSitesLayer();
    });

    return () => {
      hoverPopup?.remove();
      hoverPopup = null;
      mapRef.current = null;
      map.remove();
    };
  }, [sites, navigate, basemap, airspace]);

  return (
    <section
      className={
        className ??
        "relative bg-muted w-full min-h-[min(70vh,28rem)] overflow-hidden border border-border"
      }
    >
      <RadioGroup.Root
        className="absolute top-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1 rounded-lg border border-border bg-card p-1 shadow-sm"
        orientation="horizontal"
        value={basemap}
        onValueChange={(v) => setBasemap(v as BasemapId)}
        aria-label="Karttyp"
      >
        {BASEMAP_OPTIONS.map((opt) => (
          <RadioGroup.Item
            key={opt.id}
            value={opt.id}
            className={cn(
              "rounded-md px-2.5 py-1 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              basemap === opt.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {opt.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      {airspace ? (
        <div className="absolute top-3 right-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setShowAirspace((v) => !v)}
            aria-pressed={showAirspace}
            className={cn(
              "rounded-lg border border-border px-2.5 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              showAirspace
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            Luftrum
          </button>

          {showAirspace ? (
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2.5 shadow-sm">
              <ul className="flex flex-col gap-1">
                {AIRSPACE_LEGEND.map((entry) => (
                  <li
                    key={entry.kind}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-xs"
                      style={{ backgroundColor: AIRSPACE_COLOR[entry.kind] }}
                    />
                    {entry.label}
                  </li>
                ))}
              </ul>
              <p className="max-w-[14rem] text-xs leading-snug text-muted-foreground">
                {airspace.features.length} områden i Jämtland. Visar AIP per
                AIRAC-cykel. Områden som utlyses enbart via NOTAM saknas.
                Kontrollera NOTAM före flygning.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="h-full min-h-[min(70vh,28rem)] w-full"
      />
    </section>
  );
};

export default SitesMap;
