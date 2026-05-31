import React from "react";
import { useBoardMembers } from "../../hooks/useCMS";
import { boardMembers as localBoard } from "../../data/about";

const StyrelsenView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Om klubben</p>
          <h2 className="font-serif text-3xl">Styrelsen</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
          {boardMembers.map((member: any) => (
            <div key={member.name} className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StyrelsenView;
