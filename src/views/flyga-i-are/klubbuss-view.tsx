import React from "react";
import { useBusRules, useGlobalLivePreview } from "../../hooks/useCMS";
import { busRules as localBusRules } from "../../data/bus-rules";

const KlubbussView: React.FC = () => {
  const { data: cmsBusRules } = useBusRules(localBusRules);
  const liveBusRules = useGlobalLivePreview(cmsBusRules);
  const busRules = liveBusRules.rules?.length ? liveBusRules : localBusRules;

  return (
    <div className="w-full">
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Flyga i Åre</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Klubbuss & räddningsbåt
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {busRules.intro && (
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--slate, #62748e)" }}>
            {typeof busRules.intro === "string"
              ? busRules.intro
              : busRules.intro?.root?.children?.map((b: any) => b.children?.map((c: any) => c.text ?? "").join("")).join("\n") ?? ""}
          </p>
        )}
        <ul className="flex flex-col gap-4">
          {busRules.rules.map((rule: any, i: number) => (
            <li
              key={i}
              className="flex gap-3 items-baseline text-base leading-relaxed"
              style={{ color: "var(--slate-3, #45556c)" }}
            >
              <span className="shrink-0 w-3 h-px mt-3" style={{ background: "var(--slate-2, #90a1b9)" }} />
              {rule.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KlubbussView;
