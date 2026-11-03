import React from "react";
import { boardMembers as localBoard, milestones as localMilestones, clubHistory as localHistory, currentRecords } from "../../data/about";
import { useBoardMembers, useMilestones, useClubInfo, useDocuments, useGlobalLivePreview } from "../../hooks/useCMS";
import { cmsMediaUrl } from "../../lib/cms";
import InitialsAvatar from "../../components/initials-avatar";
import SEO from "../../components/seo";
import SubnavGrid from "../../components/subnav-grid";
import PageHero from "../../components/page-hero";
import CountUp from "../../components/count-up";

/** Extract plain text from Lexical richText or return string as-is */
function richTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (value?.root?.children) {
    return value.root.children
      .map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      )
      .join("\n\n");
  }
  return "";
}

const OmView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);
  const { data: milestones } = useMilestones(localMilestones);
  const { data: cmsClubInfo } = useClubInfo({ history: localHistory });
  const clubInfo = useGlobalLivePreview(cmsClubInfo);
  const { data: documents } = useDocuments([]);
  const stadgarDoc = documents.find(
    (d: any) => d.category === "stadgar" && d.file?.url,
  );
  const historyText = richTextToString(clubInfo.history) || localHistory;

  return (
    <div className="w-full relative">
      <SEO
        title="Om klubben"
        path="/om"
        description="Åre Skärm- och Drakflygklubb — historia sedan 1976, styrelse, rekord genom tiderna och klubbprodukter."
      />
      <PageHero
        eyebrow="Om oss"
        title="Åre Skärm- och Drakflygklubb"
      />

      <SubnavGrid sectionPath="/om" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-6">
        <p className="text-base leading-relaxed mb-16" style={{ color: "var(--slate, #62748e)" }}>
          {historyText}
        </p>

        <section className="mb-16" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
            Styrelse
          </h2>
          <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-3">
            {boardMembers.map((member: any) => (
              <div key={member.name} className="flex flex-col items-center text-center gap-3">
                <InitialsAvatar
                  name={member.name}
                  imageUrl={cmsMediaUrl(member.image?.url ?? member.image?.sizes?.thumbnail?.url)}
                  size={72}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{member.name}</p>
                  <p className="text-xs" style={{ color: "var(--slate, #62748e)" }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
            Historia
          </h2>
          <ol
            className="relative flex flex-col gap-10 pl-6 md:pl-8"
            style={{
              borderLeft: "2px solid var(--border, #e2e8f0)",
            }}
          >
            {milestones.map((milestone: any, i: number) => (
              <li
                key={milestone.id ?? `${milestone.year}-${i}`}
                className="relative flex flex-col gap-2"
              >
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    background: "var(--accent, #3774a3)",
                    left: "calc(-1.5rem - 7px)",
                    top: "0.4rem",
                    boxShadow: "0 0 0 4px #fff",
                  }}
                  aria-hidden="true"
                />
                <p
                  className="font-serif font-bold text-2xl md:text-3xl tabular-nums leading-none"
                  style={{ color: "var(--ink-2, #0f172b)" }}
                >
                  {milestone.year}
                </p>
                <p className="text-base leading-relaxed max-w-prose" style={{ color: "var(--slate-3, #45556c)" }}>
                  {milestone.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Dagens rekord — pptx: "Historia & nutid → Rekord genom tiderna,
             Dagens rekord". Fallback till lokala currentRecords om CMS
             inte har records. */}
        {(clubInfo.records?.length > 0 || currentRecords.length > 0) && (
          <section className="mt-16" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
            <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
              Dagens rekord
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(clubInfo.records?.length ? clubInfo.records : currentRecords).map((r: any, i: number) => (
                <div key={i} className="flex items-baseline justify-between gap-4 p-4" style={{ border: "1px solid var(--border, #e2e8f0)" }}>
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--slate, #62748e)" }}>
                      {r.discipline ?? r.title}
                    </p>
                    <p className="font-serif font-bold text-2xl md:text-3xl mt-1 tabular-nums" style={{ color: "var(--ink-2, #0f172b)" }}>
                      <CountUp value={r.value} />
                    </p>
                    {r.holder && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--slate-3, #45556c)" }}>
                        {r.holder}
                      </p>
                    )}
                  </div>
                  {r.year && (
                    <p className="font-serif italic text-sm tabular-nums" style={{ color: "var(--hero-accent, #3774a3)" }}>
                      {r.year}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Club products */}
        {(clubInfo.clubProducts || clubInfo.shopUrl) && (
          <section className="mt-16" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
            <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
              Klubbprodukter
            </h2>
            {clubInfo.clubProducts && (
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--slate, #62748e)" }}>
                {richTextToString(clubInfo.clubProducts)}
              </p>
            )}
            {clubInfo.shopUrl && (
              <a
                href={clubInfo.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--ink, #020618)" }}
              >
                Besök webbshopen
              </a>
            )}
          </section>
        )}

        {/* Stadgar */}
        {clubInfo.stadgar && (
          <section className="mt-16" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
            <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
              Stadgar
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--slate, #62748e)" }}>
              {richTextToString(clubInfo.stadgar)}
            </p>
            {stadgarDoc?.file?.url && (
              <a
                href={cmsMediaUrl(stadgarDoc.file.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--ink, #020618)" }}
              >
                Ladda ner stadgarna (PDF)
              </a>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default OmView;
