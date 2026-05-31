/**
 * Wind API proxy — aggregates live wind data from multiple sources.
 * Copied from vindare project (web/src/lib/server/).
 * Sources: MEAC Hummeln (actual sensor), Skistar Åre (scraped forecast).
 */

// ── MEAC Hummeln (live sensor on the mountain) ──────────────

async function fetchMeac() {
  const url = "https://meac.se/sub_2/hummeln/wind.asp";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Flygare/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

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

    // Check staleness
    if (timeMatch) {
      const dataTime = new Date(timeMatch[1].replace(" ", "T") + ":00Z");
      if (Date.now() - dataTime.getTime() > 3600 * 1000) return null;
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
  } catch {
    return null;
  }
}

// ── Skistar (scraped weather page) ──────────────────────────

async function fetchSkistar() {
  const url = "https://www.skistar.com/Lpv/Forecast?lang=en&area=hogzon";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html, */*",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const html = await res.text();

    const updMatch = html.match(/[Uu]pdated:\s*(.*?)</);

    // Current readings from summary items
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
  } catch {
    return null;
  }
}

// ── API handler ─────────────────────────────────────────────

module.exports = async function (context, req) {
  try {
    const [meac, skistar] = await Promise.all([fetchMeac(), fetchSkistar()]);

    const data = {
      meac,
      skistar,
      timestamp: new Date().toISOString(),
    };

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=120",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    context.log("Wind API error:", err);
    context.res = { status: 502, body: "Failed to fetch wind data" };
  }
};
