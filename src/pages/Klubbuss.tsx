import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

const RULES = [
  "Man måste vara fullvärdig klubbmedlem för att åka med.",
  "Max fyra passagerare plus en förare.",
  "Passagerare betalar 20 kr per tur (Swish till föraren under resan).",
  "Ungdomar under 18 åker gratis (kräver minst tre betalande passagerare).",
  "Föraren hanterar sin egen ersättning.",
  "Max 40 km/h på Skistars vägar (smala, inga räcken).",
  "Ingen körning uppför berget när Skistars liftar körs för cykling.",
  "Tanka på OK/Q8 i Åre — klubbkortet finns i bilens kassakista.",
  "Föraren kontrollerar olja och vatten vid varje tankning.",
  "Dagsutflykter max 20 mil — längre resor kräver styrelsebeslut.",
  "Fyll i körjournalen. Lås Skistars väggrind efter nedfart.",
];

export default function Klubbuss() {
  return (
    <>
      <PageHero img={IMG.areWinter} title="Klubbussen" subtitle="Gemensam transport upp på berget för alla medlemmar." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 8 }}>
              Klubben har en buss som kör medlemmar upp till startplatserna. Alla kostnader täcks av klubben —
              passagerare betalar en symbolisk avgift per tur.
            </p>
          </Fade>
          <Separator style={{ background: T.border, margin: "32px 0" }} />

          <Fade delay={0.1}>
            <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Regler och info</h3>
            <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
              {RULES.map((r, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "baseline",
                  padding: "12px 18px", background: i % 2 === 0 ? T.white : T.bg,
                  fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.5,
                }}>
                  <span style={{ color: T.accent, fontWeight: 600, flexShrink: 0 }}>{i + 1}.</span>
                  {r}
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </Wrap>
    </>
  );
}
