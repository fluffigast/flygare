import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

const RADIO = [
  { label: "Lyssning", value: "146.7625 MHz" },
  { label: "Sändning", value: "150.7625 MHz (repeter)" },
  { label: "Öppningston", value: "67.0 Hz" },
  { label: "Kanaldelning", value: "25 kHz" },
];

const EMERGENCY = [
  { label: "112 — Nödsituation", desc: "Akuta situationer, nödavstängning av kraftledningar" },
  { label: "1177 — Sjukvårdsrådgivning", desc: "Icke-akut medicinsk rådgivning" },
  { label: "Frösötornet Flygledning", desc: "+46 8 511 886 17 — för TMA-passage öster om Järpen" },
  { label: "Trafikverket Driftcentral Ånge", desc: "+46 690 523 20 — järnvägsdrift" },
];

export default function Kontakt() {
  return (
    <>
      <PageHero img={IMG.arePier} title="Kontakt" subtitle="Nå oss via e-post, radio eller sociala medier." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Fade>
            <div>
              <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.ink, marginBottom: 16 }}>E-post</h2>
              <a href="mailto:info@flygare.nu" style={{
                fontFamily: T.sans, fontSize: 18, color: T.accent, textDecoration: "none",
                display: "inline-block", marginBottom: 32,
              }}>info@flygare.nu</a>

              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink, marginBottom: 14 }}>Sociala medier</h3>
              <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, marginBottom: 32 }}>
                <a href="https://www.facebook.com/groups/48461420739/" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 18px", background: T.white, fontFamily: T.sans, fontSize: 14,
                  color: T.ink2, textDecoration: "none",
                }}>
                  Facebook-grupp <ExternalLink size={12} style={{ color: T.accent }} />
                </a>
                <a href="https://www.youtube.com/channel/UCQeXyEgUI2Z1y4fl1iiXIlQ" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 18px", background: T.bg, fontFamily: T.sans, fontSize: 14,
                  color: T.ink2, textDecoration: "none",
                }}>
                  YouTube <ExternalLink size={12} style={{ color: T.accent }} />
                </a>
              </div>

              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink, marginBottom: 14 }}>Radio (VHF 2m FM)</h3>
              <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
                {RADIO.map((r, i) => (
                  <div key={r.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 18px", background: i % 2 === 0 ? T.white : T.bg, fontFamily: T.sans, fontSize: 14,
                  }}>
                    <span style={{ color: T.muted }}>{r.label}</span>
                    <span style={{ fontWeight: 500, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.12}>
            <div>
              <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Nödnummer & operativt</h2>
              <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
                {EMERGENCY.map(e => (
                  <div key={e.label} style={{
                    padding: "14px 18px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.white,
                  }}>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.ink, marginBottom: 2 }}>{e.label}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{e.desc}</div>
                  </div>
                ))}
              </div>

            </div>
          </Fade>
        </div>

        <Separator style={{ background: T.border, margin: "48px 0 40px" }} />

        <Fade delay={0.2}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.ink, marginBottom: 16 }}>XC-flyg & kontrollerat luftrum</h2>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.7, marginBottom: 12 }}>
              Klubben har avtal med ATS Östersund för skärmflyg i kontrollerat luftrum (ESNZ TMA, sektorer Tore 4 och Tore 5, FL 95).
            </p>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.7, marginBottom: 12 }}>
              <strong>Dagen innan:</strong> maila ATS ESNZ (<a href="mailto:ats.ostersund@lfv.se" style={{ color: T.accent }}>ats.ostersund@lfv.se</a>) med
              sektor, höjd, in-/utpasseringstider, rutt, radiofrekvens och telefonnummer.
            </p>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.7, marginBottom: 12 }}>
              <strong>Flygdagen:</strong> ring tornet på +46 8 511 886 17 före start. Klarering kan nekas vid planerad IFR-trafik.
            </p>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3, lineHeight: 1.7 }}>
              <strong>Efter flygning:</strong> meddela ATS per telefon att du lämnat luftrummet.
              Kontrollera publicerade drifttider på <a href="https://aro.lfv.se/" target="_blank" rel="noopener noreferrer" style={{ color: T.accent }}>aro.lfv.se</a>.
            </p>
          </div>
        </Fade>
      </Wrap>
    </>
  );
}
