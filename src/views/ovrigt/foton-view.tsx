import React from "react";
import { usePhotos } from "../../hooks/useCMS";

const FotonView: React.FC = () => {
  const { data: photos, loading } = usePhotos([]);

  return (
    <div className="w-full">
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Övrigt</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Foton
        </h1>
      </section>

      <div className="max-w-[1480px] mx-auto px-4 md:px-14 pb-16">
        {loading && <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar...</p>}
        {!loading && photos.length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Inga foton uppladdade ännu.</p>
        )}
        <div className="flex flex-col gap-12">
          {photos.map((album: any) => (
            <section key={album.id ?? album.title} className="flex flex-col gap-4">
              <h3 data-payload-field="title" className="font-serif font-bold text-xl" style={{ color: "var(--ink-2, #0f172b)" }}>
                {album.title} ({album.year})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {album.images?.map((img: any, i: number) => {
                  const src = img.image?.url ?? img.url;
                  if (!src) return null;
                  return (
                    <img key={i} src={src} alt={img.caption ?? album.title} className="w-full aspect-square object-cover" />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FotonView;
