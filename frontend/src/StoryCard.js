import React from "react";
import { formatPct } from "./i18n";

/* --------------------------------------------------------------------------
 * StoryCard — 1080 x 1920 IG-story portrait variant.
 * Rendered at native size, then visually scaled down via CSS transform for
 * the on-screen preview. PNG export captures native 1080x1920 with 1x DPR.
 * ----------------------------------------------------------------------- */

const IDENTITIES = [
  { key: "gm",  pct: 60.4, color: "#4A15ED" },
  { key: "qnb", pct: 17.8, color: "#70E580" },
  { key: "t",   pct: 9.5,  color: "#9495E6" },
  { key: "l",   pct: 8.6,  color: "#F9BBE6" },
  { key: "h",   pct: 6.8,  color: "#FF3C00" },
  { key: "sap", pct: 2.9,  color: "#9CF6F6" },
];

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

const StoryCard = React.forwardRef(function StoryCard({ t, locale }, ref) {
  const s = t.story;
  const maxPct = 60.4;

  return (
    <div className="story-card" ref={ref} data-testid="story-card">
      {/* Top meta bar */}
      <div className="sc-topbar">
        <span>{s.topLeft}</span>
        <span>{s.topRight}</span>
      </div>

      <div className="sc-body">
        {/* Title */}
        <h1 className="sc-title">
          <span className="sc-title-row1">{s.title}</span>
          <span className="sc-title-row2">
            <em>{s.titleAccent}</em>
          </span>
        </h1>

        {/* Hero */}
        <div className="sc-hero">
          <span className="sc-hero-num">
            {s.heroNum}
            <span className="sc-hero-pct">%</span>
          </span>
          <span className="sc-hero-label">{s.heroPctLabel}</span>
        </div>

        {/* Split bar */}
        <div className="sc-split">
          <div className="sc-split-stats">
            <div className="sc-ss">
              <span className="sc-ss-num sc-ss-num--gm">{formatPct(60.4, locale)}</span>
              <span className="sc-ss-lbl">{s.splitA}</span>
            </div>
            <div className="sc-ss">
              <span className="sc-ss-num sc-ss-num--else">{formatPct(39.6, locale)}</span>
              <span className="sc-ss-lbl">{s.splitB}</span>
            </div>
          </div>
          <div className="sc-split-bar">
            <div className="sc-split-seg sc-split-seg--gm" style={{ width: "60.4%" }} />
            <div className="sc-split-seg sc-split-seg--else" style={{ width: "39.6%" }} />
          </div>
        </div>

        {/* Identity breakdown */}
        <div className="sc-section">
          <h2 className="sc-h">{s.breakdownHeading}</h2>
          <ul className="sc-id-list">
            {IDENTITIES.map((row) => {
              const label = t.identity.labels[row.key];
              return (
                <li className="sc-id-row" key={row.key}>
                  <div className="sc-id-head">
                    <span className="sc-id-chip" style={{ background: row.color }} />
                    <span className="sc-id-name">{label.name}</span>
                    <span className="sc-id-pct">{formatPct(row.pct, locale)}</span>
                  </div>
                  <div className="sc-id-track">
                    <div
                      className="sc-id-fill"
                      style={{ width: `${(row.pct / maxPct) * 100}%`, background: row.color }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Ethnicity */}
        <div className="sc-section">
          <h2 className="sc-h">{s.ethnicityHeading}</h2>
          <div className="sc-eth">
            <div className="sc-eth-seg sc-eth-seg--white" style={{ width: "53.3%" }}>
              <span className="sc-eth-pct">{formatPct(53.3, locale)}</span>
              <span className="sc-eth-lbl">{s.white}</span>
            </div>
            <div className="sc-eth-seg sc-eth-seg--bipoc" style={{ width: "46.7%" }}>
              <span className="sc-eth-pct">{formatPct(46.7, locale)}</span>
              <span className="sc-eth-lbl">{s.bipoc}</span>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="sc-callout">
          <span className="sc-callout-num">{s.calloutPct}</span>
          <span className="sc-callout-text">{s.calloutText}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="sc-footer">
        <span className="sc-footer-handle">{s.footer}</span>
        <span className="sc-footer-disclaimer">{s.disclaimer}</span>
      </div>
    </div>
  );
});

export default StoryCard;
