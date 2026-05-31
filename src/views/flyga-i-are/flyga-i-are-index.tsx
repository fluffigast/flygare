import React from "react";
import { Link } from "react-router";
import Separator from "../../components/separator";

const sections = [
  { label: "Starter & landningar", path: "/flyga-i-are/startplatser", desc: "Beskrivning av startplatser i Åre med omnejd" },
  { label: "Väder", path: "/flyga-i-are/vader", desc: "Lokala väderförhållanden och vädertjänster" },
  { label: "Flygregler", path: "/flyga-i-are/flygregler", desc: "Sammanfattning av flygregler och Skistar-avtal" },
  { label: "Säkerhet & nödsituation", path: "/flyga-i-are/sakerhet", desc: "Rutiner vid nödsituation, säkerhet och ansvar" },
  { label: "Cross country & luftrum", path: "/flyga-i-are/xc", desc: "XC-flygning, luftrumskartor, rutiner" },
  { label: "Acro", path: "/flyga-i-are/acro", desc: "Acroflygning, räddningsbåt, acrobox" },
  { label: "Speedrider", path: "/flyga-i-are/speedrider", desc: "Speedriding i Åre" },
  { label: "Hängflyg", path: "/flyga-i-are/hangflyg", desc: "Hängflygning från Skutan" },
  { label: "Paramotor", path: "/flyga-i-are/paramotor", desc: "Paramotorflygning i Åre" },
  { label: "Klubbuss & räddningsbåt", path: "/flyga-i-are/klubbuss", desc: "Regler och avgifter" },
];

const FlyingGuideIndex: React.FC = () => {
  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Flygguiden</p>
          <h2 className="font-serif text-3xl">Flyga i Åre</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Allt du behöver veta för att flyga säkert i Årefjällen.
        </p>
      </section>
      <Separator />
      <div className="flex flex-col gap-4">
        {sections.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-muted-foreground text-xs">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlyingGuideIndex;
