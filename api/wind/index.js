module.exports = async function (context, req) {
  const url = "https://meac.se/sub_2/hummeln/wind.asp";

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Flygare/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      context.res = { status: 502, body: "MEAC unreachable" };
      return;
    }

    const buf = await response.arrayBuffer();
    // meac.se uses iso-8859-1
    const html = new TextDecoder("iso-8859-1").decode(buf);

    // Wind speed
    const speedMatch = html.match(/Vindstyrka[\s\S]*?meac_data[^>]*>([\d.]+)\s*m\/s/);
    const speed = speedMatch ? parseFloat(speedMatch[1]) : null;

    // Temperature
    const tempMatch = html.match(/Temperatur[\s\S]*?meac_data[^>]*>([-\d,]+)/);
    const temp = tempMatch ? parseFloat(tempMatch[1].replace(",", ".")) : null;

    // Direction (degrees)
    const dirMatch = html.match(/Vindriktning[\s\S]*?meac_data[^>]*>(\d+)/);
    const dir = dirMatch ? parseInt(dirMatch[1]) : null;

    // 10-min stats
    const stats = html.match(/meac_data_simple[^>]*>([\d.]+)\s*m\/s/g) || [];
    const statVals = stats.map((s) => {
      const m = s.match(/([\d.]+)\s*m\/s/);
      return m ? parseFloat(m[1]) : 0;
    });

    // Timestamp
    const timeMatch = html.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);
    const time = timeMatch ? timeMatch[1] : null;

    const data = {
      station: "Hummeln",
      wind_ms: speed,
      wind_max: statVals[0] ?? speed,
      wind_min: statVals[2] ?? speed,
      wind_avg: statVals[1] ?? speed,
      wind_dir: dir,
      temp_c: temp,
      time: time,
    };

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    context.log("Wind proxy error:", err);
    context.res = { status: 502, body: "Failed to fetch wind data" };
  }
};
