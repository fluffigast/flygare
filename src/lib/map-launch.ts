import type { TakeoffSite } from "../data/sites";

/**
 * Maps a CMS Launches collection document to the frontend TakeoffSite shape.
 */
export function mapLaunchToSite(launch: any): TakeoffSite {
  const richTextToString = (value: any): string => {
    if (typeof value === "string") return value;
    if (value?.root?.children) {
      return value.root.children
        .map((block: any) =>
          block.children?.map((child: any) => child.text ?? "").join("") ?? ""
        )
        .join("\n\n");
    }
    return "";
  };

  const descriptionText = richTextToString(launch.description);
  const descriptions = descriptionText
    ? descriptionText.split("\n\n").filter(Boolean)
    : [];

  return {
    id: launch.id?.toString() ?? launch.slug ?? "unknown",
    slug: launch.slug ?? launch.id?.toString() ?? "unknown",
    kind: "startplats",
    title: launch.name ?? "",
    excerpt: launch.excerpt ?? "",
    category: "Startplats",
    updatedAt: launch.updatedAt ?? new Date().toISOString(),
    overview: {
      position: {
        wgs84: {
          lat: launch.position?.wgs84Lat ?? 0,
          lon: launch.position?.wgs84Lon ?? 0,
        },
        sweref99: {
          lat: launch.position?.sweref99Lat ?? 0,
          lon: launch.position?.sweref99Lon ?? 0,
        },
      },
      altitude: {
        takeoffMetersAboveSea: launch.altitudeMeters ?? 0,
        heightAboveLandingApproxMeters: launch.heightAboveLanding ?? 0,
      },
      wind: {
        directionRange: {
          min: launch.windDirMin ?? 0,
          max: launch.windDirMax ?? 360,
        },
        notes: launch.windNotes ?? "",
      },
      experienceLevel: {
        level: launch.experienceLevel ?? "medel",
        notes: launch.experienceNotes ?? "",
      },
      lastUpdated: new Date(launch.updatedAt ?? Date.now()),
    },
    description: descriptions,
    risks: (launch.risks ?? []).map((r: any) =>
      typeof r === "string" ? r : r?.text ?? ""
    ),
    emergency: {
      phoneNumber: "112",
      locationInstruction: launch.emergencyLocation
        ? `Ange "${launch.emergencyLocation}"`
        : "Ange din position.",
      contactNote:
        "Klubbens kontaktperson för nödlägen finns under sektionen Nödlägen på webbplatsen.",
      position: {
        wgs84: {
          lat: launch.position?.wgs84Lat ?? 0,
          lon: launch.position?.wgs84Lon ?? 0,
        },
        sweref99: {
          lat: launch.position?.sweref99Lat ?? 0,
          lon: launch.position?.sweref99Lon ?? 0,
        },
      },
    },
    content: descriptions.join("\n\n"),
  };
}
