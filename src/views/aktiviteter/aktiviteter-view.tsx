import React from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useActivities } from "../../hooks/useCMS";

const AktiviteterView: React.FC = () => {
  const { data: activities, loading } = useActivities([]);

  return (
    <div className="w-full">
      <section className="max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Aktiviteter</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Klubbens aktiviteter
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {loading && <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar...</p>}
        {!loading && activities.length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Inga aktiviteter planerade just nu.</p>
        )}
        <div className="flex flex-col gap-4">
          {activities.map((activity: any) => (
            <Link
              key={activity.id ?? activity.slug}
              to={`/aktiviteter/${activity.slug}`}
              className="group flex flex-col gap-2 p-5 transition-colors hover:bg-[#fafbfc]"
              style={{ border: "1px solid var(--border, #e2e8f0)" }}
            >
              <div className="flex gap-3 items-center">
                <h3 className="font-serif font-bold text-base group-hover:opacity-80 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
                  {activity.title}
                </h3>
                <span className="text-xs px-2 py-0.5" style={{ background: "var(--paper, #fafbfc)", color: "var(--hero-accent, #3774a3)" }}>
                  {activity.type}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>
                {activity.date ? format(new Date(activity.date), "d MMMM yyyy", { locale: sv }) : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AktiviteterView;
