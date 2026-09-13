import React from "react";
import { boardMembers as localBoard, milestones as localMilestones, clubHistory as localHistory, currentRecords } from "../../data/about";
import { useBoardMembers, useMilestones, useClubInfo, useGlobalLivePreview } from "../../hooks/useCMS";
import InitialsAvatar from "../../components/initials-avatar";
import SEO from "../../components/seo";

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
  const historyText = richTextToString(clubInfo.history) || localHistory;

  return (
    <div className="w-full relative">
      <SEO
        title="Om klubben"
        path="/om"
        description="Åre Skärm- och Drakflygklubb — historia sedan 1976, styrelse, rekord genom tiderna och klubbprodukter."
      />
      <section className="relative max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Om oss</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Åre Skärm- och Drakflygklubb
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14">
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
                  imageUrl={member.image?.url ?? member.image?.sizes?.thumbnail?.url}
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
          <div className="flex flex-col gap-6">
            {milestones.map((milestone: any, i: number) => (
              <div key={milestone.id ?? `${milestone.year}-${i}`} className="flex gap-6 items-baseline">
                <p className="font-serif text-2xl shrink-0 w-16" style={{ color: "var(--ink-2, #0f172b)" }}>{milestone.year}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>{milestone.text}</p>
              </div>
            ))}
          </div>
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
                    <p className="font-serif font-bold text-2xl mt-1" style={{ color: "var(--ink-2, #0f172b)" }}>
                      {r.value}
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
            <p className="text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>
              {richTextToString(clubInfo.stadgar)}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default OmView;
