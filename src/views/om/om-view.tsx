import React from "react";
import { boardMembers as localBoard, milestones as localMilestones } from "../../data/about";
import { useBoardMembers, useMilestones } from "../../hooks/useCMS";

const OmView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);
  const { data: milestones } = useMilestones(localMilestones);

  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Om oss</p>
        <h1 className="display mt-[-4px]">Åre Skärm- och Drakflygklubb</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          Sedan 1975 har vi flugit från Åreskutan. Från en handfull drakflygare till
          idag ~100 aktiva skärm- och drakflygare. Distansrekordet? 230 km — Åre till Sollefteå.
        </p>
      </section>

      <div className="site-container mt-20 flex flex-col gap-16">
        <div className="pt-0">
          <h3 className="h-section mb-8">Styrelse</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {boardMembers.map((member: any) => (
              <div key={member.name} className="flex flex-col gap-1">
                <p className="text-base font-semibold text-ink">{member.name}</p>
                <p className="text-base text-slate">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-0">
          <h3 className="h-section mb-8">Historia</h3>
          <div className="flex flex-col gap-6">
            {milestones.map((milestone: any) => (
              <div key={milestone.year} className="flex gap-6 items-baseline">
                <p className="font-serif text-2xl text-ink shrink-0 w-16">{milestone.year}</p>
                <p className="text-base text-slate leading-relaxed">{milestone.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OmView;
