/**
 * Luftrums-API — restriktions-, fare- och supplementområden runt Åre.
 *
 * Två källor, med olika roll:
 *
 *   AIP, via LFV:s GeoServer bakom DAIM eCharts
 *     mais:RSTA      R-områden
 *     mais:DNGA      D-områden
 *     DAIM_TOPO:SUP  områden från aktuella AIP-supplement
 *
 *   NOTAM, via förhandsbeskedsbulletinen på aro.lfv.se
 *     Utlyser tillfälliga områden som aldrig når AIP, höjer tillfälligt
 *     taket på publicerade områden, och drar in områden som står kvar i AIP.
 *
 * AIP ensamt räcker inte. Ett område som bara finns i NOTAM syns inte i
 * DAIM, och ett område vars tak NOTAM höjt visas där med AIP:s lägre värde.
 * Därför slås båda ihop här, och varje feature bär "source" så att kartan
 * kan skilja dem åt. NOTAM som ändrar ett publicerat område fäster sig på
 * det området som "amendment" i stället för att bli en egen yta.
 *
 * Resiliens:
 *   - Per källa timeout + 1 retry med 1s backoff
 *   - En källa som failar ger null för den, övriga returneras
 *   - Faller NOTAM bort sätts "coverage" till "aip" och klienten säger det
 *   - HTTP cache-control 1800s; NOTAM uppdateras var 30:e minut
 */

const { pdfToText, parseBulletin } = require("./notam");

const WFS = "https://daim.lfv.se/geoserver/wfs";
const PIB_LIST =
  "https://aro.lfv.se/Links/Link/ShowFileList?type=AIS&path=%5Cpibsweden%5C&torlinkName=NOTAM%20Sweden";
const TIMEOUT_MS = 8000;
const NOTAM_TIMEOUT_MS = 20000;

// Jämtland som lat/lon-gränser, samma ruta som BBOX ovan.
const BOUNDS = { lonMin: 11.8, latMin: 62.6, lonMax: 15.3, latMax: 63.9 };

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

async function fetchNotamOnce() {
  const listing = await (
    await fetch(PIB_LIST, {
      headers: { "User-Agent": "Flygare/1.0" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  ).text();

  const match = listing.match(/href="([^"]*ESAA[^"]*99days[^"]*\.pdf)"/i);
  if (!match) throw new Error("ingen 99days-bulletin i fillistan");
  let url = match[1].replace(/ /g, "%20");
  if (!url.startsWith("http")) url = "https://aro.lfv.se" + url;

  const res = await fetch(url, {
    headers: { "User-Agent": "Flygare/1.0" },
    signal: AbortSignal.timeout(NOTAM_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`PIB ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { url, records: parseBulletin(pdfToText(buf)) };
}

function ringInBounds(ring) {
  return ring.some(
    ([lon, lat]) =>
      lon >= BOUNDS.lonMin &&
      lon <= BOUNDS.lonMax &&
      lat >= BOUNDS.latMin &&
      lat <= BOUNDS.latMax
  );
}

function supplementNumber(url) {
  const m = /SUP%20(\d{1,3})-(\d{4})/.exec(url || "");
  return m ? m[1] : null;
}

function mergeNotam(features, records) {
  const byDesignator = new Map();
  const bySupplement = new Map();
  for (const feature of features) {
    const { designator, url } = feature.properties;
    if (designator) byDesignator.set(designator, feature);
    const sup = supplementNumber(url);
    if (sup) {
      if (!bySupplement.has(sup)) bySupplement.set(sup, []);
      bySupplement.get(sup).push(feature);
    }
  }

  const added = [];
  let amendments = 0;

  for (const record of records) {
    const annotate = (feature) => {
      const list = feature.properties.notam || [];
      list.push({
        id: record.id,
        kind: record.kind,
        lower: record.lower,
        upper: record.upper,
        validFrom: record.validFrom,
        validTo: record.validTo,
        schedule: record.schedule,
        text: record.text,
      });
      feature.properties.notam = list;
      // Ett indraget område får inte ritas som aktivt. NOTAM:et upphäver
      // AIP-posten, men AIP-posten ligger kvar och är den kartan utgår från.
      if (record.kind === "withdrawn") feature.properties.kind = "withdrawn";
      amendments++;
    };

    // Egen geometri i NOTAM: ett område som inte finns i AIP alls.
    if (record.ring && ringInBounds(record.ring)) {
      const existing = record.designators
        .map((d) => byDesignator.get(d))
        .find(Boolean);
      if (existing) {
        annotate(existing);
        continue;
      }
      added.push({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [record.ring] },
        properties: {
          designator: record.designators[0] || record.id,
          name: null,
          kind: record.kind === "withdrawn" ? "withdrawn" : "notam",
          kindLabel: "NOTAM-område",
          lower: record.lower,
          upper: record.upper,
          validFrom: record.validFrom,
          validTo: record.validTo,
          effective: null,
          schedule: record.schedule,
          url: null,
          source: "notam",
          notam: [
            {
              id: record.id,
              kind: record.kind,
              lower: record.lower,
              upper: record.upper,
              validFrom: record.validFrom,
              validTo: record.validTo,
              schedule: record.schedule,
              text: record.text,
            },
          ],
        },
      });
      continue;
    }

    // Ingen egen geometri: NOTAM ändrar eller drar in ett publicerat område.
    let attached = false;
    for (const designator of record.designators) {
      const feature = byDesignator.get(designator);
      if (feature) {
        annotate(feature);
        attached = true;
      }
    }
    if (attached) continue;

    for (const sup of record.supplements) {
      for (const feature of bySupplement.get(sup) || []) {
        annotate(feature);
      }
    }
  }

  return { added, amendments };
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
  for (const feature of features) feature.properties.source = "aip";

  const notam = await tryTwice(fetchNotamOnce);
  let merged = { added: [], amendments: 0 };
  if (notam) {
    merged = mergeNotam(features, notam.records);
    features.push(...merged.added);
  }
  sources.notam = notam ? notam.records.length : null;

  const anyOk = Object.values(sources).some((v) => v !== null);

  context.res = {
    status: anyOk ? 200 : 502,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=1800, s-maxage=900",
    },
    body: {
      type: "FeatureCollection",
      features,
      fetchedAt: new Date().toISOString(),
      coverage: notam ? "aip+notam" : "aip",
      coverageNote: notam
        ? "AIP per AIRAC-cykel, sammanslaget med aktuell NOTAM-bulletin. Kontrollera alltid NOTAM före flygning."
        : "NOTAM kunde inte hämtas. Visar enbart AIP, vilket saknar områden som utlyses via NOTAM och visar höjdgränser som NOTAM tillfälligt höjt med AIP:s värde.",
      notamAreas: merged.added.length,
      notamAmendments: merged.amendments,
      sources,
    },
  };
};
