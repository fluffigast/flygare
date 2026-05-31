import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import Separator from "../../components/separator";
import { useActivities } from "../../hooks/useCMS";

const AktiviteterView: React.FC = () => {
  const { data: activities, loading } = useActivities([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Aktiviteter</p>
          <h2 className="font-serif text-3xl">Klubbens aktiviteter</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && activities.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga aktiviteter planerade just nu.</p>
      )}
      <div className="flex flex-col gap-6">
        {activities.map((activity: any) => (
          <div key={activity.id ?? activity.slug} className="flex flex-col gap-2 p-4 rounded-lg border border-border">
            <div className="flex gap-3 items-center">
              <h3 className="font-serif text-xl">{activity.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {activity.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(activity.date), "d MMMM yyyy", { locale: sv })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AktiviteterView;
