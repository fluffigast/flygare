import React from "react";
import Separator from "../../components/separator";
import { useBusRules, useGlobalLivePreview } from "../../hooks/useCMS";

const localBusRules = {
  rules: [
    { text: 'Fullvärdigt medlemskap krävs' },
    { text: 'Max 4 passagerare + 1 förare' },
    { text: 'Passageraravgift: 20 kr per tur (Swish till föraren)' },
    { text: 'Ungdomar under 18: gratis (kräver 3+ betalande passagerare)' },
    { text: 'Max 40 km/h på Skistarvägar' },
    { text: 'Tanka vid OK/Q8 Åre (klubbkort i kassan)' },
    { text: 'Dagsutflykter max 20 mil (längre kräver styrelsebeslut)' },
  ],
};

const KlubbussView: React.FC = () => {
  const { data: cmsBusRules } = useBusRules(localBusRules);
  const liveBusRules = useGlobalLivePreview(cmsBusRules);
  const busRules = liveBusRules.rules?.length ? liveBusRules : localBusRules;

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Flyga i Åre</p>
          <h2 className="font-serif text-3xl">Klubbuss & räddningsbåt</h2>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3">
          {busRules.rules.map((rule: any, i: number) => (
            <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-3 items-baseline">
              <span className="text-foreground shrink-0">&bull;</span>
              {rule.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default KlubbussView;
