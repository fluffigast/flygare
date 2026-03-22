/**
 * SMHI Point Forecast API utility
 * Documentation: https://opendata.smhi.se/metobs/introduction
 *
 * Åreskutan coordinates: ~63.4°N, 13.1°E
 */

export interface SMHIForecastData {
  approvedTime: string;
  referenceTime: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  timeSeries: Array<{
    validTime: string;
    parameters: Array<{
      name: string;
      level: number;
      levelType: string;
      unit: string;
      values: number[];
    }>;
  }>;
}

export interface WeatherForecastItem {
  day: string;
  date: Date;
  windDirection: {
    degrees: number;
    label: string;
  };
  windStrength: string;
  temperature: string;
  precipitation: string;
}

/**
 * Convert wind direction in degrees to arrow and label
 */
function getWindDirection(degrees: number): { degrees: number; label: string } {
  const directions = [
    { deg: 0, degrees: 0, label: "Nordlig" },
    { deg: 45, degrees: 45, label: "Nordostlig" },
    { deg: 90, degrees: 90, label: "Östlig" },
    { deg: 135, degrees: 135, label: "Sydostlig" },
    { deg: 180, degrees: 180, label: "Sydlig" },
    { deg: 225, degrees: 225, label: "Sydvästlig" },
    { deg: 270, degrees: 270, label: "Västlig" },
    { deg: 315, degrees: 315, label: "Nordvästlig" },
  ];

  // Normalize degrees to 0-360
  const normalizedDeg = ((degrees % 360) + 360) % 360;

  // Find closest direction
  let closest = directions[0];
  let minDiff = Math.abs(normalizedDeg - directions[0].deg);

  for (const dir of directions) {
    const diff = Math.min(
      Math.abs(normalizedDeg - dir.deg),
      Math.abs(normalizedDeg - (dir.deg + 360)),
      Math.abs(normalizedDeg - (dir.deg - 360))
    );
    if (diff < minDiff) {
      minDiff = diff;
      closest = dir;
    }
  }

  return closest;
}

/**
 * Get day name in Swedish
 */
function getDayName(date: Date): string {
  const days = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];
  return days[date.getDay()];
}

/**
 * Fetch weather forecast from SMHI Point Forecast API
 * Note: The API requires coordinates rounded to 1 decimal place
 */
export async function fetchSMHIForecast(
  latitude: number,
  longitude: number
): Promise<SMHIForecastData> {
  // Round coordinates to 1 decimal place as the API doesn't accept high precision
  const roundedLat = Math.round(latitude * 10) / 10;
  const roundedLon = Math.round(longitude * 10) / 10;
  
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${roundedLon}/lat/${roundedLat}/data.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch SMHI forecast: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transform SMHI forecast data to component format
 * Returns forecast for the next 3 days
 */
export function transformSMHIData(
  data: SMHIForecastData,
  days: number = 3
): WeatherForecastItem[] {
  const forecastItems: WeatherForecastItem[] = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Group forecasts by day (using local date)
  const dailyData: Map<string, typeof data.timeSeries> = new Map();

  for (const timePoint of data.timeSeries) {
    const forecastDate = new Date(timePoint.validTime);
    // Use local date string to group by day
    const dayKey = `${forecastDate.getFullYear()}-${String(
      forecastDate.getMonth() + 1
    ).padStart(2, "0")}-${String(forecastDate.getDate()).padStart(2, "0")}`;

    if (!dailyData.has(dayKey)) {
      dailyData.set(dayKey, []);
    }
    dailyData.get(dayKey)!.push(timePoint);
  }

  // Process each day, starting from tomorrow
  const sortedDays = Array.from(dailyData.keys()).sort();
  let dayCount = 0;

  for (const dayKey of sortedDays) {
    if (dayCount >= days) break;

    const dayForecasts = dailyData.get(dayKey)!;
    const [year, month, day] = dayKey.split("-").map(Number);
    const dayDate = new Date(year, month - 1, day, 12, 0, 0); // Use noon for the day

    // Skip today, start from tomorrow
    if (dayDate <= today) {
      continue;
    }

    // Calculate averages for the day
    let totalTemp = 0;
    let totalWindSpeed = 0;
    let windDirSinSum = 0;
    let windDirCosSum = 0;
    let totalPrecipitation = 0;
    let tempCount = 0;
    let windCount = 0;
    let precipCount = 0;

    for (const forecast of dayForecasts) {
      const tempParam = forecast.parameters.find((p) => p.name === "t");
      const windSpeedParam = forecast.parameters.find((p) => p.name === "ws");
      const windDirParam = forecast.parameters.find((p) => p.name === "wd");
      const precipParam = forecast.parameters.find((p) => p.name === "pmean");

      if (tempParam && tempParam.values.length > 0) {
        totalTemp += tempParam.values[0];
        tempCount++;
      }
      if (windSpeedParam && windSpeedParam.values.length > 0) {
        totalWindSpeed += windSpeedParam.values[0];
        windCount++;
      }
      if (windDirParam && windDirParam.values.length > 0) {
        const rad = (windDirParam.values[0] * Math.PI) / 180;
        windDirSinSum += Math.sin(rad);
        windDirCosSum += Math.cos(rad);
      }
      if (precipParam && precipParam.values.length > 0) {
        totalPrecipitation += precipParam.values[0];
        precipCount++;
      }
    }

    if (tempCount > 0) {
      const avgTemp = Math.round(totalTemp / tempCount);
      const avgWindSpeed = windCount > 0 ? totalWindSpeed / windCount : 0;
      const avgWindDirRad = Math.atan2(windDirSinSum, windDirCosSum);
      const avgWindDir = windCount > 0 ? ((avgWindDirRad * 180) / Math.PI + 360) % 360 : 0;
      const totalPrecip =
        precipCount > 0 ? Math.round(totalPrecipitation * 10) / 10 : 0;

      const windDir = getWindDirection(avgWindDir);
      const minWind = Math.round(avgWindSpeed);
      const maxWind = Math.round(avgWindSpeed * 1.3);
      const windStrength = `${minWind}-${maxWind} m/s`;

      forecastItems.push({
        day: getDayName(dayDate),
        date: dayDate,
        windDirection: {
          degrees: Math.round(avgWindDir),
          label: windDir.label,
        },
        windStrength,
        temperature: `${avgTemp}°C`,
        precipitation: `${totalPrecip} mm`,
      });

      dayCount++;
    }
  }

  return forecastItems;
}
