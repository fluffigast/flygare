import "@fontsource-variable/karla";
import "@fontsource-variable/karla/wght-italic.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
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
import KontaktView from "./views/kontakt/kontakt-view.tsx";
import OmView from "./views/om/om-view.tsx";
import BliMedlemView from "./views/bli-medlem/bli-medlem-view.tsx";
import TavlingarView from "./views/tavlingar/tavlingar-view.tsx";
import VaderView from "./views/vader/vader-view.tsx";
import NotFoundView from "./views/not-found-view.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomeView />} />
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
          <Route path="kontakt" element={<KontaktView />} />
          <Route path="om" element={<OmView />} />
          <Route path="bli-medlem" element={<BliMedlemView />} />
          <Route path="tavlingar" element={<TavlingarView />} />
          <Route path="vader" element={<VaderView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
