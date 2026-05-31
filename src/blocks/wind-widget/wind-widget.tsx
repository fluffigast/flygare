import React from "react";
import { Link } from "react-router";

const WindWidget: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Väder</p>
          <h2 className="font-serif text-2xl md:text-3xl">Aktuellt väder</h2>
        </div>
        <Link
          to="/flyga-i-are/vader"
          className="text-sm text-primary hover:underline"
        >
          Alla vädertjänster →
        </Link>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <iframe
          src="https://meac.se/sub_2/hummeln/wind.asp"
          title="MEAC Hummeln vinddata"
          className="w-full border-0"
          style={{ height: "350px" }}
          loading="lazy"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Vinddata från MEAC mätstation på Hummeln, Åre
      </p>
    </section>
  );
};

export default WindWidget;
