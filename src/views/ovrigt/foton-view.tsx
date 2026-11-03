import React, { useMemo } from "react";
import { usePhotos } from "../../hooks/useCMS";
import { cmsMediaUrl } from "../../lib/cms";
import SEO from "../../components/seo";
import PageHero from "../../components/page-hero";

// Bildarkiv sorterat på årtal per pptx. Album grupperas per year → visas
// nedåt kronologiskt (nyast först). Om ett album saknar year hamnar det
// under "Odaterat".
const FotonView: React.FC = () => {
  const { data: photos, loading } = usePhotos([]);

  const grouped = useMemo(() => {
    const byYear = new Map<number, any[]>();
    for (const album of photos as any[]) {
      const year = typeof album?.year === "number" ? album.year : 0;
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year)!.push(album);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [photos]);

  return (
    <div className="w-full">
      <SEO
        title="Foton"
        path="/ovrigt/foton"
        description="Bildarkiv från klubbens säsonger, sorterat per årtal — från start- och landningsplatser till tävlingar och klubbresor."
      />
      <PageHero
        eyebrow="Övrigt"
        title="Foton"
        lead="Bildarkiv från klubbens säsonger, sorterat på årtal."
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16">
        {loading && <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar…</p>}
        {!loading && (photos as any[]).length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Inga foton uppladdade ännu.</p>
        )}

        {!loading && grouped.map(([year, albums]) => (
          <section
            key={year}
            className="pt-8 pb-4 flex flex-col gap-8"
            style={{ borderTop: "1px solid var(--border, #e2e8f0)", marginTop: 32 }}
          >
            <h2
              className="font-serif font-bold text-2xl md:text-[40px] leading-none tracking-tight"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              {year || "Odaterat"}
            </h2>
            {albums.map((album: any) => (
              <div key={album.id ?? album.title} className="flex flex-col gap-4">
                {album.title && (
                  <h3
                    data-payload-field="title"
                    className="font-serif font-bold text-base"
                    style={{ color: "var(--ink, #020618)" }}
                  >
                    {album.title}
                  </h3>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {album.images?.map((img: any, i: number) => {
                    const src = cmsMediaUrl(img.image?.url ?? img.url);
                    if (!src) return null;
                    return (
                      <img
                        key={i}
                        src={src}
                        alt={img.caption ?? album.title ?? "Foto"}
                        loading="lazy"
                        className="w-full aspect-square object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default FotonView;
