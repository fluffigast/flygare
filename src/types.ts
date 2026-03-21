export interface PredictionEntry {
  hour: string;
  wind_ms: number;
  low: number;
  high: number;
}

export interface PredictionData {
  generated_at: string;
  areas: Record<string, { top: PredictionEntry[]; valley: PredictionEntry[] }>;
}

export interface MetricsData {
  samples: number;
  mae: number;
  rmse: number;
  baseline_mae: number;
  improvement_pct: number;
  approach: string;
}

export interface ThermalZone {
  lat: number;
  lon: number;
  strength: number;
  maxStrength: number;
  radius: number;
  frequency: number;
  avgAltitude: number;
  minAltGain?: number;
  maxAltGain?: number;
  startAltRange?: [number, number];  // [min, max] meters
  topAltRange?: [number, number];    // [min, max] meters
  months?: [number, number][];       // [month, count]
  preferredConditions: {
    season: string;
    timeOfDay: string;
    avgTemp: number;
    minTemp: number;
    maxTemp: number;
    avgWind: number;
    maxWind: number;
    avgWindDirection: number;
    windDirectionSamples: number;
    windDirectionSpread: number;
  };
}

export interface ThermalData {
  location: string;
  coordinates: { lat: number; lon: number };
  thermalZones: ThermalZone[];
}

export interface CurrentWeather {
  wind: number;
  gusts: number;
  direction: number;
  temp: number;
}
