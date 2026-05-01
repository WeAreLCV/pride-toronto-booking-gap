import React, { useState, useCallback } from "react";

/* --------------------------------------------------------------------------
 * ShareCaption — copy-ready IG/Twitter/LinkedIn captions in EN/FR.
 * Three flavours: Instagram (long-form w/ hashtags), Twitter/X (≤280 chars),
 * LinkedIn (professional tone).  Clipboard-first with visible feedback.
 * ----------------------------------------------------------------------- */

const CAPTIONS = {
  en: {
    kicker: "Share The Booking Gap",
    heading1: "Copy-paste captions. ",
    heading2: "Ready to post.",
    intro:
      "Pre-written captions for Instagram, Twitter/X and LinkedIn — tuned to the exact character limits and tone of each platform. Three clicks to share.",
    labels: {
      instagram: "Instagram",
      twitter: "Twitter / X",
      linkedin: "LinkedIn",
    },
    copy: "Copy",
    copied: "Copied",
    failed: "Press Ctrl/\u2318 + C",
    chars: "chars",
    instagram: `\u{1F3A4} THE BOOKING GAP \u2014 Pride Toronto 2025.

Of the 409 performers booked across Pride Toronto's 2025 public lineup, 60.4% were Gay Men.

Lesbians, Trans performers, Sapphic/Pan/Bi artists, Queer & Non-Binary folks, and Heterosexual allies COMBINED made up just 39.6%.

\u{1F308} White Gay Men alone = \u224835% of the entire lineup \u2014 more than Lesbians, Trans, Sapphic and Heterosexual women combined.

An independent community audit by @wearelcv. Not affiliated with or funded by Pride Toronto. Full breakdown, methodology and the 421-performer dataset at wearelcv.ca.

#WeAreLCV #PrideToronto2025 #LesbianVisibility #TheBookingGap #LGBTQ2S #BIPOC #TransVisibility #QueerFutures #PayEquity #CommunityAudit #TorontoPride #WeExist`,
    twitter: `THE BOOKING GAP \u2014 Pride Toronto 2025.

60.4% of the 409 booked performers were Gay Men. Everyone else \u2014 Lesbians, Trans, Sapphic, Queer/NB, Hetero allies COMBINED \u2014 was 39.6%.

White Gay Men alone = \u224835% of the lineup.

Independent audit by @wearelcv. wearelcv.ca

#PrideToronto2025 #WeAreLCV`,
    linkedin: `THE BOOKING GAP \u2014 Pride Toronto 2025

We Are LCV just published an independent community audit of Pride Toronto's 2025 performer lineup. Of 409 publicly announced performers:

\u2022 60.4% were Gay Men
\u2022 39.6% were Lesbians + Trans + Sapphic/Pan/Bi + Queer/Non-Binary + Heterosexual performers COMBINED
\u2022 White Gay Men alone = \u224835% of the entire lineup \u2014 more than Lesbians, Trans, Sapphic and Heterosexual women combined
\u2022 53.3% White / 46.7% BIPOC

Why this matters: Pride Toronto has never publicly disclosed individual artist booking fees. Without fee transparency, we cannot verify pay equity across identities. This audit is based entirely on public lineup announcements, KPMG audit findings, and federal statements.

Read the full methodology, sources, and the 421-performer dataset at wearelcv.ca.

#LGBTQ #DiversityEquityInclusion #Arts #Pride #LesbianVisibility #CommunityAudit`,
  },
  fr: {
    kicker: "Partager L'\u00c9cart",
    heading1: "L\u00e9gendes pr\u00eates \u00e0 coller. ",
    heading2: "Pr\u00eates \u00e0 publier.",
    intro:
      "L\u00e9gendes pr\u00e9-r\u00e9dig\u00e9es pour Instagram, Twitter/X et LinkedIn \u2014 ajust\u00e9es aux limites de caract\u00e8res et au ton de chaque plateforme. Trois clics pour partager.",
    labels: {
      instagram: "Instagram",
      twitter: "Twitter / X",
      linkedin: "LinkedIn",
    },
    copy: "Copier",
    copied: "Copi\u00e9",
    failed: "Utilisez Ctrl/\u2318 + C",
    chars: "car.",
    instagram: `\u{1F3A4} L'\u00c9CART DE PROGRAMMATION \u2014 Pride Toronto 2025.

Sur les 409 artistes engag\u00e9\u00b7e\u00b7s dans la programmation publique de Pride Toronto 2025, 60,4\u00a0% \u00e9taient des hommes gais.

Lesbiennes, personnes trans, artistes saphiques/pan/bi, queer & non binaires et alli\u00e9\u00b7e\u00b7s h\u00e9t\u00e9rosexuel\u00b7le\u00b7s RASSEMBL\u00c9\u00b7E\u00b7S ne repr\u00e9sentaient que 39,6\u00a0%.

\u{1F308} Hommes gais blancs \u00e0 eux seuls = \u224835\u00a0% de toute la programmation \u2014 plus que les lesbiennes, les personnes trans, les saphiques et les femmes h\u00e9t\u00e9rosexuelles r\u00e9unies.

Audit communautaire ind\u00e9pendant par @wearelcv. Non affili\u00e9 \u00e0 Pride Toronto. M\u00e9thodologie compl\u00e8te, sources et jeu de donn\u00e9es de 421\u00a0artistes \u00e0 wearelcv.ca.

#WeAreLCV #FiertéToronto2025 #VisibilitéLesbienne #LCV #LGBTQ2S #BIPOC #VisibilitéTrans #TorontoPride #ÉquitéSalariale #AuditCommunautaire`,
    twitter: `L'\u00c9CART DE PROGRAMMATION \u2014 Pride Toronto 2025.

60,4\u00a0% des 409 artistes engag\u00e9\u00b7e\u00b7s \u00e9taient des hommes gais. Les autres \u2014 lesbiennes, trans, saphiques, queer/NB, h\u00e9t\u00e9ro RASSEMBL\u00c9\u00b7E\u00b7S \u2014 n'\u00e9taient que 39,6\u00a0%.

Hommes gais blancs seuls = \u224835\u00a0% de la programmation.

Audit ind\u00e9pendant par @wearelcv. wearelcv.ca

#FiertéToronto2025 #WeAreLCV`,
    linkedin: `L'\u00c9CART DE PROGRAMMATION \u2014 Pride Toronto 2025

We Are LCV publie un audit communautaire ind\u00e9pendant de la programmation 2025 de Pride Toronto. Sur 409 artistes publiquement annonc\u00e9\u00b7e\u00b7s\u00a0:

\u2022 60,4\u00a0% \u00e9taient des hommes gais
\u2022 39,6\u00a0% \u00e9taient des lesbiennes + personnes trans + saphiques/pan/bi + queer/non binaires + alli\u00e9\u00b7e\u00b7s h\u00e9t\u00e9ro RASSEMBL\u00c9\u00b7E\u00b7S
\u2022 Hommes gais blancs seuls = \u224835\u00a0% de la programmation \u2014 plus que les lesbiennes, les trans, les saphiques et les femmes h\u00e9t\u00e9ro r\u00e9unies
\u2022 53,3\u00a0% Blanc\u00b7he\u00b7s / 46,7\u00a0% PANDC

Pourquoi \u00e7a compte\u00a0: Pride Toronto n'a jamais divulgu\u00e9 publiquement les cachets individuels des artistes. Sans transparence sur les cachets, impossible de v\u00e9rifier l'\u00e9quit\u00e9 salariale entre identit\u00e9s. Cet audit s'appuie uniquement sur les annonces publiques, les conclusions de l'audit KPMG et les d\u00e9clarations f\u00e9d\u00e9rales.

M\u00e9thodologie compl\u00e8te, sources et jeu de donn\u00e9es de 421\u00a0artistes\u00a0: wearelcv.ca

#LGBTQ #DiversitéÉquitéInclusion #Arts #Fierté #VisibilitéLesbienne #AuditCommunautaire`,
  },
};

const TWITTER_LIMIT = 280;

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

export default function ShareCaption({ lang }) {
  const c = CAPTIONS[lang] || CAPTIONS.en;
  const [state, setState] = useState({ which: null, phase: "idle" });

  const onCopy = useCallback(async (which) => {
    const text = c[which];
    setState({ which, phase: "pending" });
    const ok = await copyText(text);
    setState({ which, phase: ok ? "done" : "failed" });
    setTimeout(() => setState({ which: null, phase: "idle" }), 2200);
  }, [c]);

  const blocks = [
    { key: "instagram", text: c.instagram, badge: null },
    { key: "twitter",   text: c.twitter,   badge: `${c.twitter.length} / ${TWITTER_LIMIT} ${c.chars}`, over: c.twitter.length > TWITTER_LIMIT },
    { key: "linkedin",  text: c.linkedin,  badge: null },
  ];

  return (
    <section className="share-section" data-testid="share-section">
      <div className="kicker">
        <span className="kicker-num">08</span>
        <span className="kicker-line" />
        <span className="kicker-text">{c.kicker}</span>
      </div>

      <h2 className="section-h">
        {c.heading1}<em>{c.heading2}</em>
      </h2>

      <p className="share-intro">{c.intro}</p>

      <div className="share-grid">
        {blocks.map(({ key, text, badge, over }) => {
          const active = state.which === key;
          const label = active && state.phase === "done"
            ? c.copied
            : active && state.phase === "failed"
              ? c.failed
              : c.copy;
          return (
            <article key={key} className="share-card" data-testid={`share-card-${key}`}>
              <header className="share-card-head">
                <h3 className="share-card-title">{c.labels[key]}</h3>
                {badge && (
                  <span className={`share-badge ${over ? "is-over" : ""}`}>{badge}</span>
                )}
              </header>
              <pre className="share-caption">{text}</pre>
              <button
                className={`share-copy ${active ? `is-${state.phase}` : ""}`}
                onClick={() => onCopy(key)}
                data-testid={`share-copy-${key}`}
                aria-label={`Copy ${c.labels[key]} caption`}
              >
                <span className="share-copy-ic" aria-hidden="true">
                  {active && state.phase === "done" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  )}
                </span>
                <span>{label}</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
