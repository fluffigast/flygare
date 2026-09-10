import React, { useMemo } from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useActivitiesByType } from "../../hooks/useCMS";
import ParaglidingArc from "../../components/decorations/paragliding-arc";
import SectionCornerMark from "../../components/decorations/section-corner-mark";

type ActivityType = "kalender" | "klubbresa" | "arsmote" | "ovrigt";

const HEADINGS: Record<ActivityType, { eyebrow: string; title: string; empty: string }> = {
  kalender: {
    eyebrow: "Året runt",
    title: "Kalender",
    empty: "Inga aktiviteter inplanerade just nu.",
  },
  klubbresa: {
    eyebrow: "Reser tillsammans",
    title: "Klubbresor",
    empty: "Inga klubbresor annonserade just nu.",
  },
  arsmote: {
    eyebrow: "Årsmötesdokument",
    title: "Årsmöten",
    empty: "Inga årsmöten publicerade ännu.",
  },
  ovrigt: {
    eyebrow: "Övrigt",
    title: "Övriga klubbaktiviteter",
    empty: "Inget att visa just nu.",
  },
};

const ActivitiesListView: React.FC<{ type: ActivityType; groupByYear?: boolean }> = ({
  type,
  groupByYear = false,
}) => {
  const { data: activities, loading } = useActivitiesByType(type, []);
  const h = HEADINGS[type];

  const grouped = useMemo(() => {
    if (!groupByYear) return null;
    const byYear = new Map<number, any[]>();
    for (const a of activities as any[]) {
      const year = a?.date ? new Date(a.date).getFullYear() : 0;
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year)!.push(a);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [activities, groupByYear]);

  const renderRow = (a: any) => (
    <Link
      key={a.id ?? a.slug}
      to={`/aktiviteter/${a.slug}`}
      className="group flex items-start justify-between gap-6 p-5 transition-colors hover:bg-[#fafbfc]"
      style={{ border: "1px solid var(--border, #e2e8f0)" }}
    >
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif font-bold text-base group-hover:opacity-80 transition-opacity"
          style={{ color: "var(--ink, #020618)" }}
        >
          {a.title}
        </h3>
        {a.location && (
          <p className="text-xs mt-1" style={{ color: "var(--slate, #62748e)" }}>
            {a.location}
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm" style={{ color: "var(--slate-3, #45556c)" }}>
          {a.date ? format(new Date(a.date), "d MMMM yyyy", { locale: sv }) : ""}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="w-full relative">
      <ParaglidingArc
        className="pointer-events-none absolute inset-x-0 top-0 h-48 w-full -z-10"
        opacity={0.05}
      />
      <SectionCornerMark
        className="pointer-events-none absolute right-8 md:right-14 top-10 w-24 h-14 -z-10 hidden md:block"
        label={h.title.toUpperCase()}
      />
      <section className="relative max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p
          className="font-serif italic text-lg"
          style={{ color: "var(--slate, #62748e)" }}
        >
          {h.eyebrow}
        </p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          {h.title}
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {loading && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar…</p>
        )}
        {!loading && (activities as any[]).length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{h.empty}</p>
        )}

        {!loading && grouped && (
          <div className="flex flex-col gap-10">
            {grouped.map(([year, rows]) => (
              <div key={year} className="flex flex-col gap-3">
                <h2
                  className="font-serif font-bold text-xl md:text-[28px] leading-none"
                  style={{ color: "var(--ink-2, #0f172b)" }}
                >
                  {year || "Odaterat"}
                </h2>
                <div className="flex flex-col gap-3">{rows.map(renderRow)}</div>
              </div>
            ))}
          </div>
        )}

        {!loading && !grouped && (
          <div className="flex flex-col gap-3">
            {(activities as any[]).map(renderRow)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesListView;
