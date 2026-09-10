import React from "react";
import TopoLines from "./topo-lines";
import MountainSilhouette from "./mountain-silhouette";
import CompassRoseWatermark from "./compass-rose-watermark";

/**
 * PageBackdrop — full-viewport-fixed dekorationslager.
 *
 * Renders once per layout. Ligger `position: fixed inset-0 -z-10`
 * så den täcker hela viewporten och följer med scrollen (istället för
 * att sitta i topp av varje sektion och skarvas).
 *
 * Fyra lager (bakgrund → förgrund):
 *   1. Papper-gradient (mycket ljus vertikal)
 *   2. Topografiska höjdkurvor centrerade
 *   3. Sakta-roterande kompassros upp till höger
 *   4. Bergssilhuett längst ner (sitter över dagen på "horisonten")
 *
 * Alla lager mycket subtila (opacity 0.03–0.06) — knappt märkbara men
 * ger djup över hela skärmen.
 */
export const PageBackdrop: React.FC<{ showCompass?: boolean }> = ({
  showCompass = true,
}) => (
  <div
    className="fixed inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: -10 }}
    aria-hidden
  >
    {/* Lager 1: Vertikal papper-gradient (top: paper, bottom: subtile blue-tint) */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fafbfc 60%, #f5f7fa 100%)",
      }}
    />

    {/* Lager 2: Topo-kurvor centrerade, täcker hela viewporten */}
    <TopoLines
      className="absolute inset-0 w-full h-full"
      opacity={0.035}
    />

    {/* Lager 3: Kompassros upp till höger (utanför content-området) */}
    {showCompass && (
      <CompassRoseWatermark
        className="absolute right-[-140px] top-[-80px] w-[560px] h-[560px] hidden md:block"
        opacity={0.045}
      />
    )}

    {/* Lager 4: Bergssilhuett nere — sitter längst ner så den blir en
        subtil horisont bakom footern. */}
    <MountainSilhouette
      className="absolute left-0 right-0 bottom-0 w-full h-64 md:h-80"
    />
  </div>
);

export default PageBackdrop;
