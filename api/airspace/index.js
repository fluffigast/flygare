/**
 * Luftrums-API — hämtar restriktions-, fare- och supplementområden runt Åre.
 *
 * Källa: LFV:s GeoServer bakom DAIM eCharts (daim.lfv.se/geoserver/wfs).
 * Tre lager slås ihop till en FeatureCollection:
 *   mais:RSTA      R-områden, publicerade i AIP
 *   mais:DNGA      D-områden, publicerade i AIP
 *   DAIM_TOPO:SUP  områden från aktuella AIP-supplement, med egna giltighetstider
 *
 * VIKTIGT om täckning: lagren speglar AIP och är synkade mot AIRAC-cykeln.
 * Områden som utlyses enbart via NOTAM finns inte här, och höjdgränser som
 * NOTAM tillfälligt höjt visas med AIP:s värde. Svaret bär därför
 * "coverage": "aip" så att klienten kan säga det rakt ut. Kartan får aldrig
 * påstå att den visar allt luftrum i kraft.
 *
 * Resiliens:
 *   - Per lager 8s timeout + 1 retry med 1s backoff
 *   - Ett lager som failar ger null för det lagret, övriga returneras
 *   - HTTP cache-control 3600s; AIRAC-cykeln är 28 dygn, supplement ändras sällan
 */

const WFS = "https://daim.lfv.se/geoserver/wfs";
const TIMEOUT_MS = 8000;

// Jämtland. WFS 1.1.0 med explicit EPSG:4326 vill ha lon,lat.
const BBOX = "11.8,62.6,15.3,63.9,EPSG:4326";

const LAYERS = [
  { typename: "mais:RSTA", kind: "restricted", label: "R-område" },
  { typename: "mais:DNGA", kind: "danger", label: "D-område" },
  { typename: "DAIM_TOPO:SUP", kind: "supplement", label: "AIP-supplement" },
];

async function tryTwice(fn) {
  try {
    return await fn();
  } catch {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      return await fn();
    } catch {
      return null;
    }
  }
}

function layerUrl(typename) {
  const q = new URLSearchParams({
    service: "WFS",
    version: "1.1.0",
    request: "GetFeature",
    outputFormat: "application/json",
    srsName: "EPSG:4326",
    typename,
    bbox: BBOX,
  });
  return `${WFS}?${q}`;
}

async function fetchLayerOnce(typename) {
  const res = await fetch(layerUrl(typename), {
    headers: { "User-Agent": "Flygare/1.0" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${typename} ${res.status}`);
  return res.json();
}

const DESIGNATOR = /\bES\s?[RDP]\s?\d{1,4}[A-Z]?\b/;

function designatorOf(props) {
  const named = props.NAMEOFAREA || props.DESIG || "";
  const m = String(named).match(DESIGNATOR);
  return m ? m[0].replace(/\s+/g, "") : null;
}

function nameOf(props, designator) {
  const raw = props.NAME || props.LOCATION || "";
  return (
    String(raw)
      .replace(/^E[SK]\s?[RDP]\s?\d{1,4}[A-Z]?\s*/, "")
      .trim() || null
  );
}

function normalize(layer, collection) {
  if (!collection || !Array.isArray(collection.features)) return [];
  return collection.features
    .filter((f) => f.geometry)
    .map((f) => {
      const p = f.properties || {};
      const designator = designatorOf(p);
      return {
        type: "Feature",
        geometry: f.geometry,
        properties: {
          designator,
          name: nameOf(p, designator),
          kind: layer.kind,
          kindLabel: layer.label,
          lower: p.LOWER ?? null,
          upper: p.UPPER ?? null,
          validFrom: p.FROM ?? null,
          validTo: p.TO ?? null,
          effective: p.WEF ?? null,
          schedule: p.SCHEDULE ?? null,
          url: p.URL ?? null,
        },
      };
    });
}

module.exports = async function (context) {
  const results = await Promise.all(
    LAYERS.map((layer) =>
      tryTwice(() => fetchLayerOnce(layer.typename)).then((data) => ({
        layer,
        data,
      }))
    )
  );

  const features = [];
  const sources = {};
  for (const { layer, data } of results) {
    const items = normalize(layer, data);
    sources[layer.typename] = data ? items.length : null;
    features.push(...items);
  }

  const anyOk = Object.values(sources).some((v) => v !== null);

  context.res = {
    status: anyOk ? 200 : 502,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=1800",
    },
    body: {
      type: "FeatureCollection",
      features,
      fetchedAt: new Date().toISOString(),
      coverage: "aip",
      coverageNote:
        "Speglar AIP per AIRAC-cykel. Områden som utlyses enbart via NOTAM saknas, och höjdgränser som NOTAM tillfälligt höjt visas med AIP:s värde.",
      sources,
    },
  };
};
