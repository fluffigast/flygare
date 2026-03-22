import "@fontsource-variable/karla";
import "@fontsource-variable/source-serif-4";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import HomeView from "./views/home/home-view.tsx";
import NewsView from "./views/news/news-view.tsx";
import NewsSingleView from "./views/news/news-single/news-single-view.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import ArticlesView from "./views/articles/articles-view.tsx";
import ArticlesSingleView from "./views/articles/articles-single/articles-single-view.tsx";
import SitesView from "./views/sites/sites-view.tsx";
import SitesSingleView from "./views/sites/sites-single/sites-single-view.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeView />} />
        <Route element={<MainLayout />}>
          <Route path="nyheter">
            <Route index element={<NewsView />} />
            <Route path=":slug" element={<NewsSingleView />} />
          </Route>
          <Route path="information">
            <Route index element={<ArticlesView />} />
            <Route path=":slug" element={<ArticlesSingleView />} />
          </Route>
          <Route path="startplatser">
            <Route index element={<SitesView />} />
            <Route path=":slug" element={<SitesSingleView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
