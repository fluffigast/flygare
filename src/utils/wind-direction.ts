export const DIRECTIONS_SV = [
  "nord",
  "nordnordost",
  "nordost",
  "ostnordost",
  "ost",
  "ostsydost",
  "sydost",
  "sydsydost",
  "syd",
  "sydsydväst",
  "sydväst",
  "västsydväst",
  "väst",
  "västnordväst",
  "nordväst",
  "nordnordväst",
] as const;

export function degToDirSv(deg: number): string {
  const d = ((deg % 360) + 360) % 360;
  const i = Math.round(d / 22.5) % 16;
  const raw = DIRECTIONS_SV[i];
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function windDirectionCaption(min: number, max: number): string {
  return `${degToDirSv(min)} till ${degToDirSv(max)}`;
}
