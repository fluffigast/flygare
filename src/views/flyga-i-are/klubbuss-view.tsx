import React from "react";
import Separator from "../../components/separator";
import { useBusRules, useGlobalLivePreview } from "../../hooks/useCMS";
import { busRules as localBusRules } from "../../data/bus-rules";

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
