import React from "react";
import Separator from "../../components/separator";
import { competitions } from "../../data/competitions";

const TavlingarView: React.FC = () => {
  return (
    <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">
            Tävlingar
          </p>
          <h2 className="font-serif text-3xl">Tävla och utmana dig själv</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Från distansrekord till första topplandningen — det finns alltid något att jaga.
          </p>
        </div>
      </section>

      {/* Competition cards */}
      {competitions.map((comp, i) => (
        <React.Fragment key={comp.name}>
          {i > 0 && <Separator />}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <h3 data-payload-field="name" className="font-serif text-xl">{comp.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {comp.status}
                </span>
              </div>
              <p className="text-muted-foreground text-sm italic font-serif">
                {comp.subtitle}
              </p>
            </div>
            <p data-payload-field="description" className="text-muted-foreground text-sm leading-relaxed">
              {comp.description}
            </p>

            {/* Winners table */}
            {"winners" in comp && comp.winners && (
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-3 gap-2 md:gap-4 py-2 border-b border-border">
                  <p className="text-sm font-semibold">År</p>
                  <p className="text-sm font-semibold">Vinnare</p>
                  <p className="text-sm font-semibold">Resultat</p>
                </div>
                {comp.winners.map((winner) => (
                  <div
                    key={winner.year}
                    className="grid grid-cols-3 gap-4 py-3 border-b border-border"
                  >
                    <p className="text-sm">{winner.year}</p>
                    <p className="text-sm">{winner.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {winner.result}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TavlingarView;
