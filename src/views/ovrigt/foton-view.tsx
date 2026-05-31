import React from "react";
import Separator from "../../components/separator";
import { usePhotos } from "../../hooks/useCMS";

const FotonView: React.FC = () => {
  const { data: photos, loading } = usePhotos([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Övrigt</p>
          <h2 className="font-serif text-3xl">Foton</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga foton uppladdade ännu.</p>
      )}
      <div className="flex flex-col gap-8">
        {photos.map((album: any) => (
          <section key={album.id ?? album.title} className="flex flex-col gap-4">
            <h3 data-payload-field="title" className="font-serif text-xl">{album.title} ({album.year})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {album.images?.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.image?.url ?? img.url}
                  alt={img.caption ?? album.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FotonView;
