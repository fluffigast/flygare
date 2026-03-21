import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { T, Nav, Footer } from "./shared";
import Hem from "./pages/Hem";
import Flygguiden from "./pages/Flygguiden";
import Vader from "./pages/Vader";
import Nyheter from "./pages/Nyheter";
import Startplatser from "./pages/Startplatser";
import Om from "./pages/Om";
import BliMedlem from "./pages/BliMedlem";
import Tavlingar from "./pages/Tavlingar";
import Klubbuss from "./pages/Klubbuss";
import Kontakt from "./pages/Kontakt";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { overflow-x: hidden; }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mob-btn { display: none !important; }
        }
      `}</style>
      <ScrollToTop />
      <Nav scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<Hem />} />
        <Route path="/flygguiden" element={<Flygguiden />} />
        <Route path="/vader" element={<Vader />} />
        <Route path="/nyheter" element={<Nyheter />} />
        <Route path="/startplatser" element={<Startplatser />} />
        <Route path="/om" element={<Om />} />
        <Route path="/bli-medlem" element={<BliMedlem />} />
        <Route path="/tavlingar" element={<Tavlingar />} />
        <Route path="/klubbuss" element={<Klubbuss />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
      <Footer />
    </div>
  );
}
