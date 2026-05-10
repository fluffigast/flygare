import React from "react";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import { articles } from "../../data/articles";
import NewsSlider from "../../blocks/news-slider/news-slider";

const ArticlesView: React.FC = () => {
  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Flygguiden</p>
        <h1 className="display mt-[-4px]">Att flyga i Åre</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          En samlad guide till starter, väder, regler och säkerhet i
          Åreområdet. Innehållet underhålls av klubbens medlemmar.
        </p>
      </section>

      <section className="mt-20">
        <div className="site-container">
          <ArticlesGrid articles={articles} />
        </div>
      </section>

      <NewsSlider />
    </main>
  );
};

export default ArticlesView;
