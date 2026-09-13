import React from "react";
import { useBoardMembers } from "../../hooks/useCMS";
import { boardMembers as localBoard } from "../../data/about";
import InitialsAvatar from "../../components/initials-avatar";
import SEO from "../../components/seo";

const StyrelsenView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);

  return (
    <div className="w-full">
      <SEO
        title="Styrelsen"
        path="/om/styrelsen"
        description="Åre Skärm- och Drakflygklubbs styrelse — ordförande, kassör, sekreterare, säkerhetsansvarig och övriga ledamöter."
      />
      <section className="max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Om klubben</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Styrelsen
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-3">
          {boardMembers.map((member: any) => {
            const imageUrl = member.image?.url ?? member.image?.sizes?.thumbnail?.url;
            return (
              <div key={member.name} className="flex flex-col items-center text-center gap-3">
                <InitialsAvatar
                  name={member.name}
                  imageUrl={imageUrl}
                  size={88}
                  className="shrink-0"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }} data-payload-field="name">
                    {member.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--slate, #62748e)" }} data-payload-field="role">
                    {member.role}
                  </p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs underline mt-1 hover:opacity-70"
                      style={{ color: "var(--hero-accent, #3774a3)" }}
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StyrelsenView;
