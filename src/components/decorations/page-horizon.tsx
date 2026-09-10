import React from "react";
import MountainSilhouette from "./mountain-silhouette";

/**
 * PageHorizon — bergssilhuetten som sista element före footer.
 *
 * Renders i normal doc-flow (INTE position:fixed) så den fungerar
 * som en verklig visuell "horisont" mellan sidans innehåll och
 * footern — inte flyter genom transparent content mitt på sidan.
 *
 * Måttlig höjd (h-40) så den inte tar för mycket plats men ger sidan
 * en tydlig avslutning där bergen möter footern.
 */
export const PageHorizon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-full h-32 md:h-40 pointer-events-none ${className ?? ""}`} aria-hidden>
    <MountainSilhouette className="absolute inset-0 w-full h-full" />
  </div>
);

export default PageHorizon;
