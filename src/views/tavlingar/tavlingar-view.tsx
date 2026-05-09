import React from "react";
import { competitions } from "../../data/competitions";

const TavlingarView: React.FC = () => {
  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Tävlingar</p>
        <h1 className="display mt-[-4px]">Tävla och utmana dig själv</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          Från distansrekord till första topplandningen — det finns alltid något att jaga.
        </p>
      </section>

      <div className="site-container mt-20 flex flex-col gap-16">
        {competitions.map((comp) => (
          <div key={comp.name} className="border-t border-hairline pt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <h3 className="h-section">{comp.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-paper text-ink">{comp.status}</span>
              </div>
              <p className="font-serif italic text-sm text-slate">{comp.subtitle}</p>
            </div>
            <p className="text-sm text-slate leading-relaxed">{comp.description}</p>

            {"winners" in comp && comp.winners && (
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-4 py-2 border-b border-hairline">
                  <p className="text-sm font-semibold text-ink">År</p>
                  <p className="text-sm font-semibold text-ink">Vinnare</p>
                  <p className="text-sm font-semibold text-ink">Resultat</p>
                </div>
                {comp.winners.map((winner) => (
                  <div key={winner.year} className="grid grid-cols-3 gap-4 py-3 border-b border-hairline">
                    <p className="text-sm text-ink">{winner.year}</p>
                    <p className="text-sm text-ink">{winner.name}</p>
                    <p className="text-sm text-slate">{winner.result}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default TavlingarView;
