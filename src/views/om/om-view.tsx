import React from "react";
import Separator from "../../components/separator";
import { boardMembers, milestones } from "../../data/about";

const OmView: React.FC = () => {
  return (
    <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">
            Om oss
          </p>
          <h2 className="font-serif text-3xl">
            Åre Skärm- och Drakflygklubb
          </h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Sedan 1975 har vi flugit från Åreskutan. Från en handfull drakflygare till
          idag ~100 aktiva skärm- och drakflygare. Distansrekordet? 230 km — Åre till Sollefteå.
        </p>
      </section>

      <Separator />

      {/* Board members */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Styrelse</h3>
        <div className="grid grid-cols-2 gap-6 @sm:grid-cols-3">
          {boardMembers.map((member) => (
            <div key={member.name} className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Historia</h3>
        <div className="flex flex-col gap-6">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="flex gap-6 items-baseline">
              <p className="font-serif text-2xl text-foreground shrink-0 w-16">
                {milestone.year}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {milestone.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OmView;
