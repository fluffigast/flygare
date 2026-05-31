import React from "react";
import { useBoardMembers } from "../../hooks/useCMS";
import { boardMembers as localBoard } from "../../data/about";

const StyrelsenView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);

  return (
    <div className="w-full">
      <section className="px-4 sm:px-8 md:px-16 lg:px-[110px] pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Om klubben</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Styrelsen
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
          {boardMembers.map((member: any) => (
            <div key={member.name} className="flex flex-col gap-1">
              <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{member.name}</p>
              <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyrelsenView;
