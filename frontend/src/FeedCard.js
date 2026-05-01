import React from "react";
import { formatPct } from "./i18n";

/* --------------------------------------------------------------------------
 * FeedCard — 1080x1080 IG feed/grid variant.
 * Square canvas optimised for feed posts. Condensed single-message layout.
 * ----------------------------------------------------------------------- */

export const FEED_SIZE = 1080;

const FeedCard = React.forwardRef(function FeedCard({ t, locale }, ref) {
  const s = t.story;
  return (
    <div className="feed-card" ref={ref} data-testid="feed-card">
      <div className="fc-topbar">
        <span>{s.topLeft}</span>
        <span>{s.topRight}</span>
      </div>

      <div className="fc-body">
        <h1 className="fc-title">
          <span className="fc-title-row1">{s.title}</span>
          <span className="fc-title-row2">
            <em>{s.titleAccent}</em>
          </span>
        </h1>

        <div className="fc-hero-row">
          <div className="fc-hero-num-wrap">
            <span className="fc-hero-num">
              {s.heroNum}
              <span className="fc-hero-pct">%</span>
            </span>
            <span className="fc-hero-num-shadow" aria-hidden="true">
              {s.heroNum}
              <span className="fc-hero-pct">%</span>
            </span>
          </div>
          <div className="fc-hero-meta">
            <span className="fc-hero-label">{s.heroPctLabel}</span>
            <span className="fc-hero-sub">
              {locale === "fr"
                ? "sur 409 artistes engag\u00e9\u00b7e\u00b7s par Pride Toronto 2025."
                : "of 409 performers booked by Pride Toronto 2025."}
            </span>
          </div>
        </div>

        <div className="fc-split-bar">
          <div className="fc-split-seg fc-split-seg--gm" style={{ width: "60.4%" }}>
            <span>{s.splitA} — {formatPct(60.4, locale)}</span>
          </div>
          <div className="fc-split-seg fc-split-seg--else" style={{ width: "39.6%" }}>
            <span>{formatPct(39.6, locale)}</span>
          </div>
        </div>

        <div className="fc-callout">
          <span className="fc-callout-num">{s.calloutPct}</span>
          <span className="fc-callout-text">
            {locale === "fr"
              ? "de la programmation étaient des hommes gais blancs — plus que toutes les autres femmes r\u00e9unies."
              : "of the lineup were White Gay Men — more than every other femme identity combined."}
          </span>
        </div>
      </div>

      <div className="fc-footer">
        <span className="fc-footer-handle">@wearelcv</span>
        <span className="fc-footer-mid">
          {locale === "fr" ? "Audit communautaire indépendant" : "Independent Community Audit"}
        </span>
        <span className="fc-footer-right">wearelcv.ca</span>
      </div>
    </div>
  );
});

export default FeedCard;
