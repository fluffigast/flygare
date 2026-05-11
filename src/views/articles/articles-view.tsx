import React from "react";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import { articles } from "../../data/articles";

const ArticlesView: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <div className="max-w-5xl mx-auto px-6 flex gap-16 flex-col w-full py-16">
        <ArticlesGrid articles={articles} />
      </div>
    </>
  );
};

export default ArticlesView;
