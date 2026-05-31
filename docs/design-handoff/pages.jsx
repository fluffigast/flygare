// pages.jsx — all five page templates

const { useEffect: _ue, useState: _us } = React;

// ---------- Homepage ----------
function HomePage({ navigate }) {
  const [heroIn, setHeroIn] = _us(false);
  _ue(() => { const t = setTimeout(() => setHeroIn(true), 50); return () => clearTimeout(t); }, []);

  return (
    <main>
      <section className={`hero ${heroIn ? "in" : ""}`}>
        <div className="hero-img" />
        <div className="hero-grad" />
        <div className="hero-disc">
          <div className="disc-inner">
            <b>Åre · 1 200 m</b>
            sydlig vind<br/>2–6 m/s
          </div>
        </div>
        <div className="hero-foot">
          <span className="stack"><span className="dot" />Åreskutan, Jämtland</span>
          <span className="stack">Säsong 2026 · Inflygning från syd</span>
        </div>
      </section>

      <div className="container">
        <section className="welcome">
          <div className="welcome-img" />
          <div className="welcome-text">
            <h2>Välkommen till Åre Skärm- och Drakflygklubb!</h2>
            <p className="body">Åre Skärm- och Drakflygklubb har i många år varit en samlingspunkt för flygare i fjällmiljö. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.</p>
            <p className="body">Klubben drivs av sina medlemmar och bygger på engagemang, erfarenhetsutbyte och flygglädje. Målet är enkelt. Att fler ska få uppleva friheten i luften på ett tryggt och hållbart sätt.</p>
          </div>
        </section>
      </div>

      <NewsCarousel items={window.NEWS} navigate={navigate} />

      <section className="cards-section">
        <div className="container">
          <div className="cards-head">
            <h2 className="h-section">Flyga i Åre</h2>
            <a href="#/information" onClick={(e)=>{e.preventDefault(); navigate("#/information");}} style={{ fontSize: 14, color: "var(--ink-2)", borderBottom: "1px solid var(--ink-2)", paddingBottom: 2 }}>
              Se all information
            </a>
          </div>
          <div className="cards-grid">
            {window.INFO_CARDS.slice(0, 3).map((c) => <InfoCard key={c.slug} card={c} navigate={navigate} />)}
          </div>
          <div className="cards-grid" style={{ marginTop: 20 }}>
            {window.INFO_CARDS.slice(3, 6).map((c) => <InfoCard key={c.slug} card={c} navigate={navigate} />)}
          </div>
        </div>
      </section>

      <section className="weather-section">
        <div className="container">
          <div className="weather-head">
            <div>
              <div className="eyebrow-sm" style={{ fontSize: 16, marginBottom: 4 }}>Väder</div>
              <h2 className="h-section">Väderprognos för Åreskutan</h2>
            </div>
            <div className="source">Källa: SMHI · Uppdaterad 02:00</div>
          </div>
          <div className="weather-grid">
            {window.WEATHER_DAYS.map((d) => <WeatherDay key={d.day} d={d} />)}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </main>
  );
}

// ---------- Information ----------
function InformationPage({ navigate }) {
  return (
    <main>
      <section style={{ padding: "100px 110px 0 110px" }}>
        <div className="eyebrow">Information</div>
        <h1 className="display interior-display" style={{ marginTop: -4 }}>Att flyga i Åre</h1>
        <p className="body body-muted" style={{ maxWidth: 720, marginTop: 32, fontSize: 18, lineHeight: 1.5 }}>
          En samlad guide till starter, väder, regler och säkerhet i Åreområdet. Innehållet underhålls av klubbens medlemmar.
        </p>
      </section>

      <section style={{ marginTop: 80 }}>
        <div className="container">
          <div className="cards-grid">
            {window.INFO_CARDS.slice(0, 3).map((c) => <InfoCard key={c.slug} card={c} navigate={navigate} />)}
          </div>
          <div className="cards-grid" style={{ marginTop: 20 }}>
            {window.INFO_CARDS.slice(3, 6).map((c) => <InfoCard key={c.slug} card={c} navigate={navigate} />)}
          </div>
        </div>
      </section>

      <NewsCarousel items={window.NEWS} navigate={navigate} />
      <Footer navigate={navigate} />
    </main>
  );
}

// ---------- Nyheter list ----------
function NyheterPage({ navigate }) {
  const [filter, setFilter] = _us("Alla");
  const cats = ["Alla", "Aktiviteter", "Aktuellt", "Säkerhet", "Tävlingar", "Åre"];
  const items = filter === "Alla" ? window.NEWS : window.NEWS.filter((n) => n.category === filter);

  return (
    <main>
      <section className="nyheter-hero">
        <div className="eyebrow" style={{ color: "var(--accent)" }}>Aktuellt</div>
        <h1 className="display" style={{ marginTop: -4 }}>Senaste nytt</h1>
      </section>

      <div className="container">
        <div className="filter-bar">
          {cats.map((c) => (
            <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <section className="news-grid">
          {items.map((it) => <NewsItem key={it.slug} item={it} navigate={navigate} />)}
        </section>

        <div className="pagination">
          <button>Föregående</button>
          {[1,2,3,4,5].map((n) => <button key={n} className={n === 1 ? "active" : ""}>{n}</button>)}
          <button>Nästa sida</button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </main>
  );
}

// ---------- Single news ----------
function SingleNewsPage({ slug, navigate }) {
  const item = window.NEWS.find((n) => n.slug === slug) || window.NEWS[0];
  return (
    <main>
      <div className="image-header" style={{ backgroundImage: `url(${item.img})`, height: 540 }} />
      <article className="article-shell">
        <header className="article-head">
          <span className="eyebrow-sm">{item.tag}</span>
          <h1>{item.title}</h1>
          <div className="article-meta">Publicerad {item.date}</div>
        </header>
        <div className="article-cols">
          <div className="article-body">
            <p className="article-lede">{item.lede || item.excerpt}</p>
            {(item.body || [item.excerpt]).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <aside className="article-aside">
            <h3 className="aside-title">Relaterad information</h3>
            <div className="aside-card">
              <h4>Säkerhet och regler</h4>
              <p>Lokala regler, nationella bestämmelser och säkerhetsrutiner för skärm- och drakflyg. Fokus på ansvar och förebyggande åtgärder.</p>
              <a className="read-more" href="#/information" onClick={(e)=>{e.preventDefault(); navigate("#/information");}}>Läs mer →</a>
            </div>
            <div className="aside-card">
              <h4>Klubbussen</h4>
              <p>Allt om klubbens buss: transport av piloter och utrustning, planering av turer och hur man använder den på ett säkert sätt.</p>
              <a className="read-more" href="#/information" onClick={(e)=>{e.preventDefault(); navigate("#/information");}}>Läs mer →</a>
            </div>
          </aside>
        </div>
      </article>
      <NewsCarousel items={window.NEWS.filter((n) => n.slug !== slug)} navigate={navigate} label="Fler nyheter" />
      <Footer navigate={navigate} />
    </main>
  );
}

// ---------- Single takeoff ----------
function SingleTakeoffPage({ slug, navigate }) {
  const t = window.TAKEOFF;
  return (
    <main>
      <div className="image-header" style={{ backgroundImage: `url(${t.hero})`, height: 540 }} />
      <article className="article-shell">
        <header className="article-head">
          <span className="eyebrow-sm">{t.eyebrow}</span>
          <h1>{t.title}</h1>
        </header>

        <div className="takeoff-grid">
          <aside className="takeoff-overview">
            <h2>Översikt</h2>
            <div className="stack-20">
              <div className="field">
                <div className="field-label">Position</div>
                <div className="field-grid-2">
                  <div className="field">
                    <div className="label-italic">WGS84</div>
                    <div className="field-value" style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{t.pos.wgs84}</div>
                  </div>
                  <div className="field">
                    <div className="label-italic">Sweref99</div>
                    <div className="field-value" style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{t.pos.sweref}</div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field-label">Höjd</div>
                <div className="field-value">Start ca {t.altitudeStart}<br/>Höjd över landning {t.altitudeOver}</div>
              </div>
              <div className="field">
                <div className="field-label">Optimala vindförhållanden</div>
                <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 4 }}>
                  <div>
                    <div className="label-italic" style={{ color: "var(--slate)" }}>Vindriktning</div>
                    <div className="field-value">{t.windDir}</div>
                  </div>
                  <div className="compass" aria-label="Vindrosen">
                    <span className="compass-label">SSO</span>
                  </div>
                </div>
                <p style={{ color: "var(--slate)", marginTop: 12, fontSize: 15, lineHeight: "22px" }}>{t.windNote}</p>
              </div>
              <div className="field">
                <div className="field-label muted">Rekommenderad erfarenhetsnivå</div>
                <div className="field-value">{t.level}</div>
              </div>
              <div className="field">
                <div className="field-label">Senast uppdaterad</div>
                <div className="field-value" style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{t.updated}</div>
              </div>
            </div>
          </aside>

          <div>
            <section className="takeoff-section">
              <h3>Beskrivning</h3>
              {t.description.map((p, i) => <p key={i}>{p}</p>)}
            </section>

            <section className="takeoff-section">
              <h3>Potentiella risker och faror</h3>
              <ul className="risk-list">
                {t.risks.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <div className="danger-card">
                <span className="ico"><IconAlert /></span>
                <div>
                  <strong>Visa marginaler vid termik</strong>
                  <span>Soliga eftermiddagar kan termiken bli stark över sydsluttningen. Planera tidiga eller sena flygpass om förhållandena känns kraftiga.</span>
                </div>
              </div>
            </section>

            <section className="takeoff-section">
              <h3>Nödinformation</h3>
              <p>{t.emergency}</p>
              <div className="field" style={{ marginTop: 16 }}>
                <div className="field-label">Position</div>
                <div className="field-grid-2" style={{ maxWidth: 500 }}>
                  <div className="field">
                    <div className="label-italic">WGS84</div>
                    <div className="field-value" style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{t.pos.wgs84}</div>
                  </div>
                  <div className="field">
                    <div className="label-italic">Sweref99</div>
                    <div className="field-value" style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{t.pos.sweref}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <NewsCarousel items={window.NEWS} navigate={navigate} label="Relaterade nyheter" />
      <Footer navigate={navigate} />
    </main>
  );
}

// ---------- Generic stub for "om" / "medlem" ----------
function StubPage({ title, navigate }) {
  return (
    <main>
      <section style={{ padding: "100px 110px 60px 110px" }}>
        <div className="eyebrow">{title}</div>
        <h1 className="display" style={{ marginTop: -4 }}>Kommer snart</h1>
        <p className="body body-muted" style={{ maxWidth: 720, marginTop: 32, fontSize: 18 }}>
          Denna sida är under uppbyggnad. Vänligen återkom senare eller kontakta klubben direkt för mer information.
        </p>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

Object.assign(window, { HomePage, InformationPage, NyheterPage, SingleNewsPage, SingleTakeoffPage, StubPage });
