import React from "react";
import SitesGrid from "../../blocks/sites-grid/sites-grid";
import SitesMap from "../../blocks/sites-map/sites-map";
import Separator from "../../components/separator";
import { sites } from "../../data/sites";

export interface SitesViewProps {}

const SitesView: React.FC<SitesViewProps> = ({}) => {
  return (
    <>
      <SitesMap sites={sites} />
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <section className="flex flex-col gap-6">
          <div>
            <p className="font-serif italic text-muted-foreground text-sm">Startplatser</p>
            <h2 className="font-serif text-3xl">Åreskutans start- och landningsområden</h2>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Alla väderstreck är orienterade som om Kabinbanan ligger i rak nord-sydlig riktning.
              Draklanda är den officiella landningsplatsen — alla andra landningar betraktas som
              utelandningar vid XC-flyg.
            </p>
            <p>
              Vajrarna passeras söder om Stötta 1 vid nedflyg utan höjdvinst. Nya och halverfarna
              piloter ska alltid följa denna regel. Vajrarna hänger minimum 60 m ovan mark.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-serif text-xl mb-3">Åreskutan</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Huvudmassivet med de flesta startplatserna. Nås via Kabinbanan eller till fots.
              Kontrollera alltid aktuell vindprognos och NOTAM innan start.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-serif text-xl mb-3">Andra flygområden</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tegefjäll och Mörvikshummeln erbjuder alternativ vid annan vindexponering.
              Kontakta klubben för aktuell status på dessa platser.
            </p>
          </div>
          <Separator />
        </section>
        <SitesGrid sites={sites} />
      </div>
    </>
  );
};

export default SitesView;
