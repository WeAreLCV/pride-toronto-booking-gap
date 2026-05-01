import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import { translations, getLocale, setLocaleStorage, formatPct, formatInt } from "./i18n";
import StoryCard, { STORY_WIDTH, STORY_HEIGHT } from "./StoryCard";
import FeedCard, { FEED_SIZE } from "./FeedCard";
import AppendixTable from "./AppendixTable";
import ShareCaption from "./ShareCaption";

/* =============================================================================
 * Pride Toronto 2025: The Booking Gap — We Are LCV
 * - Bilingual EN/FR
 * - Full Audit at "/"
 * - IG Story Card (1080x1920) at "/story"
 * - Download as PNG
 * - Expanded methodology / context section
 * ========================================================================== */

const DATA = {
  totalPerformers: 409,
  gayMenPct: 60.4,
  everyoneElsePct: 39.6,
  whiteGayMenPct: 35,
  identities: [
    { key: "gm",  pct: 60.4, color: "#4A15ED" },
    { key: "qnb", pct: 17.8, color: "#70E580" },
    { key: "t",   pct: 9.5,  color: "#9495E6" },
    { key: "l",   pct: 8.6,  color: "#F9BBE6" },
    { key: "h",   pct: 6.8,  color: "#FF3C00" },
    { key: "sap", pct: 2.9,  color: "#9CF6F6" },
  ],
  ethnicity: { white: 53.3, bipoc: 46.7 },
  links: {
    instagram: { handle: "@wearelcv",        url: "https://www.instagram.com/wearelcv" },
    facebook:  { handle: "WeAreLcv",         url: "https://www.facebook.com/WeAreLcv" },
    email:     { handle: "info@wearelcv.ca", url: "mailto:info@wearelcv.ca" },
  },
};

/* ---- i18n context ---- */

const LangContext = createContext({ lang: "en", setLang: () => {}, t: translations.en });

function LangProvider({ children }) {
  const [lang, _setLang] = useState(() => getLocale());
  const setLang = useCallback((l) => {
    _setLang(l);
    setLocaleStorage(l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

const useLang = () => useContext(LangContext);

/* -------------------------------------------------------------------------- */
/*  Toolbar (language toggle + route toggle + download)                       */
/* -------------------------------------------------------------------------- */

function Toolbar({ onDownload, downloading }) {
  const { lang, setLang, t } = useLang();
  const { pathname } = useLocation();
  const isStory = pathname.startsWith("/story");
  const isFeed = pathname.startsWith("/feed");
  const isFull = !isStory && !isFeed;

  return (
    <div className="toolbar" data-testid="toolbar">
      <div className="toolbar-inner">
        <div className="tb-group tb-group--lang" role="group" aria-label="Language">
          <button
            className={`tb-lang ${lang === "en" ? "is-active" : ""}`}
            onClick={() => setLang("en")}
            data-testid="lang-en"
            aria-pressed={lang === "en"}
            title="Toggle language (L)"
          >
            {t.toolbar.langEN}
          </button>
          <span className="tb-lang-sep" aria-hidden="true">/</span>
          <button
            className={`tb-lang ${lang === "fr" ? "is-active" : ""}`}
            onClick={() => setLang("fr")}
            data-testid="lang-fr"
            aria-pressed={lang === "fr"}
            title="Toggle language (L)"
          >
            {t.toolbar.langFR}
          </button>
        </div>

        <div className="tb-group tb-group--view" role="group" aria-label="View mode">
          <Link
            to="/"
            className={`tb-view ${isFull ? "is-active" : ""}`}
            data-testid="view-full"
            title="Full Audit (A)"
          >
            {t.toolbar.viewFull}
          </Link>
          <Link
            to="/story"
            className={`tb-view ${isStory ? "is-active" : ""}`}
            data-testid="view-story"
            title="Story 1080×1920 (S)"
          >
            {t.toolbar.viewStory}
          </Link>
          <Link
            to="/feed"
            className={`tb-view ${isFeed ? "is-active" : ""}`}
            data-testid="view-feed"
            title="Feed 1080×1080 (F)"
          >
            {t.toolbar.viewFeed}
          </Link>
        </div>

        <span className="tb-shortcuts" aria-hidden="true" title={t.toolbar.shortcuts}>
          ⌨ {t.toolbar.shortcuts}
        </span>

        <button
          className="tb-download"
          onClick={onDownload}
          disabled={downloading}
          data-testid="download-png"
          title="Download PNG (D)"
        >
          <span className="tb-download-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
          <span>{downloading ? t.toolbar.downloading : t.toolbar.download}</span>
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Full Audit page sections                                                  */
/* -------------------------------------------------------------------------- */

function Masthead() {
  const { t, lang } = useLang();
  const m = t.masthead;
  return (
    <header className="masthead" data-testid="masthead">
      <div className="masthead-top">
        <span className="eyebrow">{m.eyebrowLeft}</span>
        <span className="eyebrow eyebrow--right">{m.eyebrowRight}</span>
      </div>
      <hr className="hair" />
      <h1 className="display-title" data-testid="page-title">
        <span className="title-row-1">{m.title1}</span>
        <span className="title-row-2">
          <em>{m.title2}</em>
          <span className="title-dot">.</span>
        </span>
      </h1>
      <p className="deck">
        {m.deck[0]}
        <em>{m.deck[1]}</em>
      </p>
      <div className="byline">
        <span>
          <b>{formatInt(DATA.totalPerformers, lang)}</b>
          {m.bylineCount}
        </span>
        <span className="byline-dot">·</span>
        <span>{m.bylineCompiled}</span>
        <span className="byline-dot">·</span>
        <span>
          {m.bylineBy} <b>@wearelcv</b>
        </span>
      </div>
    </header>
  );
}

function Kicker({ num, children }) {
  return (
    <div className="kicker">
      <span className="kicker-num">{num}</span>
      <span className="kicker-line" />
      <span className="kicker-text">{children}</span>
    </div>
  );
}

function HeroStat() {
  const { t, lang } = useLang();
  const h = t.hero;
  return (
    <section className="hero-stat" data-testid="hero-stat">
      <Kicker num="01">{h.kicker}</Kicker>
      <div className="hero-grid">
        <div className="hero-number-wrap">
          <span className="hero-number" data-testid="hero-percentage">
            {lang === "fr" ? "60,4" : "60.4"}
            <span className="hero-pct">%</span>
          </span>
          <span className="hero-number-shadow" aria-hidden="true">
            {lang === "fr" ? "60,4" : "60.4"}
            <span className="hero-pct">%</span>
          </span>
        </div>
        <div className="hero-label-wrap">
          <span className="hero-were">{h.were}</span>
          <span className="hero-identity" data-testid="hero-label">
            {h.identity}
            <span className="hero-dot">.</span>
          </span>
          <p className="hero-explainer">
            {h.explainer[0]}
            <strong>{formatInt(409, lang)}{h.explainer[1].replace(/^\d+\s*/, " ")}</strong>
            {h.explainer[2]}
            <mark className="accent-mark">{h.explainer[3]}</mark>
            {h.explainer[4]}
            <em>{h.explainer[5]}</em>
            {h.explainer[6]}
            <strong>{h.explainer[7]}</strong>
            {h.explainer[8]}
          </p>
        </div>
      </div>
    </section>
  );
}

function SplitBar() {
  const { t, lang } = useLang();
  const s = t.split;
  return (
    <section className="split-section" data-testid="split-section">
      <Kicker num="02">{s.kicker}</Kicker>
      <h2 className="section-h">
        {s.heading1}
        <em>{s.heading2}</em>
        {s.heading3}
      </h2>

      <div className="split-stats">
        <div className="split-stat split-stat--gm">
          <span className="split-stat-num">{formatPct(60.4, lang)}</span>
          <span className="split-stat-label">{s.statA}</span>
        </div>
        <div className="split-stat split-stat--else">
          <span className="split-stat-num">{formatPct(39.6, lang)}</span>
          <span className="split-stat-label">
            {s.statB}<sup>*</sup>
          </span>
        </div>
      </div>

      <div className="split-bar" role="img" aria-label={`${s.statA} 60.4% / ${s.statB} 39.6%`}>
        <div className="split-seg split-seg--gm" style={{ width: "60.4%" }} data-testid="split-gm">
          <span className="split-seg-inner">{s.labelA}</span>
        </div>
        <div className="split-seg split-seg--else" style={{ width: "39.6%" }} data-testid="split-else">
          <span className="split-seg-inner">{s.labelB}</span>
        </div>
      </div>

      <p className="footnote">
        {s.footnote[0]}
        <em>{s.footnote[1]}</em>
      </p>
    </section>
  );
}

function IdentityBreakdown() {
  const { t, lang } = useLang();
  const i = t.identity;
  const maxPct = useMemo(() => Math.max(...DATA.identities.map((x) => x.pct)), []);
  return (
    <section className="identity-section" data-testid="identity-section">
      <Kicker num="03">{i.kicker}</Kicker>
      <h2 className="section-h">
        {i.heading1}
        <em>{i.heading2}</em>
      </h2>

      <ul className="identity-list" data-testid="identity-list">
        {DATA.identities.map((row) => {
          const label = i.labels[row.key];
          const barWidth = `${(row.pct / maxPct) * 100}%`;
          return (
            <li key={row.key} className="identity-row" data-testid={`identity-row-${row.key}`}>
              <div className="id-head">
                <span className="id-chip" style={{ background: row.color }} />
                <span className="id-label">{label.name}</span>
                <span className="id-short">({label.short})</span>
              </div>
              <div className="id-bar-track">
                <div className="id-bar-fill" style={{ width: barWidth, background: row.color }} />
                <span className="id-pct">{formatPct(row.pct, lang)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="footnote">{i.footnote}</p>
    </section>
  );
}

function EthnicitySection() {
  const { t, lang } = useLang();
  const e = t.ethnicity;
  return (
    <section className="ethnicity-section" data-testid="ethnicity-section">
      <Kicker num="04">{e.kicker}</Kicker>
      <h2 className="section-h">
        {e.heading1}
        <em>{e.heading2}</em>
      </h2>

      <div className="eth-bar" role="img" aria-label={`${e.white} 53.3% / ${e.bipoc} 46.7%`}>
        <div className="eth-seg eth-seg--white" style={{ width: `${DATA.ethnicity.white}%` }} data-testid="eth-white">
          <span className="eth-seg-pct">{formatPct(DATA.ethnicity.white, lang)}</span>
          <span className="eth-seg-label">{e.white}</span>
        </div>
        <div className="eth-seg eth-seg--bipoc" style={{ width: `${DATA.ethnicity.bipoc}%` }} data-testid="eth-bipoc">
          <span className="eth-seg-pct">{formatPct(DATA.ethnicity.bipoc, lang)}</span>
          <span className="eth-seg-label">{e.bipoc}</span>
        </div>
      </div>

      <aside className="callout" data-testid="white-gm-callout">
        <span className="callout-eyebrow">{e.calloutEyebrow}</span>
        <div className="callout-body">
          <span className="callout-number">≈ {lang === "fr" ? "35\u00a0%" : "35%"}</span>
          <p className="callout-text">
            {e.calloutText[0]}
            <strong>{e.calloutText[1]}</strong>
            {e.calloutText[2]}
            <strong>{e.calloutText[3]}</strong>
            {e.calloutText[4]}
            <em>{e.calloutText[5]}</em>
          </p>
        </div>
      </aside>
    </section>
  );
}

function MethodologySection() {
  const { t } = useLang();
  const m = t.methodology;
  return (
    <section className="methodology-section" data-testid="methodology-section">
      <Kicker num="05">{m.kicker}</Kicker>
      <h2 className="section-h">
        {m.heading1}
        <em>{m.heading2}</em>
      </h2>

      <p className="methodology-intro">{m.intro}</p>

      <div className="methodology-grid">
        {m.sections.map((sec, idx) => (
          <article
            key={sec.num}
            className="method-card"
            data-testid={`method-card-${sec.num.toLowerCase()}`}
          >
            <header className="method-head">
              <span className="method-num">{sec.num}</span>
              <h3 className="method-title">{sec.title}</h3>
            </header>
            <p className="method-body">{sec.body}</p>
          </article>
        ))}
      </div>

      <div className="sources" data-testid="sources">
        <h4 className="sources-title">{m.sources.title}</h4>
        <ul className="sources-list">
          {m.sources.items.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      <p className="corrections">
        <span className="corrections-label">{m.corrections.label}.</span>{" "}
        {m.corrections.text}
        <a href="mailto:info@wearelcv.ca" className="corrections-email">
          {m.corrections.emailLabel}
        </a>
        .
      </p>
    </section>
  );
}

function MissionSection() {
  const { t } = useLang();
  const m = t.mission;
  return (
    <section className="mission-section" data-testid="mission-section">
      <Kicker num="06">{m.kicker}</Kicker>
      <div className="mission-grid">
        <div className="mission-copy">
          <h3 className="mission-h">
            {m.heading1}
            <em>{m.heading2}</em>.
          </h3>
          <p className="mission-p">
            {m.body[0]}
            <strong>{m.body[1]}</strong>
            {m.body[2]}
            <strong>{m.body[3]}</strong>
            {m.body[4]}
            <strong>{m.body[5]}</strong>
            {m.body[6]}
            <strong>{m.body[7]}</strong>
            {m.body[8]}
          </p>
        </div>
        <aside className="mission-mark" aria-hidden="true">
          <span className="mark-label">{m.markLabel}</span>
          <span className="mark-word">LCV</span>
          <span className="mark-handle">{m.markHandle}</span>
        </aside>
      </div>
    </section>
  );
}

function ContactBar() {
  const { t } = useLang();
  const c = t.contact;
  const { instagram, facebook, email } = DATA.links;
  return (
    <section className="contact-bar" data-testid="contact-bar">
      <div className="contact-item">
        <span className="c-label">{c.instagram}</span>
        <a className="c-link" href={instagram.url} target="_blank" rel="noreferrer" data-testid="link-instagram">
          {instagram.handle}
        </a>
      </div>
      <div className="contact-item">
        <span className="c-label">{c.facebook}</span>
        <a className="c-link" href={facebook.url} target="_blank" rel="noreferrer" data-testid="link-facebook">
          {facebook.handle}
        </a>
      </div>
      <div className="contact-item">
        <span className="c-label">{c.email}</span>
        <a className="c-link" href={email.url} data-testid="link-email">
          {email.handle}
        </a>
      </div>
    </section>
  );
}

function Disclaimer() {
  const { t } = useLang();
  const d = t.disclaimer;
  return (
    <footer className="disclaimer" data-testid="disclaimer">
      <p className="disclaimer-text">
        <strong>{d.label}</strong>
        {d.body}
      </p>
      <p className="copyright">{d.copyright}</p>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Full Audit page                                                           */
/* -------------------------------------------------------------------------- */

const FullAuditPage = React.forwardRef(function FullAuditPage(_props, ref) {
  const { t, lang } = useLang();
  return (
    <main className="magazine" ref={ref} data-testid="magazine">
      <Masthead />
      <HeroStat />
      <SplitBar />
      <IdentityBreakdown />
      <EthnicitySection />
      <MethodologySection />
      <MissionSection />
      <ShareCaption lang={lang} />
      <AppendixTable t={t} lang={lang} />
      <ContactBar />
      <Disclaimer />
    </main>
  );
});

/* -------------------------------------------------------------------------- */
/*  Story page  (renders StoryCard at native 1080x1920 with scale-to-fit)     */
/* -------------------------------------------------------------------------- */

function StoryPage({ storyRef }) {
  const { t, lang } = useLang();
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  const recompute = useCallback(() => {
    if (!wrapRef.current) return;
    const { clientWidth, clientHeight } = wrapRef.current;
    const sx = clientWidth / STORY_WIDTH;
    const sy = clientHeight / STORY_HEIGHT;
    setScale(Math.min(sx, sy, 1));
  }, []);

  useEffect(() => {
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [recompute]);

  return (
    <main className="story-page" data-testid="story-page">
      <div className="story-meta">
        <span className="story-meta-label">IG STORY · 1080 × 1920</span>
        <span className="story-meta-dim">
          {lang === "fr"
            ? "Aperçu mis à l'échelle · le téléchargement est à la taille native."
            : "Preview is scaled · PNG downloads at native size."}
        </span>
      </div>
      <div className="story-stage" ref={wrapRef}>
        <div
          className="story-scale"
          style={{
            width: STORY_WIDTH,
            height: STORY_HEIGHT,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <StoryCard t={t} locale={lang} ref={storyRef} />
        </div>
      </div>
    </main>
  );
}

function FeedPage({ feedRef }) {
  const { t, lang } = useLang();
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  const recompute = useCallback(() => {
    if (!wrapRef.current) return;
    const { clientWidth, clientHeight } = wrapRef.current;
    const sx = clientWidth / FEED_SIZE;
    const sy = clientHeight / FEED_SIZE;
    setScale(Math.min(sx, sy, 1));
  }, []);

  useEffect(() => {
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [recompute]);

  return (
    <main className="story-page" data-testid="feed-page">
      <div className="story-meta">
        <span className="story-meta-label">IG FEED · 1080 × 1080</span>
        <span className="story-meta-dim">
          {lang === "fr"
            ? "Aperçu mis à l'échelle · le téléchargement est à la taille native."
            : "Preview is scaled · PNG downloads at native size."}
        </span>
      </div>
      <div className="story-stage story-stage--square" ref={wrapRef}>
        <div
          className="story-scale"
          style={{
            width: FEED_SIZE,
            height: FEED_SIZE,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <FeedCard t={t} locale={lang} ref={feedRef} />
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shell — mounts toolbar + routes + manages PNG download                    */
/* -------------------------------------------------------------------------- */

function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const fullRef = useRef(null);
  const storyRef = useRef(null);
  const feedRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    document.body.classList.add("lcv-body");
    return () => document.body.classList.remove("lcv-body");
  }, []);

  const handleDownload = useCallback(async () => {
    const isStory = pathname.startsWith("/story");
    const isFeed = pathname.startsWith("/feed");
    const node = isStory ? storyRef.current : isFeed ? feedRef.current : fullRef.current;
    if (!node) return;
    setDownloading(true);
    try {
      // Wait for all web fonts to be fully loaded so the PNG uses editorial type
      if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      let filename;
      if (isStory) filename = "we-are-lcv-booking-gap-story-1080x1920.png";
      else if (isFeed) filename = "we-are-lcv-booking-gap-feed-1080x1080.png";
      else filename = "we-are-lcv-booking-gap-full-audit.png";

      const opts = {
        cacheBust: true,
        pixelRatio: isStory || isFeed ? 1 : 2,
        backgroundColor: "#292929",
        style: { transform: "none" },
      };
      if (isStory) {
        opts.width = STORY_WIDTH;
        opts.height = STORY_HEIGHT;
      } else if (isFeed) {
        opts.width = FEED_SIZE;
        opts.height = FEED_SIZE;
      }

      const dataUrl = await toPng(node, opts);
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("PNG export failed:", err);
      alert(`Sorry — PNG export failed: ${err && err.message ? err.message : err}`);
    } finally {
      setDownloading(false);
    }
  }, [pathname]);

  // Keyboard shortcuts: L (lang), D (download), F (feed), S (story), A (full audit)
  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target;
      const tag = target && target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (target && target.isContentEditable)) {
        return;
      }
      const key = (e.key || "").toLowerCase();
      if (key === "l") {
        e.preventDefault();
        setLang(lang === "en" ? "fr" : "en");
      } else if (key === "d") {
        e.preventDefault();
        handleDownload();
      } else if (key === "f") {
        e.preventDefault();
        navigate("/feed");
      } else if (key === "s") {
        e.preventDefault();
        navigate("/story");
      } else if (key === "a") {
        e.preventDefault();
        navigate("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lang, setLang, navigate, handleDownload]);

  return (
    <div className="page" data-testid="page-root">
      <div className="grain" aria-hidden="true" />
      <Toolbar onDownload={handleDownload} downloading={downloading} />
      <Routes>
        <Route path="/" element={<FullAuditPage ref={fullRef} />} />
        <Route path="/story" element={<StoryPage storyRef={storyRef} />} />
        <Route path="/feed" element={<FeedPage feedRef={feedRef} />} />
        <Route path="*" element={<FullAuditPage ref={fullRef} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LangProvider>
          <AppShell />
        </LangProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
