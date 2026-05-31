/**
 * SMHI SNOW1gv1 Forecast API utility
 * Docs: https://opendata.smhi.se/metfcst/snow1gv1
 *
 * Åreskutan coordinates: ~63.4°N, 13.1°E
 */

export interface SMHIForecastData {
  createdTime: string;
  referenceTime: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  timeSeries: Array<{
    time: string;
    data: {
      air_temperature?: number;
      wind_speed?: number;
      wind_from_direction?: number;
      mean_precipitation_intensity?: number;
      [key: string]: number | undefined;
    };
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

function getWindDirection(degrees: number): { degrees: number; label: string } {
  const directions = [
    { deg: 0, label: "Nordlig" },
    { deg: 45, label: "Nordostlig" },
    { deg: 90, label: "Östlig" },
    { deg: 135, label: "Sydostlig" },
    { deg: 180, label: "Sydlig" },
    { deg: 225, label: "Sydvästlig" },
    { deg: 270, label: "Västlig" },
    { deg: 315, label: "Nordvästlig" },
  ];

  const normalizedDeg = ((degrees % 360) + 360) % 360;

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

  return { degrees: Math.round(normalizedDeg), label: closest.label };
}

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

export async function fetchSMHIForecast(
  latitude: number,
  longitude: number
): Promise<SMHIForecastData> {
  const roundedLat = Math.round(latitude * 10) / 10;
  const roundedLon = Math.round(longitude * 10) / 10;

  const url = `/api/smhi?lat=${roundedLat}&lon=${roundedLon}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch SMHI forecast: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transform SNOW1gv1 forecast data to component format.
 * New API uses flat data objects with readable field names.
 */
export function transformSMHIData(
  data: SMHIForecastData,
  days: number = 3
): WeatherForecastItem[] {
  const forecastItems: WeatherForecastItem[] = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Group forecasts by day
  const dailyData: Map<string, typeof data.timeSeries> = new Map();

  for (const timePoint of data.timeSeries) {
    const forecastDate = new Date(timePoint.time);
    const dayKey = `${forecastDate.getFullYear()}-${String(
      forecastDate.getMonth() + 1
    ).padStart(2, "0")}-${String(forecastDate.getDate()).padStart(2, "0")}`;

    if (!dailyData.has(dayKey)) {
      dailyData.set(dayKey, []);
    }
    dailyData.get(dayKey)!.push(timePoint);
  }

  const sortedDays = Array.from(dailyData.keys()).sort();
  let dayCount = 0;

  for (const dayKey of sortedDays) {
    if (dayCount >= days) break;

    const dayForecasts = dailyData.get(dayKey)!;
    const [year, month, day] = dayKey.split("-").map(Number);
    const dayDate = new Date(year, month - 1, day, 12, 0, 0);

    if (dayDate <= today) continue;

    let totalTemp = 0;
    let totalWindSpeed = 0;
    let windDirSinSum = 0;
    let windDirCosSum = 0;
    let totalPrecipitation = 0;
    let tempCount = 0;
    let windCount = 0;
    let precipCount = 0;

    for (const forecast of dayForecasts) {
      const d = forecast.data;

      if (d.air_temperature != null) {
        totalTemp += d.air_temperature;
        tempCount++;
      }
      if (d.wind_speed != null) {
        totalWindSpeed += d.wind_speed;
        windCount++;
      }
      if (d.wind_from_direction != null) {
        const rad = (d.wind_from_direction * Math.PI) / 180;
        windDirSinSum += Math.sin(rad);
        windDirCosSum += Math.cos(rad);
      }
      if (d.mean_precipitation_intensity != null) {
        totalPrecipitation += d.mean_precipitation_intensity;
        precipCount++;
      }
    }

    if (tempCount > 0) {
      const avgTemp = Math.round(totalTemp / tempCount);
      const avgWindSpeed = windCount > 0 ? totalWindSpeed / windCount : 0;
      const avgWindDirRad = Math.atan2(windDirSinSum, windDirCosSum);
      const avgWindDir =
        windCount > 0
          ? ((avgWindDirRad * 180) / Math.PI + 360) % 360
          : 0;
      // mean_precipitation_intensity is mm/h — average the rate for display
      const avgPrecip =
        precipCount > 0 ? Math.round((totalPrecipitation / precipCount) * 10) / 10 : 0;

      const windDir = getWindDirection(avgWindDir);
      const minWind = Math.round(avgWindSpeed);
      const maxWind = Math.round(avgWindSpeed * 1.3);

      forecastItems.push({
        day: getDayName(dayDate),
        date: dayDate,
        windDirection: windDir,
        windStrength: `${minWind}-${maxWind} m/s`,
        temperature: `${avgTemp}°C`,
        precipitation: `${avgPrecip} mm/h`,
      });

      dayCount++;
    }
  }

  return forecastItems;
}
