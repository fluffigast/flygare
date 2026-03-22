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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  const navigate = useNavigate();
  const [basemap, setBasemap] = useState<BasemapId>("liberty");

  useEffect(() => {
    const el = containerRef.current;
    if (!el || sites.length === 0) return;

    const bounds = sitesLngLatBounds(sites);

    const map = new maplibregl.Map({
      container: el,
      style: styleForBasemap(basemap),
      bounds,
      fitBoundsOptions: { padding: 56, maxZoom: 13, duration: 0 },
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    let hoverPopup: maplibregl.Popup | null = null;
    let currentHoverFeatureKey: string | undefined;

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
        if (typeof slug === "string") navigate(`/startplatser/${slug}`);
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
      attachSitesLayer();
    });

    return () => {
      hoverPopup?.remove();
      hoverPopup = null;
      map.remove();
    };
  }, [sites, navigate, basemap]);

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
      <div
        ref={containerRef}
        className="h-full min-h-[min(70vh,28rem)] w-full"
      />
    </section>
  );
};

export default SitesMap;
