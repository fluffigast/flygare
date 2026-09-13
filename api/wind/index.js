/**
 * Wind API proxy — aggregerar vinddata från flera källor.
 *
 * Prioriterings-ordning för klienten:
 *   1. MEAC Hummeln (live-sensor, mest exakt)
 *   2. Skistar Åre (scraped forecast)
 *   3. SMHI PMP3G-forecast (för Åre kommun; API-baserad, mest robust)
 *
 * Alla tre hämtas parallellt. Om en failar returneras null för den
 * källan. Klienten kan visa vad den vill.
 *
 * Resiliens:
 *   - Varje källa har egen 8s timeout + 1 retry med 1s backoff
 *   - HTTP cache-control 120s (klienter respekterar) + s-maxage 60 för CDN
 *   - Stale-check på MEAC-data (måste vara <1h gammal)
 *   - SMHI är alltid tillgänglig även om scrape-källorna failar
 */

const AVERAGES_TIMEOUT_MS = 8000;

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

// ── MEAC Hummeln (live sensor on the mountain) ──────────────

async function fetchMeacOnce() {
  const url = "https://meac.se/sub_2/hummeln/wind.asp";
  const res = await fetch(url, {
    headers: { "User-Agent": "Flygare/1.0" },
    signal: AbortSignal.timeout(AVERAGES_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`MEAC ${res.status}`);

  const buf = await res.arrayBuffer();
  const html = new TextDecoder("iso-8859-1").decode(buf);

  const speedMatch = html.match(/Vindstyrka[\s\S]*?meac_data[^>]*>([\d.]+)\s*m\/s/);
  const tempMatch = html.match(/Temperatur[\s\S]*?meac_data[^>]*>([-\d,]+)/);
  const dirMatch = html.match(/Vindriktning[\s\S]*?meac_data[^>]*>(\d+)/);
  const stats = html.match(/meac_data_simple[^>]*>([\d.]+)\s*m\/s/g) || [];
  const statVals = stats.map((s) => {
    const m = s.match(/([\d.]+)\s*m\/s/);
    return m ? parseFloat(m[1]) : 0;
  });
  const timeMatch = html.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);

  const speed = speedMatch ? parseFloat(speedMatch[1]) : null;

  // Staleness-check (MEAC använder svensk lokaltid CET/CEST)
  if (timeMatch) {
    const raw = timeMatch[1];
    const year = parseInt(raw.slice(0, 4));
    const month = parseInt(raw.slice(5, 7));
    const day = parseInt(raw.slice(8, 10));
    const lastSunMar = 31 - new Date(year, 2, 31).getDay();
    const lastSunOct = 31 - new Date(year, 9, 31).getDay();
    const isCEST =
      (month > 3 && month < 10) ||
      (month === 3 && day >= lastSunMar) ||
      (month === 10 && day < lastSunOct);
    const offsetH = isCEST ? 2 : 1;
    const dataTime = new Date(raw.replace(" ", "T") + `:00+0${offsetH}:00`);
    if (Date.now() - dataTime.getTime() > 3600 * 1000) throw new Error("MEAC stale");
  }

  return {
    source: "MEAC Hummeln",
    type: "sensor",
    wind_ms: speed,
    wind_max: statVals[0] ?? speed,
    wind_avg: statVals[1] ?? speed,
    wind_min: statVals[2] ?? speed,
    wind_dir: dirMatch ? parseInt(dirMatch[1]) : null,
    temp_c: tempMatch ? parseFloat(tempMatch[1].replace(",", ".")) : null,
    time: timeMatch ? timeMatch[1] : null,
  };
}

// ── Skistar (scraped weather page) ──────────────────────────

async function fetchSkistarOnce() {
  const url = "https://www.skistar.com/Lpv/Forecast?lang=en&area=hogzon";
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html, */*",
    },
    signal: AbortSignal.timeout(AVERAGES_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Skistar ${res.status}`);

  const html = await res.text();
  const updMatch = html.match(/[Uu]pdated:\s*(.*?)</);
  const summaryItems = html.match(
    /lpv-info-weather-summary__item[\s\S]*?(?=lpv-info-weather-summary__item|lpv-info-weather-summary">)/g
  );

  const readings = [];
  const locs = ["top", "valley"];
  if (summaryItems) {
    for (let i = 0; i < Math.min(summaryItems.length, 2); i++) {
      const block = summaryItems[i];
      const temp = block.match(/(-?\d+)\s*&deg;C/);
      const wind = block.match(/(\d+)\s*\((\d+)\)\s*m\/s/);
      const simple = !wind ? block.match(/(\d+)\s*m\/s/) : null;
      const dir = block.match(/wind-dir--(\w+)/);
      readings.push({
        location: locs[i],
        temp_c: temp ? parseInt(temp[1]) : null,
        wind_ms: wind ? parseInt(wind[1]) : simple ? parseInt(simple[1]) : null,
        gust_ms: wind ? parseInt(wind[2]) : null,
        wind_dir: dir ? dir[1] : null,
      });
    }
  }

  return {
    source: "Skistar Hummeln",
    type: "forecast",
    updated: updMatch ? updMatch[1].trim() : null,
    readings,
  };
}

// ── SMHI PMP3G-forecast (öppen API, mest robust fallback) ───

async function fetchSmhiOnce() {
  // Draklanda-koordinater ~63.3986° N, 13.0808° Ö. SMHI kräver .3f decimaler.
  const lat = 63.399;
  const lon = 13.081;
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Flygare/1.0", Accept: "application/json" },
    signal: AbortSignal.timeout(AVERAGES_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`SMHI ${res.status}`);
  const json = await res.json();

  // Ta första tidssteget som "nu"
  const now = json.timeSeries?.[0];
  if (!now) throw new Error("SMHI empty timeSeries");

  const getParam = (name) => {
    const p = now.parameters?.find((x) => x.name === name);
    return p?.values?.[0] ?? null;
  };

  return {
    source: "SMHI Åreskutan",
    type: "forecast",
    time: now.validTime ?? null,
    wind_ms: getParam("ws"),         // wind speed m/s
    wind_dir: getParam("wd"),        // wind direction degrees
    gust_ms: getParam("gust"),
    temp_c: getParam("t"),
    pressure_hpa: getParam("msl"),
    humidity_pct: getParam("r"),
    cloud_pct: getParam("tcc_mean"),
  };
}

// ── API handler ─────────────────────────────────────────────

module.exports = async function (context, req) {
  try {
    const [meac, skistar, smhi] = await Promise.all([
      tryTwice(fetchMeacOnce),
      tryTwice(fetchSkistarOnce),
      tryTwice(fetchSmhiOnce),
    ]);

    const data = {
      meac,
      skistar,
      smhi,
      timestamp: new Date().toISOString(),
      sources_online: {
        meac: meac !== null,
        skistar: skistar !== null,
        smhi: smhi !== null,
      },
    };

    // Om alla tre är null → 502, klienten kan visa fallback-meddelande
    if (!meac && !skistar && !smhi) {
      context.res = {
        status: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "All wind sources failed",
          timestamp: data.timestamp,
        }),
      };
      return;
    }

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // klient-cache 120s, edge-cache 60s
        "Cache-Control": "public, max-age=120, s-maxage=60, stale-while-revalidate=300",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    context.log("Wind API error:", err);
    context.res = {
      status: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: String(err), timestamp: new Date().toISOString() }),
    };
  }
};
