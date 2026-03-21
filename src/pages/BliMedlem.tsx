import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";
import { useMembershipInfo } from "@/hooks/useCMS";

const INCLUDED_FALLBACK = [
  "Tillgång till alla startplatser på Åreskutan",
  "Tillgång till landningsplatsen Draklanda",
  "Räddningsbåt vid Draklanda",
  "Åka med klubbussen upp på berget",
  "Rösträtt på årsmöte",
  "Delta i klubbtävlingar som Åre PPC",
  "Hjälp med licensförnyelse",
  "Vinterpreparerade startplatser",
  "Sommarklippning av Draklanda",
];

const LICENSE_REQS_FALLBACK = [
  { level: "Elevlicens", req: "Minst 10 flygningar" },
  { level: "Pilot 1", req: "Minst 10 flygningar" },
  { level: "Pilot 2", req: "Minst 10 höjdflyg + 5 timmar flygtid" },
];

export default function BliMedlem() {
  const { data: membership, loading } = useMembershipInfo();

  const INCLUDED = membership?.benefits?.length
    ? membership.benefits.map(b => b.text)
    : INCLUDED_FALLBACK;

  const LICENSE_REQS = membership?.licenseRequirements?.length
    ? membership.licenseRequirements.map(l => ({ level: l.level, req: l.requirements }))
    : LICENSE_REQS_FALLBACK;

  const price = membership?.price || "600 kr / år";
  const validity = membership?.validity || "Giltigt t.o.m. 31 december 2026";
  const shopUrl = membership?.shopUrl || "https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/";
  return (
    <>
      <PageHero img={IMG.skyGlide} title="Bli medlem" subtitle="Gå med i Åre Skärm- och Drakflygklubb — 600 kr/år." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        {loading && <p style={{ fontFamily: T.sans, fontSize: 15, color: T.muted, padding: "20px 0" }}>Laddar...</p>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Fade>
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 600, color: T.accent, marginBottom: 4 }}>{price}</p>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, marginBottom: 24 }}>{validity}</p>

              <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                <Button style={{
                  fontFamily: T.sans, fontWeight: 500, fontSize: 14, height: 44, padding: "0 28px",
                  borderRadius: 6, background: T.accent, color: "#fff", marginBottom: 32,
                }}>
                  Bli medlem via SSFF webshop <ExternalLink size={14} style={{ marginLeft: 8 }} />
                </Button>
              </a>

              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink, marginBottom: 14 }}>Medlemskapet inkluderar</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {INCLUDED.map(item => (
                  <li key={item} style={{
                    fontFamily: T.sans, fontSize: 14.5, color: T.ink3, lineHeight: 1.6,
                    padding: "6px 0", borderBottom: `1px solid ${T.borderL}`,
                    paddingLeft: 16, position: "relative",
                  }}>
                    <span style={{ position: "absolute", left: 0, color: T.accent }}>-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>

          <Fade delay={0.12}>
            <div>
              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink, marginBottom: 14 }}>Licensförnyelse</h3>
              <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.ink3, lineHeight: 1.7, marginBottom: 20 }}>
                För att förnya din licens behöver du uppfylla minimikrav på flygtid.
                Uppfyller du inte kraven kan du förnya på en lägre nivå, med möjlighet att uppgradera
                om kraven uppnås senast 30 juni.
              </p>
              <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
                {LICENSE_REQS.map((l, i) => (
                  <div key={l.level} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 18px", background: i % 2 === 0 ? T.white : T.bg, fontFamily: T.sans, fontSize: 14,
                  }}>
                    <span style={{ fontWeight: 500, color: T.ink }}>{l.level}</span>
                    <span style={{ color: T.muted, fontSize: 13 }}>{l.req}</span>
                  </div>
                ))}
              </div>

              <Separator style={{ background: T.border, margin: "32px 0" }} />

              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.ink, marginBottom: 14 }}>Kontakt</h3>
              <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.ink3, lineHeight: 1.7 }}>
                Har du frågor om medlemskap eller licensförnyelse?
                Kontakta oss på <a href="mailto:info@flygare.nu" style={{ color: T.accent }}>info@flygare.nu</a>
              </p>
            </div>
          </Fade>
        </div>
      </Wrap>
    </>
  );
}
