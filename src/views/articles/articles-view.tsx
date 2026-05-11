import React from "react";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import { articles } from "../../data/articles";

export interface ArticlesViewProps {}

const ArticlesView: React.FC<ArticlesViewProps> = ({}) => {
  return (
    <>
      <HeroBanner />
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <ArticlesGrid articles={articles} />
      </div>
    </>
  );
};

export default ArticlesView;
