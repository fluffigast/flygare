import { useState } from "react";

import { T, IMG, Fade, Wrap,  PageHero } from "../shared";
import { useNews } from "@/hooks/useCMS";
import { richTextToPlain, PAYLOAD_URL } from "../lib/payload";

const NEWS_CATS = ["Alla", "Aktiviteter", "Information", "Tävlingar"];

export default function Nyheter() {
  const [cat, setCat] = useState("Alla");
  const { data: newsData, loading } = useNews();

  const NEWS = (newsData || []).map(n => ({
    title: n.title,
    cat: n.category,
    date: n.date ? new Date(n.date).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" }) : "",
    img: n.image?.url ? `${PAYLOAD_URL}${n.image.url}` : IMG.areSky,
    desc: richTextToPlain(n.description),
  }));

  const filtered = cat === "Alla" ? NEWS : NEWS.filter(n => n.cat === cat);

  return (
    <>
      <PageHero img={IMG.areSky} title="Nyheter" subtitle="Senaste nytt från Åre Skärm- och Drakflygklubb." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        {loading && <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, padding: "20px 0" }}>Laddar...</p>}
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
