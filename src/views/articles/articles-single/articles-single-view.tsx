import { format } from "date-fns";
import { sv } from "date-fns/locale";
import React from "react";
import { Link, useParams } from "react-router";

import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import { articles } from "../../../data/articles";
import { getPlaceholderImage } from "../../../utils/placeholder";
import Stack from "../../../components/stack";

const ArticlesSingleView: React.FC = () => {
  const { slug } = useParams();
  const articlesItem = articles.find((n) => n.slug === slug);

  if (!articlesItem) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Sidan hittades inte</h1>
        <p className="text-muted-foreground">Innehållet du söker finns inte.</p>
      </div>
    );
  }
  return (
    <>
      <HeroBanner
        imageUrl={
          getPlaceholderImage(slug ?? "fallback") ??
          `https://placehold.co/1920x1080?text=${articlesItem?.slug}`
        }
      />
      <article className="max-w-5xl mx-auto px-6 flex flex-col w-full py-16">
        <div className="flex flex-col">
          <p className="text-muted-foreground font-serif italic text-2xl">
            {articlesItem?.category}
          </p>
          <h1 className="text-5xl mb-2">{articlesItem?.title}</h1>
          <p className="text-muted-foreground">
            Publicerad den{" "}
            {format(articlesItem?.updatedAt, "d MMMM, yyyy", { locale: sv })}
          </p>
        </div>
        <Stack gap={8} direction="row" className="py-8">
          <div className="flex-2 flex flex-col gap-4">
            <p className="font-serif italic text-3xl text-foreground">
              {articlesItem?.excerpt}
            </p>
            <p>{articlesItem?.content}</p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3>Relaterade artiklar</h3>
            <ul className="flex flex-col gap-4">
              {articles.slice(0, 2).map((a) => (
                <li key={a.id}>
                  <h4>
                    <Link to={`/information/${a.slug}`}>{a.title}</Link>
                  </h4>
                  <p>{a.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </Stack>
      </article>
    </>
  );
};

export default ArticlesSingleView;
