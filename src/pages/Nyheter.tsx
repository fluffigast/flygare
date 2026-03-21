import { useState } from "react";

import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

const NEWS_CATS = ["Alla", "Aktiviteter", "Information", "Tävlingar"];

const NEWS = [
  {
    title: "Välkommen till PPC Åre 2026",
    cat: "Tävlingar",
    date: "20 Mars, 2026",
    img: IMG.skyGlide,
    desc: "PoängPlockarCupen och XC Lindholm är igång. Bygg din egen rutt, samla poäng och utveckla ditt flygande. Gratis att delta — logga flyg på flightlog.org.",
  },
  {
    title: "Klubbuss Kampanj",
    cat: "Aktiviteter",
    date: "16 Mars, 2026",
    img: IMG.launchPrep,
    desc: "Klubben ska köpa ny buss. Max 180 000 kr, 4WD, minst 7 platser. Skicka förslag till info@flygare.nu. Stöd via Swish 123 083 11 98 märkt \"NY BUSS\".",
  },
  {
    title: "Ny webbshop",
    cat: "Information",
    date: "23 Januari, 2026",
    img: IMG.snowRange,
    desc: "Klubben har öppnat en ny webbshop med merchandise. Besök asdfkstore.myspreadshop.se.",
  },
  {
    title: "Ansök om tävlingsstipendium",
    cat: "Aktiviteter",
    date: "20 Januari, 2026",
    img: IMG.rockyGlide,
    desc: "Klubben erbjuder tävlingsstipendium. Ansök via formuläret på klubbens hemsida.",
  },
  {
    title: "Kallelse till Årsmöte 2026",
    cat: "Information",
    date: "12 Januari, 2026",
    img: IMG.arePier,
    desc: "Årsmötet 2026 närmar sig. Verksamhetsplan, ekonomiska rapporter och andra handlingar finns under dokument på hemsidan.",
  },
  {
    title: "Viktig info till alla flygare",
    cat: "Information",
    date: "17 Juli, 2025",
    img: IMG.soaringSunset,
    desc: "Styrelsen har tecknat avtal med Skistar. Alla piloter i Åre måste läsa och följa reglerna. Företräde i liftkö gäller enbart kommersiella aktörer. Varsam körning till Hummeln.",
  },
  {
    title: "Vinnare av topplandningstävlingen",
    cat: "Tävlingar",
    date: "12 April, 2025",
    img: IMG.areMullfjallet,
    desc: "Fredrik Lindholm vann Pilot 2-tävlingen 21 mars. Start från 1000m, termik vid Tegetornet, topplandning på Åreskutan efter 3,5 timmars flygning.",
  },
  {
    title: "1000m projektet avslutat",
    cat: "Aktiviteter",
    date: "12 April, 2025",
    img: IMG.areSky,
    desc: "Projektet är klart — godkännande från Jordbruksverket och finansiering på plats. Skylt ska monteras i början av sommaren. Tack till alla som bidragit.",
  },
];

export default function Nyheter() {
  const [cat, setCat] = useState("Alla");
  const filtered = cat === "Alla" ? NEWS : NEWS.filter(n => n.cat === cat);

  return (
    <>
      <PageHero img={IMG.areSky} title="Nyheter" subtitle="Senaste nytt från Åre Skärm- och Drakflygklubb." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        {/* FILTER */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 40 }}>
          {NEWS_CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              fontFamily: T.sans, fontSize: 13.5, fontWeight: cat === c ? 600 : 400,
              color: cat === c ? T.ink : T.muted, background: "none", border: "none", cursor: "pointer",
              padding: "6px 16px", borderRadius: 4,
              borderBottom: cat === c ? `2px solid ${T.ink}` : "2px solid transparent",
              transition: "all .2s",
            }}>{c}</button>
          ))}
        </div>

        {/* CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
          {filtered.map((n, i) => (
            <Fade key={n.title + n.date} delay={i * 0.06}>
              <div style={{
                background: T.white, borderRadius: 12, overflow: "hidden",
                border: `1px solid ${T.border}`,
              }}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img src={n.img} alt={n.title} loading="lazy" style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform .5s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{
                      fontFamily: T.serif, fontStyle: "italic", fontSize: 12, color: T.accent,
                    }}>{n.cat}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>{n.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink,
                    letterSpacing: "-.01em", lineHeight: 1.3, marginBottom: 8,
                  }}>{n.title}</h3>
                  <p style={{
                    fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.6,
                  }}>{n.desc}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Wrap>
    </>
  );
}
