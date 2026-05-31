import React from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useActivities } from "../../hooks/useCMS";

function richTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (value?.root?.children) {
    return value.root.children
      .map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      )
      .join("\n\n");
  }
  return "";
}

const AktivitetSingleView: React.FC = () => {
  const { slug } = useParams();
  const { data: activities, loading } = useActivities([]);

  const activity = activities.find((a: any) => a.slug === slug);

  if (loading) {
    return (
      <div className="w-full px-4 py-16">
        <p style={{ color: "var(--slate, #62748e)" }}>Laddar...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="w-full px-4 py-16 flex flex-col gap-4">
        <h1 className="font-serif font-bold text-3xl" style={{ color: "var(--ink-2, #0f172b)" }}>
          Aktiviteten hittades inte
        </h1>
        <Link to="/aktiviteter" className="text-sm hover:underline" style={{ color: "var(--hero-accent, #3774a3)" }}>
          Tillbaka till aktiviteter
        </Link>
      </div>
    );
  }

  const bodyText = richTextToString(activity.body ?? activity.description ?? "");

  return (
    <div className="w-full">
      <section className="px-4 sm:px-8 md:px-16 lg:px-[110px] pt-16 md:pt-24 pb-8">
        <Link to="/aktiviteter" className="text-sm mb-4 inline-block hover:underline" style={{ color: "var(--slate, #62748e)" }}>
          &larr; Aktiviteter
        </Link>
        <div className="flex gap-3 items-center mb-2">
          <h1
            className="font-serif font-bold leading-[0.96] tracking-tight"
            style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
          >
            {activity.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center mt-4">
          <span className="text-xs px-2 py-0.5" style={{ background: "var(--paper, #fafbfc)", color: "var(--hero-accent, #3774a3)" }}>
            {activity.type}
          </span>
          <span className="text-sm" style={{ color: "var(--slate, #62748e)" }}>
            {activity.date ? format(new Date(activity.date), "d MMMM yyyy", { locale: sv }) : ""}
          </span>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {bodyText.split("\n\n").filter((p: string) => p.trim()).map((p: string, i: number) => (
          <p
            key={i}
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--slate-3, #45556c)" }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AktivitetSingleView;
