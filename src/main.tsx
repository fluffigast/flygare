import "@fontsource-variable/karla";
import "@fontsource-variable/karla/wght-italic.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import { initClickToEdit } from "./utils/click-to-edit";
import ScrollToTop from "./components/scroll-to-top.tsx";
import HomeView from "./views/home/home-view.tsx";
import NewsView from "./views/news/news-view.tsx";
import NewsSingleView from "./views/news/news-single/news-single-view.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import SitesView from "./views/sites/sites-view.tsx";
import SitesSingleView from "./views/sites/sites-single/sites-single-view.tsx";
import KontaktView from "./views/kontakt/kontakt-view.tsx";
import OmView from "./views/om/om-view.tsx";
import StyrelsenView from "./views/om/styrelsen-view.tsx";
import BliMedlemView from "./views/bli-medlem/bli-medlem-view.tsx";
import TavlingarView from "./views/tavlingar/tavlingar-view.tsx";
import VaderView from "./views/vader/vader-view.tsx";
import NotFoundView from "./views/not-found-view.tsx";
import FlyingGuideIndex from "./views/flyga-i-are/flyga-i-are-index.tsx";
import KlubbussView from "./views/flyga-i-are/klubbuss-view.tsx";
import PageView from "./views/page/page-view.tsx";
import AktiviteterView from "./views/aktiviteter/aktiviteter-view.tsx";
import AktivitetSingleView from "./views/aktiviteter/aktivitet-single-view.tsx";
import FotonView from "./views/ovrigt/foton-view.tsx";
import DokumentView from "./views/ovrigt/dokument-view.tsx";

// Enable click-to-edit when inside CMS live preview iframe
initClickToEdit();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<HomeView />} />
        <Route element={<MainLayout />}>
          {/* Flyga i Åre */}
          <Route path="flyga-i-are">
            <Route index element={<FlyingGuideIndex />} />
            <Route path="startplatser" element={<SitesView />} />
            <Route path="startplatser/:slug" element={<SitesSingleView />} />
            <Route path="vader" element={<VaderView />} />
            <Route path="klubbuss" element={<KlubbussView />} />
            <Route path=":slug" element={<PageView />} />
          </Route>
          {/* Nyheter */}
          <Route path="nyheter">
            <Route index element={<NewsView />} />
            <Route path=":slug" element={<NewsSingleView />} />
          </Route>
          {/* Aktiviteter */}
          <Route path="aktiviteter">
            <Route index element={<AktiviteterView />} />
            <Route path="kalender" element={<PageView slug="kalender" />} />
            <Route path="klubbresor" element={<PageView slug="klubbresor" />} />
            <Route path="arsmoten" element={<PageView slug="arsmoten" />} />
            <Route path="ovriga-aktiviteter" element={<PageView slug="ovriga-aktiviteter" />} />
            <Route path=":slug" element={<AktivitetSingleView />} />
          </Route>
          {/* Tävling */}
          <Route path="tavlingar">
            <Route index element={<TavlingarView />} />
            <Route path=":slug" element={<PageView />} />
          </Route>
          {/* Om klubben */}
          <Route path="om">
            <Route index element={<OmView />} />
            <Route path="styrelsen" element={<StyrelsenView />} />
            <Route path=":slug" element={<PageView />} />
          </Route>
          <Route path="kontakt" element={<KontaktView />} />
          <Route path="bli-medlem" element={<BliMedlemView />} />
          {/* Övrigt */}
          <Route path="ovrigt">
            <Route index element={<Navigate to="foton" replace />} />
            <Route path="foton" element={<FotonView />} />
            <Route path="dokument" element={<DokumentView />} />
          </Route>
          {/* Legacy redirects */}
          <Route path="information" element={<FlyingGuideIndex />} />
          <Route path="startplatser" element={<SitesView />} />
          <Route path="startplatser/:slug" element={<SitesSingleView />} />
          <Route path="vader" element={<VaderView />} />
          {/* 404 */}
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
