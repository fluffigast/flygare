import { app } from "@azure/functions";

app.http("smhi", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "smhi",
  handler: async (request, context) => {
    const lat = request.query.get("lat");
    const lon = request.query.get("lon");

    if (!lat || !lon) {
      return { status: 400, body: "Missing lat/lon parameters" };
    }

    const roundedLat = Math.round(parseFloat(lat) * 10) / 10;
    const roundedLon = Math.round(parseFloat(lon) * 10) / 10;

    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${roundedLon}/lat/${roundedLat}/data.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return { status: response.status, body: `SMHI API error: ${response.statusText}` };
      }
      const data = await response.text();
      return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: data,
      };
    } catch (err) {
      context.log("SMHI proxy error:", err);
      return { status: 502, body: "Failed to fetch from SMHI" };
    }
  },
});
