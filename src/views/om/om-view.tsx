import React from "react";
import { boardMembers as localBoard, milestones as localMilestones, clubHistory as localHistory } from "../../data/about";
import { useBoardMembers, useMilestones, useClubInfo, useGlobalLivePreview } from "../../hooks/useCMS";

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
    <div className="w-full">
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
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
          <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
            {boardMembers.map((member: any) => (
              <div key={member.name} className="flex flex-col gap-1">
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{member.name}</p>
                <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-8" style={{ color: "var(--ink-2, #0f172b)" }}>
            Historia
          </h2>
          <div className="flex flex-col gap-6">
            {milestones.map((milestone: any) => (
              <div key={milestone.year} className="flex gap-6 items-baseline">
                <p className="font-serif text-2xl shrink-0 w-16" style={{ color: "var(--ink-2, #0f172b)" }}>{milestone.year}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>{milestone.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OmView;
