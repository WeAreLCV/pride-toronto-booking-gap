import { useEffect, useMemo } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ----------------------------------------------------------------------------
 * Pride Toronto 2025: The Booking Gap
 * Independent community audit by We Are LCV (@wearelcv)
 *
 * All data below is editable in one place.
 * Numbers sourced from the 409-performer lineup audit provided by We Are LCV.
 * NOTE: Identity percentages can sum above 100% because some performers
 * identify across multiple categories (e.g. Queer + Lesbian). Each bar
 * represents the share of the 409-performer lineup that includes that identity.
 * ------------------------------------------------------------------------- */

const DATA = {
  brand: {
    bg: "#292929",
    text: "#E4E2DD",
    accent: "#E5AFFB",
  },
  headline: {
    totalPerformers: 409,
    gayMenPct: 60.4,
    everyoneElsePct: 39.6,
    whiteGayMenPct: 35,
  },
  identities: [
    { key: "gm",   label: "Gay Male",          short: "GM / M",   pct: 60.4, color: "#4A15ED" },
    { key: "qnb",  label: "Queer / Non-Binary", short: "Q / NB",   pct: 17.8, color: "#70E580" },
    { key: "t",    label: "Trans",              short: "TM / TW / T", pct: 9.5,  color: "#9495E6" },
    { key: "l",    label: "Lesbian",            short: "L / F",    pct: 8.6,  color: "#F9BBE6" },
    { key: "h",    label: "Heterosexual / N·A", short: "H / N·A", pct: 6.8,  color: "#FF3C00" },
    { key: "sap",  label: "Sapphic / Pan / Bi", short: "SAP / Bi", pct: 2.9,  color: "#9CF6F6" },
  ],
  ethnicity: {
    white: 53.3,
    bipoc: 46.7,
  },
  links: {
    instagram: { handle: "@wearelcv",   url: "https://www.instagram.com/wearelcv" },
    facebook:  { handle: "WeAreLcv",    url: "https://www.facebook.com/WeAreLcv" },
    email:     { handle: "info@wearelcv.ca", url: "mailto:info@wearelcv.ca" },
    bio:       { handle: "bio.site/LesbianCvisibility", url: "https://bio.site/LesbianCvisibility" },
  },
};

/* -------------------------------------------------------------------------- */

function Masthead() {
  return (
    <header className="masthead" data-testid="masthead">
      <div className="masthead-top">
        <span className="eyebrow">Independent Community Audit</span>
        <span className="eyebrow eyebrow--right">Vol. 01 · Summer 2025</span>
      </div>
      <hr className="hair" />
      <h1 className="display-title" data-testid="page-title">
        <span className="title-row-1">The Booking</span>
        <span className="title-row-2">
          <em>Gap</em><span className="title-dot">.</span>
        </span>
      </h1>
      <p className="deck">
        Pride Toronto 2025 — <em>who actually got on the stage?</em>
      </p>
      <div className="byline">
        <span><b>409</b> performers analyzed</span>
        <span className="byline-dot">·</span>
        <span>Compiled from public 2025 lineup announcements</span>
        <span className="byline-dot">·</span>
        <span>by <b>@wearelcv</b></span>
      </div>
    </header>
  );
}

function HeroStat() {
  return (
    <section className="hero-stat" data-testid="hero-stat">
      <div className="kicker">
        <span className="kicker-num">01</span>
        <span className="kicker-line" />
        <span className="kicker-text">The Headline</span>
      </div>

      <div className="hero-grid">
        <div className="hero-number-wrap">
          <span className="hero-number" data-testid="hero-percentage">
            60.4<span className="hero-pct">%</span>
          </span>
          <span className="hero-number-shadow" aria-hidden="true">
            60.4<span className="hero-pct">%</span>
          </span>
        </div>

        <div className="hero-label-wrap">
          <span className="hero-were">were</span>
          <span className="hero-identity" data-testid="hero-label">
            Gay Men<span className="hero-dot">.</span>
          </span>
          <p className="hero-explainer">
            Of the <strong>409 performers</strong> booked across Pride Toronto 2025's
            public lineup, <mark className="accent-mark">60.4% were Gay Men</mark> —
            the single largest identity bloc. Lesbians, Trans performers,
            Sapphic&nbsp;/&nbsp;Pan&nbsp;/&nbsp;Bi artists, Queer&nbsp;/&nbsp;Non-Binary folks and
            Heterosexual allies <em>combined</em> made up just
            <strong> 39.6%</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

function SplitBar() {
  return (
    <section className="split-section" data-testid="split-section">
      <div className="kicker">
        <span className="kicker-num">02</span>
        <span className="kicker-line" />
        <span className="kicker-text">The Split</span>
      </div>

      <h2 className="section-h">
        Gay&nbsp;Men <em>vs.</em> Everyone&nbsp;Else.
      </h2>

      <div className="split-stats">
        <div className="split-stat split-stat--gm">
          <span className="split-stat-num">60.4%</span>
          <span className="split-stat-label">Gay Men</span>
        </div>
        <div className="split-stat split-stat--else">
          <span className="split-stat-num">39.6%</span>
          <span className="split-stat-label">Everyone Else<sup>*</sup></span>
        </div>
      </div>

      <div className="split-bar" role="img" aria-label="60.4% Gay Men versus 39.6% everyone else">
        <div
          className="split-seg split-seg--gm"
          style={{ width: "60.4%" }}
          data-testid="split-gm"
        >
          <span className="split-seg-inner">GAY&nbsp;MEN</span>
        </div>
        <div
          className="split-seg split-seg--else"
          style={{ width: "39.6%" }}
          data-testid="split-else"
        >
          <span className="split-seg-inner">EVERYONE ELSE</span>
        </div>
      </div>

      <p className="footnote">
        <sup>*</sup> Lesbians · Trans · Sapphic&nbsp;/&nbsp;Pan&nbsp;/&nbsp;Bi ·
        Queer&nbsp;/&nbsp;Non-Binary · Heterosexual&nbsp;/&nbsp;N·A — <em>combined.</em>
      </p>
    </section>
  );
}

function IdentityBreakdown() {
  const maxPct = useMemo(
    () => Math.max(...DATA.identities.map((i) => i.pct)),
    []
  );

  return (
    <section className="identity-section" data-testid="identity-section">
      <div className="kicker">
        <span className="kicker-num">03</span>
        <span className="kicker-line" />
        <span className="kicker-text">The Full Breakdown</span>
      </div>

      <h2 className="section-h">
        Six identity groups. <em>One stage.</em>
      </h2>

      <ul className="identity-list" data-testid="identity-list">
        {DATA.identities.map((row) => {
          const barWidth = `${(row.pct / maxPct) * 100}%`;
          return (
            <li key={row.key} className="identity-row" data-testid={`identity-row-${row.key}`}>
              <div className="id-head">
                <span className="id-chip" style={{ background: row.color }} />
                <span className="id-label">{row.label}</span>
                <span className="id-short">({row.short})</span>
              </div>
              <div className="id-bar-track">
                <div
                  className="id-bar-fill"
                  style={{ width: barWidth, background: row.color }}
                />
                <span className="id-pct">{row.pct}%</span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="footnote">
        Some performers identify with more than one category (e.g. Queer +
        Lesbian). Each bar represents the share of the 409-performer lineup
        that <em>includes</em> that identity, so totals can exceed 100%. Bars are
        scaled relative to the largest identity for visual comparison.
      </p>
    </section>
  );
}

function EthnicitySection() {
  return (
    <section className="ethnicity-section" data-testid="ethnicity-section">
      <div className="kicker">
        <span className="kicker-num">04</span>
        <span className="kicker-line" />
        <span className="kicker-text">The Ethnicity Split</span>
      </div>

      <h2 className="section-h">
        Who is on stage, <em>by ethnicity.</em>
      </h2>

      <div className="eth-bar" role="img" aria-label="53.3% White versus 46.7% BIPOC">
        <div
          className="eth-seg eth-seg--white"
          style={{ width: `${DATA.ethnicity.white}%` }}
          data-testid="eth-white"
        >
          <span className="eth-seg-pct">{DATA.ethnicity.white}%</span>
          <span className="eth-seg-label">White</span>
        </div>
        <div
          className="eth-seg eth-seg--bipoc"
          style={{ width: `${DATA.ethnicity.bipoc}%` }}
          data-testid="eth-bipoc"
        >
          <span className="eth-seg-pct">{DATA.ethnicity.bipoc}%</span>
          <span className="eth-seg-label">BIPOC</span>
        </div>
      </div>

      <aside className="callout" data-testid="white-gm-callout">
        <span className="callout-eyebrow">Most-booked identity × ethnicity</span>
        <div className="callout-body">
          <span className="callout-number">≈ 35%</span>
          <p className="callout-text">
            of the <strong>entire 409-performer lineup</strong> were
            <strong> White Gay Men</strong>, alone — <em>more than Lesbians,
            Trans, Sapphic and Heterosexual women combined.</em>
          </p>
        </div>
      </aside>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="mission-section" data-testid="mission-section">
      <div className="kicker">
        <span className="kicker-num">05</span>
        <span className="kicker-line" />
        <span className="kicker-text">Why This Matters</span>
      </div>

      <div className="mission-grid">
        <div className="mission-copy">
          <h3 className="mission-h">
            About <em>We Are LCV</em>.
          </h3>
          <p className="mission-p">
            LCV celebrates the rich diversity of <strong>lesbian creatives</strong> across
            all artistic fields, with a focus on the arts, dance, music,
            fashion, and beauty+ industries. Our mission is to
            <strong> amplify talent</strong>,
            <strong> break stereotypes</strong>, and
            <strong> unite the community</strong> through impactful events.
          </p>
        </div>

        <aside className="mission-mark" aria-hidden="true">
          <span className="mark-label">Audit by</span>
          <span className="mark-word">LCV</span>
          <span className="mark-handle">@wearelcv</span>
        </aside>
      </div>
    </section>
  );
}

function ContactBar() {
  const { instagram, facebook, email } = DATA.links;
  return (
    <section className="contact-bar" data-testid="contact-bar">
      <div className="contact-item">
        <span className="c-label">Instagram</span>
        <a
          className="c-link"
          href={instagram.url}
          target="_blank"
          rel="noreferrer"
          data-testid="link-instagram"
        >
          {instagram.handle}
        </a>
      </div>
      <span className="contact-div" aria-hidden="true" />
      <div className="contact-item">
        <span className="c-label">Facebook</span>
        <a
          className="c-link"
          href={facebook.url}
          target="_blank"
          rel="noreferrer"
          data-testid="link-facebook"
        >
          {facebook.handle}
        </a>
      </div>
      <span className="contact-div" aria-hidden="true" />
      <div className="contact-item">
        <span className="c-label">Email</span>
        <a
          className="c-link"
          href={email.url}
          data-testid="link-email"
        >
          {email.handle}
        </a>
      </div>
    </section>
  );
}

function Disclaimer() {
  return (
    <footer className="disclaimer" data-testid="disclaimer">
      <p className="disclaimer-text">
        <strong>Disclaimer.</strong> Independent community audit by We Are LCV.
        Not affiliated with or funded by Pride Toronto. Data compiled from
        public 2025 lineup announcements. Pride Toronto removed their 2025
        lineup page on May&nbsp;1,&nbsp;2025.
      </p>
      <p className="copyright">
        © 2025 We Are LCV · All rights reserved.
      </p>
    </footer>
  );
}

const Home = () => {
  useEffect(() => {
    document.body.classList.add("lcv-body");
    return () => document.body.classList.remove("lcv-body");
  }, []);

  return (
    <div className="page" data-testid="page-root">
      <div className="grain" aria-hidden="true" />
      <main className="magazine">
        <Masthead />
        <HeroStat />
        <SplitBar />
        <IdentityBreakdown />
        <EthnicitySection />
        <MissionSection />
        <ContactBar />
        <Disclaimer />
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
