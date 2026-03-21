import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";
import { useCompetitions } from "@/hooks/useCMS";
import { richTextToPlain } from "../lib/payload";

export default function Tavlingar() {
  const [showRules, setShowRules] = useState<Record<string, boolean>>({});
  const { data: competitionsData, loading } = useCompetitions();

  const COMPETITIONS = (competitionsData || []).map(c => ({
    name: c.name,
    subtitle: c.subtitle || "",
    status: c.status,
    desc: richTextToPlain(c.description),
    rules: (c.rules || []).map(r => r.text),
    winners: (c.winners || []).map(w => ({ year: String(w.year), name: w.name, dist: w.result })),
    img: IMG.areHike,
  }));
  return (
    <>
      <PageHero img={IMG.jamtlandCamp} title="Tävlingar" subtitle="Klubbtävlingar med tradition — från distansflygning till topplandning." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        {loading && <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, padding: "20px 0" }}>Laddar...</p>}
        <Fade>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 8 }}>
            Larsa Open och Åre PPC körs som vanligt. Alla flyg loggas via{" "}
            <a href="https://flightlog.org" target="_blank" rel="noopener noreferrer" style={{ color: T.accent }}>
              Flightlog <ExternalLink size={11} style={{ display: "inline", verticalAlign: "middle" }} />
            </a>
          </p>
        </Fade>
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />

        {COMPETITIONS.map((comp, ci) => (
          <Fade key={comp.name} delay={ci * 0.08}>
            <div style={{ marginBottom: ci < COMPETITIONS.length - 1 ? 64 : 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 36 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <h2 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, color: T.ink, letterSpacing: "-.01em" }}>{comp.name}</h2>
                    <Badge variant="outline" style={{ fontFamily: T.sans, fontSize: 10.5, color: T.accent, borderColor: T.accent }}>{comp.status}</Badge>
                  </div>
                  <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.muted, marginBottom: 16 }}>{comp.subtitle}</p>
                  <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>{comp.desc}</p>

                  <button
                    onClick={() => setShowRules(prev => ({ ...prev, [comp.name]: !prev[comp.name] }))}
                    style={{
                      fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: T.ink2,
                      textTransform: "uppercase", letterSpacing: ".05em", marginBottom: showRules[comp.name] ? 10 : 20,
                      background: "none", border: `1px solid ${T.border}`, borderRadius: 6,
                      padding: "6px 14px", cursor: "pointer", transition: "all .2s",
                    }}
                  >
                    {showRules[comp.name] ? "Dölj regler" : "Visa regler"}
                  </button>
                  {showRules[comp.name] && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                      {comp.rules.map((r, i) => (
                        <li key={i} style={{
                          fontFamily: T.sans, fontSize: 13.5, color: T.ink3, lineHeight: 1.6,
                          padding: "5px 0 5px 16px", position: "relative",
                          borderBottom: `1px solid ${T.borderL}`,
                        }}>
                          <span style={{ position: "absolute", left: 0, color: T.accent, fontWeight: 600 }}>{i + 1}.</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}

                  {comp.winners && (
                    <>
                      <h4 style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: T.ink2, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Tidigare vinnare</h4>
                      <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, marginBottom: 8 }}>
                        {comp.winners.map((w, i) => (
                          <div key={w.year} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "8px 14px", background: i % 2 === 0 ? T.white : T.bg,
                            fontFamily: T.sans, fontSize: 13.5,
                          }}>
                            <span><strong style={{ color: T.ink }}>{w.year}</strong> — {w.name}</span>
                            <span style={{ color: T.muted }}>{w.dist}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div style={{ borderRadius: 12, overflow: "hidden", alignSelf: "start" }}>
                  <img src={comp.img} alt={comp.name} loading="lazy" style={{ width: "100%", height: 280, objectFit: "cover" }} />
                </div>
              </div>
              {ci < COMPETITIONS.length - 1 && <Separator style={{ background: T.border, margin: "48px 0 0" }} />}
            </div>
          </Fade>
        ))}
      </Wrap>
    </>
  );
}
