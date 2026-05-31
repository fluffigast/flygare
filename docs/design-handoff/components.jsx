// components.jsx — shared UI

const { useState, useEffect, useRef } = React;

// Icons (inline SVG)
function IconChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}
function IconChevronRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
function IconArrowRight({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="13 6 19 12 13 18"></polyline>
    </svg>
  );
}
function IconWindArrow({ dir = "S" }) {
  // arrow pointing FROM the labelled direction toward center (i.e. wind FROM south points up)
  const rot = { N: 180, NE: 225, E: 270, SE: 315, S: 0, SW: 45, W: 90, NW: 135, O: 270 }[dir] ?? 0;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="6 13 12 19 18 13"></polyline>
    </svg>
  );
}
function IconAlert({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

// ---------- Topbar ----------
function Topbar({ route, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = (label, target, key) => {
    const active =
      (key === "info" && (route.page === "information" || route.page === "takeoff")) ||
      (key === "news" && (route.page === "nyheter" || route.page === "news")) ||
      (key === "om" && route.page === "om");
    return (
      <a
        key={key}
        href={target}
        className={active ? "active" : ""}
        onClick={(e) => { e.preventDefault(); navigate(target); }}
      >{label}</a>
    );
  };

  return (
    <div className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#/" onClick={(e)=>{e.preventDefault(); navigate("#/");}}>
        Åre Skärm- och Drakflygklubb
      </a>
      <nav className="nav">
        {item("Information", "#/information", "info")}
        {item("Nyheter", "#/nyheter", "news")}
        {item("Väder", "#/information#vader", "vader")}
        {item("Om klubben", "#/om", "om")}
      </nav>
      <a className="pill" href="#/medlem" onClick={(e)=>{e.preventDefault(); navigate("#/medlem");}}>Bli medlem</a>
    </div>
  );
}

// ---------- Footer ----------
function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            {window.FOOTER_LINKS_1.map((l) => (
              <a key={l} href="#/information" onClick={(e)=>{e.preventDefault(); navigate("#/information");}}>{l}</a>
            ))}
          </div>
          <div className="footer-col">
            {window.FOOTER_LINKS_2.map((l) => (
              <a key={l} href="#/medlem" onClick={(e)=>{e.preventDefault(); navigate("#/medlem");}}>{l}</a>
            ))}
          </div>
          <div className="footer-about">
            <div className="title">Om Åre Skärm- och Drakflygklubb</div>
            <p>Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och drakflyg i Åreområdet.</p>
          </div>
        </div>
        <div className="footer-fine">
          <span>© 2026 Åre Skärm- och Drakflygklubb</span>
          <span>Org.nr 802xxx-xxxx · info@areflygklubb.se</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- News carousel (3-up strip) ----------
function NewsCarousel({ items, navigate, label = "Nyheter" }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / 3));
  const visible = items.slice(page * 3, page * 3 + 3);
  // pad to 3
  while (visible.length < 3) visible.push(null);

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-head">
          <h2 className="h-news">{label}</h2>
          <div className="news-controls">
            <button className="icon-btn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Föregående">
              <IconChevronLeft />
            </button>
            <button className="icon-btn" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1} aria-label="Nästa">
              <IconChevronRight />
            </button>
          </div>
        </div>
        <div className="news-strip">
          <div className="news-track">
            {visible.map((it, i) => it ? (
              <a key={it.slug} className="news-card" href={`#/nyhet/${it.slug}`} onClick={(e)=>{e.preventDefault(); navigate(`#/nyhet/${it.slug}`);}}>
                <div className="thumb" style={{ backgroundImage: `url(${it.img})` }} />
                <div className="body-c">
                  <div className="title">{it.title}</div>
                  <div className="date">{it.date}</div>
                </div>
              </a>
            ) : <div key={i} />)}
          </div>
        </div>
        <div className="dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} className={`d ${i === page ? "active" : ""}`} onClick={() => setPage(i)} aria-label={`Sida ${i+1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Info card ----------
function InfoCard({ card, navigate }) {
  return (
    <a className="info-card" href={`#/startplats/${card.slug}`} onClick={(e)=>{e.preventDefault(); navigate(`#/startplats/${card.slug}`);}}>
      <div className="img" style={{ backgroundImage: `url(${card.img})` }} />
      <div className="meta-row">
        <h3>{card.title}</h3>
        <p>{card.desc}</p>
        <div className="arrow"><IconArrowRight /></div>
      </div>
    </a>
  );
}

// ---------- Weather day ----------
function WeatherDay({ d }) {
  return (
    <div className="day">
      <div className="day-head">
        <div className="day-name">{d.day}</div>
        <div className="day-date">{d.date}</div>
      </div>
      <div className="day-grid">
        <div className="day-cell">
          <div className="l">Vindriktning</div>
          <div className="v"><span className="arrow-icon"><IconWindArrow dir={d.windDirShort} /></span>{d.windDir}</div>
        </div>
        <div className="day-cell">
          <div className="l">Vindstyrka</div>
          <div className="v">{d.windSpeed}</div>
        </div>
        <div className="day-cell">
          <div className="l">Temperatur</div>
          <div className="v">{d.temp}</div>
        </div>
        <div className="day-cell">
          <div className="l">Nederbörd</div>
          <div className="v">{d.rain}</div>
        </div>
      </div>
    </div>
  );
}

// ---------- News item (large card on Nyheter page) ----------
function NewsItem({ item, navigate }) {
  return (
    <a className="news-item" href={`#/nyhet/${item.slug}`} onClick={(e)=>{e.preventDefault(); navigate(`#/nyhet/${item.slug}`);}}>
      <div className="img" style={{ backgroundImage: `url(${item.img})` }} />
      <div className="meta-row">
        <span className="tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ fontSize: 14, color: "var(--slate-2)" }}>{item.date}</span>
          <span className="arrow"><IconArrowRight /></span>
        </div>
      </div>
    </a>
  );
}

Object.assign(window, {
  Topbar, Footer, NewsCarousel, InfoCard, WeatherDay, NewsItem,
  IconChevronLeft, IconChevronRight, IconArrowRight, IconWindArrow, IconAlert,
});
