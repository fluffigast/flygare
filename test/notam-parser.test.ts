import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parseBulletin } = require("../api/airspace/notam.js");

/**
 * Bulletinen sätts med fast radbredd och bryts över sidor. Två layoutvarianter
 * har observerats i skarp text och båda gav tyst fel data innan de hanterades.
 * Fixturen nedan återger dem radvis, med samma kolumnavstånd som bulletinen.
 */
const BULLETIN = [
  "NAV WARNINGS",
  "+   TEMPORARY DANGER AREA ESD836 ARE OTTSJO ESTABLISHED FOR UAS",
  "    FLYING BVLOS. AREA BOUNDED BY: 631718N 0125541E - 631534N 0130547E -",
  "    631137N 0125822E - 631348N 0125017E - 631718N 0125541E",
  "    LOWER: SFC",
  "    UPPER: 4500FT AMSL",
  "    FROM: 26 OCT 2026 05:00    TO: 13 NOV 2026 15:00                      A1205/26",
  "    SCHEDULE: MON-FRI 0500-1500",
  "",
  "+   MIL EXERCISE EXAMPLE INSIDE ESAA FIR.",
  "    LOWER: SFC",
  "    UPPER: FL095",
  "    FROM: 09 NOV 2026 00:00    TO: 13 NOV 2026 23:59                      A1182/26",
  "",
  "+   DANGER AREA ESD873 OPTAND COMPLETELY WITHDRAWN. REF AIP ENR 5.1.",
  "    LOWER: GND",
  "    UPPER: 2300FT AMSL",
  "                                                                          A0948/26",
  "    FROM: 01 SEP 2026 00:00   TO: PERM",
  "                                                              Page 34 of 35",
  "                                                                          A0948/26",
  "    FROM: 01 SEP 2026 00:00   TO: PERM",
  "",
  "+   please see NOTAM B3740/26 :- ESIA",
].join("\n");

describe("parseBulletin", () => {
  const records = parseBulletin(BULLETIN);
  const byId = Object.fromEntries(
    records.map((r: { id: string }) => [r.id, r])
  );

  it("hoppar över rena hänvisningsposter", () => {
    expect(records.map((r: { id: string }) => r.id)).toEqual([
      "A1205/26",
      "A1182/26",
      "A0948/26",
    ]);
  });

  it("knyter tidsschemat till rätt post", () => {
    // Schemat står på raden efter NOTAM-numret och hör till posten som just
    // avslutats. Utan framåtblick hamnar det på nästa område.
    expect(byId["A1205/26"].schedule).toBe("MON-FRI 0500-1500");
    expect(byId["A1182/26"].schedule).toBeNull();
  });

  it("läser tider när numret står ensamt på sin rad", () => {
    // Sidbrytningen bryter ut numret och lägger FROM/TO efter det.
    expect(byId["A0948/26"].validFrom).toBe("2026-09-01T00:00Z");
    expect(byId["A0948/26"].validTo).toBe("PERM");
  });

  it("slår ihop dubbletter från sidbrytning", () => {
    expect(records.filter((r: { id: string }) => r.id === "A0948/26")).toHaveLength(1);
  });

  it("läser höjdgränser och beteckning", () => {
    expect(byId["A1205/26"].lower).toBe("SFC");
    expect(byId["A1205/26"].upper).toBe("4500FT AMSL");
    expect(byId["A1205/26"].designators).toEqual(["ESD836"]);
  });

  it("skiljer indragning från etablering", () => {
    expect(byId["A1205/26"].kind).toBe("established");
    expect(byId["A0948/26"].kind).toBe("withdrawn");
  });

  it("bygger en sluten polygon av hörnpunkterna", () => {
    const ring = byId["A1205/26"].ring;
    expect(ring).toHaveLength(5);
    expect(ring[0]).toEqual(ring[ring.length - 1]);
    const [lon, lat] = ring[0];
    expect(lat).toBeCloseTo(63.2883, 3);
    expect(lon).toBeCloseTo(12.9281, 3);
  });

  it("ger ingen geometri när hörnpunkter saknas", () => {
    expect(byId["A1182/26"].ring).toBeNull();
  });
});
