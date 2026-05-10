module.exports = async function (context, req) {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    context.res = { status: 400, body: "Missing lat/lon parameters" };
    return;
  }

  const roundedLat = Math.round(parseFloat(lat) * 10) / 10;
  const roundedLon = Math.round(parseFloat(lon) * 10) / 10;

  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${roundedLon}/lat/${roundedLat}/data.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      context.res = { status: response.status, body: `SMHI API error: ${response.statusText}` };
      return;
    }
    const data = await response.text();
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data,
    };
  } catch (err) {
    context.log("SMHI proxy error:", err);
    context.res = { status: 502, body: "Failed to fetch from SMHI" };
  }
};
