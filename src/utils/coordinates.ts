export const formatCoordNum = (n: number): string => {
  return n.toLocaleString("sv-SE", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 4,
  });
};

export const formatWgs84 = (p: { lat: number; lon: number }): string => {
  return `${formatCoordNum(p.lat)}° N, ${formatCoordNum(p.lon)}° Ö`;
};

export const formatSweref99 = (p: { lat: number; lon: number }): string => {
  const east = Math.round(p.lat);
  const north = Math.round(p.lon);
  return `${east.toLocaleString("sv-SE")} m Ö, ${north.toLocaleString(
    "sv-SE"
  )} m N`;
};
