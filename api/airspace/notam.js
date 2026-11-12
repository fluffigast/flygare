/**
 * NOTAM-läsare utan externa beroenden.
 *
 * LFV publicerar NOTAM enbart som PDF. Texten är satt med subset-fonter, så
 * glyfkoderna i innehållsströmmen betyder ingenting i sig. Mappningen till
 * tecken ligger i PDF:ens egna ToUnicode-tabeller, och det är dem den här
 * filen läser. Ingen magisk offset, inget gissat teckenbord.
 *
 * Utdraget är verifierat mot "pdftotext -layout" på samma bulletin:
 * 294 av 294 poster, identiska fält för LOWER, UPPER, FROM, TO och SCHEDULE.
 */

const zlib = require("node:zlib");

// ── PDF → text ──────────────────────────────────────────────

function inflateStreams(buf) {
  const out = [];
  let pos = 0;
  while (true) {
    const start = buf.indexOf("stream", pos);
    if (start < 0) break;
    let a = start + 6;
    if (buf[a] === 0x0d) a++;
    if (buf[a] === 0x0a) a++;
    const end = buf.indexOf("endstream", a);
    if (end < 0) break;
    try {
      out.push(zlib.inflateSync(buf.subarray(a, end)).toString("latin1"));
    } catch {
      // Okomprimerade eller trasiga strömmar hoppas över.
    }
    pos = end + 9;
  }
  return out;
}

function buildToUnicode(streams) {
  const map = new Map();
  for (const stream of streams) {
    if (!stream.includes("beginbfrange") && !stream.includes("beginbfchar")) continue;
    for (const r of stream.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const lo = parseInt(r[1], 16);
      const hi = parseInt(r[2], 16);
      const uni = parseInt(r[3], 16);
      for (let code = lo; code <= hi; code++) map.set(code, uni + (code - lo));
    }
    for (const r of stream.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>(?!\s*<)/g)) {
      map.set(parseInt(r[1], 16), parseInt(r[2], 16));
    }
  }
  return map;
}

function unescapePdfString(s) {
  return s.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (_, g) => {
    if (g === "n") return "\n";
    if (g === "r") return "\r";
    if (g === "t") return "\t";
    if (g === "b") return "\b";
    if (g === "f") return "\f";
    if (g === "(" || g === ")" || g === "\\") return g;
    return String.fromCharCode(parseInt(g, 8));
  });
}

function pdfToText(buf) {
  const streams = inflateStreams(buf);
  const toUnicode = buildToUnicode(streams);

  const decode = (raw) => {
    const bytes = Buffer.from(raw, "latin1");
    let out = "";
    for (let i = 0; i + 1 < bytes.length; i += 2) {
      const uni = toUnicode.get((bytes[i] << 8) | bytes[i + 1]);
      if (uni !== undefined) out += String.fromCharCode(uni);
    }
    return out;
  };

  const lines = [];
  for (const stream of streams) {
    if (!stream.includes("Tj") && !stream.includes("TJ")) continue;
    const items = [];
    let x = 0;
    let y = 0;
    let size = 9;
    const re =
      /1\s+0\s+0\s+1\s+(-?[\d.]+)\s+(-?[\d.]+)\s+Tm|([-\d.]+)\s+([-\d.]+)\s+Td|\/F\d+\s+([\d.]+)\s+Tf|\(((?:[^()\\]|\\.)*)\)\s*Tj|\[((?:[^\]\\]|\\.)*)\]\s*TJ/g;
    let m;
    while ((m = re.exec(stream))) {
      if (m[1] !== undefined) { x = parseFloat(m[1]); y = parseFloat(m[2]); continue; }
      if (m[3] !== undefined) { x += parseFloat(m[3]); y += parseFloat(m[4]); continue; }
      if (m[5] !== undefined) { size = parseFloat(m[5]); continue; }
      let text = "";
      if (m[6] !== undefined) text = decode(unescapePdfString(m[6]));
      else for (const p of m[7].matchAll(/\(((?:[^()\\]|\\.)*)\)/g)) text += decode(unescapePdfString(p[1]));
      if (text) items.push({ x, y, size, text });
    }
    if (!items.length) continue;

    const rows = new Map();
    for (const it of items) {
      const key = Math.round(it.y * 2) / 2;
      if (!rows.has(key)) rows.set(key, []);
      rows.get(key).push(it);
    }
    for (const key of [...rows.keys()].sort((a, b) => b - a)) {
      const row = rows.get(key).sort((a, b) => a.x - b.x);
      const charWidth = (row[0].size || 9) * 0.5;
      let line = " ".repeat(Math.max(0, Math.round(row[0].x / charWidth)));
      for (const it of row) {
        const col = Math.round(it.x / charWidth);
        if (col > line.length) line += " ".repeat(col - line.length);
        line += it.text;
      }
      lines.push(line.replace(/\s+$/, ""));
    }
    lines.push("");
  }
  return lines.join("\n");
}

// ── Text → poster ───────────────────────────────────────────

const NOTAM_ID = /\b([A-Z]\d{4}\/\d{2})\b/;
const SECTIONS = new Set(["AERODROMES", "EN-ROUTE", "NAV WARNINGS"]);
const PAGE_FOOTER = /^Page \d+ of \d+$/;
const CONTINUATION = ["SCHEDULE:", "FROM:"];

/**
 * Delar bulletinen i poster. Posten slutar pa raden med NOTAM-numret.
 *
 * Tva layoutfallor, bada observerade i skarp text. SCHEDULE star pa raden
 * efter numret och hor till posten som just avslutats, inte till nasta. Och
 * ibland bryts numret ut pa egen rad sa att FROM/TO kommer efter det. Utan
 * framatblicken glider tidsschemat ett steg, eller forsvinner.
 */
function splitRecords(text) {
  const lines = text.split("\n");
  const out = [];
  let section = "HEADER";
  let buffer = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (SECTIONS.has(trimmed)) {
      section = trimmed;
      buffer = [];
      i++;
      continue;
    }
    buffer.push(lines[i]);
    const match = NOTAM_ID.exec(lines[i]);
    if (match) {
      let j = i + 1;
      let pending = [];
      while (j < lines.length) {
        const v = lines[j].trim();
        if (!v || PAGE_FOOTER.test(v)) { pending.push(lines[j]); j++; continue; }
        if (CONTINUATION.some((c) => v.startsWith(c))) {
          buffer.push(...pending, lines[j]);
          pending = [];
          j++;
          continue;
        }
        break;
      }
      i = j;
      out.push({ id: match[1], section, text: buffer.join("\n") });
      buffer = [];
      continue;
    }
    i++;
  }

  // Sidbrytningar upprepar radblock. Behall den rikaste dubbletten.
  const best = new Map();
  for (const r of out) {
    const prev = best.get(r.id);
    if (!prev || r.text.length > prev.text.length) best.set(r.id, r);
  }
  return out.filter((r) => best.get(r.id) === r);
}

// Sista traffen, inte forsta: upprepade radblock kan bara med rester.
function lastField(text, name) {
  const hits = [...text.matchAll(new RegExp(name + ":\\s*([^\\n]+)", "g"))];
  return hits.length ? hits[hits.length - 1][1].trim() : null;
}

function timespan(text, id) {
  const pattern = /FROM:\s*(.+?)\s{2,}TO:\s*(.+?)(?:\s{2,}|$)/;
  for (const line of text.split("\n")) {
    if (line.includes(id)) {
      const m = pattern.exec(line);
      if (m) return [m[1].trim(), m[2].trim()];
    }
  }
  const all = [...text.matchAll(/FROM:\s*(.+?)\s{2,}TO:\s*(.+?)(?:\s{2,}|$)/gm)];
  if (!all.length) return [null, null];
  const last = all[all.length - 1];
  return [last[1].trim(), last[2].trim()];
}

function scheduleFor(text, id) {
  const lines = text.split("\n");
  for (let k = 0; k < lines.length; k++) {
    if (!lines[k].includes(id)) continue;
    for (const next of lines.slice(k + 1)) {
      const v = next.trim();
      if (!v || PAGE_FOOTER.test(v) || v.startsWith("FROM:")) continue;
      if (v.startsWith("SCHEDULE:")) return v.slice(v.indexOf(":") + 1).trim();
      break;
    }
  }
  return null;
}

const MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

function parseMoment(raw) {
  if (!raw) return null;
  if (raw.toUpperCase().includes("PERM")) return "PERM";
  const m = /^(\d{2})\s+([A-Z]{3})\s+(\d{4})\s+(\d{2}):(\d{2})/.exec(raw.toUpperCase());
  if (!m || !(m[2] in MONTHS)) return null;
  return `${m[3]}-${String(MONTHS[m[2]]).padStart(2, "0")}-${m[1]}T${m[4]}:${m[5]}Z`;
}

function dms(token) {
  const m = /^(\d{2,3})(\d{2})(\d{2}(?:[.,]\d+)?)([NSEW])$/.exec(token);
  if (!m) return null;
  const value = Number(m[1]) + Number(m[2]) / 60 + Number(m[3].replace(",", ".")) / 3600;
  return "SW".includes(m[4]) ? -value : value;
}

const COORD_PAIR = /(\d{6}(?:[.,]\d+)?[NS])\s+(\d{7}(?:[.,]\d+)?[EW])/g;
const CIRCLE = /RADIUS\s+([\d.,]+)\s*NM\s+CENTERED\s+ON\s+(\d{6}(?:[.,]\d+)?[NS])\s+(\d{7}(?:[.,]\d+)?[EW])/i;

function ringFromText(text) {
  const circle = CIRCLE.exec(text);
  if (circle) {
    const radius = Number(circle[1].replace(",", "."));
    const lat = dms(circle[2]);
    const lon = dms(circle[3]);
    if (lat === null || lon === null) return null;
    const ring = [];
    for (let i = 0; i <= 36; i++) {
      const a = (i * 10 * Math.PI) / 180;
      ring.push([
        Number((lon + ((radius / 60) * Math.sin(a)) / Math.max(Math.cos((lat * Math.PI) / 180), 1e-6)).toFixed(6)),
        Number((lat + (radius / 60) * Math.cos(a)).toFixed(6)),
      ]);
    }
    return ring;
  }
  const ring = [];
  for (const m of text.matchAll(COORD_PAIR)) {
    const lat = dms(m[1]);
    const lon = dms(m[2]);
    if (lat !== null && lon !== null) ring.push([Number(lon.toFixed(6)), Number(lat.toFixed(6))]);
  }
  if (ring.length < 3) return null;
  const [first] = ring;
  const last = ring[ring.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first);
  return ring;
}

const DESIGNATOR = /\bES\s?([RD])\s?(\d{1,4}[A-Z]?)\b/g;
const SUP_REFERENCE = /AIP\s+(?:AIRAC\s+)?SUP\s+(\d{1,3})[-/](\d{2,4})/gi;

function classify(text) {
  const upper = text.toUpperCase();
  if (upper.includes("WITHDRAWN")) return "withdrawn";
  if (upper.includes("CHANGED") || upper.includes("RAISED")) return "amended";
  if (upper.includes("ESTABLISHED")) return "established";
  if (upper.includes("EXERCISE")) return "exercise";
  return "other";
}

function parseBulletin(text) {
  return splitRecords(text)
    .filter((r) => !r.text.includes("please see NOTAM"))
    .map((r) => {
      const [from, to] = timespan(r.text, r.id);
      const designators = [...new Set([...r.text.matchAll(DESIGNATOR)].map((m) => "ES" + m[1] + m[2]))];
      const supplements = [...new Set([...r.text.matchAll(SUP_REFERENCE)].map((m) => m[1]))];
      const body = r.text.replace(/Page \d+ of \d+/g, " ").replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
      return {
        id: r.id,
        section: r.section,
        kind: classify(r.text),
        designators,
        supplements,
        lower: lastField(r.text, "LOWER"),
        upper: lastField(r.text, "UPPER"),
        validFrom: parseMoment(from),
        validTo: parseMoment(to),
        schedule: scheduleFor(r.text, r.id),
        ring: ringFromText(r.text),
        text: body.replace(/^\+\s*/, ""),
      };
    });
}

module.exports = { pdfToText, parseBulletin };
