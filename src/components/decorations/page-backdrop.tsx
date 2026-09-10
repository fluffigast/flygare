import React from "react";
import TopoLines from "./topo-lines";
import CompassRoseWatermark from "./compass-rose-watermark";

/**
 * PageBackdrop — full-viewport-fixed dekorationslager.
 *
 * OBS: Berg-silhuetten flyttad till <PageHorizon /> som placeras
 * i layoutens bottnen ovanpå footern — annars syns bergen mitt på
 * sidan genom transparent innehåll (position:fixed).
 *
 * Tre subtila lager (bakgrund → förgrund):
 *   1. Papper-gradient (vertikal ljusgradient)
 *   2. Topografiska höjdkurvor (kart-blad-textur, ambient)
 *   3. Kompassros upp till höger (utanför content-area, sakta roterande)
 */
export const PageBackdrop: React.FC<{ showCompass?: boolean }> = ({
  showCompass = true,
}) => (
  <div
    className="fixed inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: -10 }}
    aria-hidden
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fafbfc 60%, #f5f7fa 100%)",
      }}
    />

    <TopoLines
      className="absolute inset-0 w-full h-full"
      opacity={0.035}
    />

    {showCompass && (
      <CompassRoseWatermark
        className="absolute right-[-140px] top-[-80px] w-[560px] h-[560px] hidden md:block"
        opacity={0.045}
      />
    )}
  </div>
);

export default PageBackdrop;
