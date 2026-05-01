import React, { useMemo, useState } from "react";
import { PERFORMERS, PERFORMERS_COUNT } from "./data/performers";

/* --------------------------------------------------------------------------
 * AppendixTable — expandable 400+ performer dataset table
 * Features: expand/collapse, search, identity filter, ethnicity filter,
 * pagination (load-more).
 * ----------------------------------------------------------------------- */

const IDENTITY_SWATCH = {
  gm:  { color: "#4A15ED", en: "Gay Male",           fr: "Homme gai" },
  qnb: { color: "#70E580", en: "Queer / NB",         fr: "Queer / NB" },
  t:   { color: "#9495E6", en: "Trans",              fr: "Trans" },
  l:   { color: "#F9BBE6", en: "Lesbian / F",        fr: "Lesbienne / F" },
  h:   { color: "#FF3C00", en: "Hetero / N\u00b7A",  fr: "H\u00e9t\u00e9ro / S\u00b7O" },
  sap: { color: "#9CF6F6", en: "Sapphic / Pan / Bi", fr: "Saphique / Pan / Bi" },
};

const ETHNICITY_LABEL = {
  B: "Black", W: "White", A: "Asian", LA: "Latinx",
  MENA: "MENA", IND: "Indigenous", "O/M": "Mixed",
};

const ETHNICITY_LABEL_FR = {
  B: "Noir\u00b7e", W: "Blanc\u00b7he", A: "Asiatique", LA: "Latinx",
  MENA: "MENA", IND: "Autochtone", "O/M": "Mixte",
};

export default function AppendixTable({ t, lang }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idFilter, setIdFilter] = useState("all");
  const [ethFilter, setEthFilter] = useState("all");
  const [limit, setLimit] = useState(50);

  const isFr = lang === "fr";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PERFORMERS.filter((p) => {
      if (idFilter !== "all" && p.p !== idFilter) return false;
      if (ethFilter !== "all" && !(p.eth || []).includes(ethFilter)) return false;
      if (q) {
        const hay = `${p.n} ${p.t} ${p.c} ${p.s}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, idFilter, ethFilter]);

  const visible = filtered.slice(0, limit);

  const label = {
    kicker: isFr ? "Annexe" : "Appendix",
    heading1: isFr ? "Le jeu de donn\u00e9es " : "The full ",
    heading2: isFr ? "complet." : "409-performer dataset.",
    intro: isFr
      ? `Tableau filtrable des ${PERFORMERS_COUNT} artistes publiquement annonc\u00e9\u00b7e\u00b7s dans la programmation 2025 de Pride Toronto (les groupes de plusieurs personnes ont \u00e9t\u00e9 \u00e9clat\u00e9s en entr\u00e9es individuelles). Corrections\u00a0: info@wearelcv.ca.`
      : `A filterable table of all ${PERFORMERS_COUNT} performers publicly announced in Pride Toronto's 2025 lineup (group acts have been expanded into individual rows). For corrections: info@wearelcv.ca.`,
    toggleOpen: isFr ? `Afficher le tableau des ${PERFORMERS_COUNT} artistes` : `Show all ${PERFORMERS_COUNT} performers`,
    toggleClose: isFr ? "Masquer le tableau" : "Hide table",
    search: isFr ? "Rechercher par nom, talent, pays, sc\u00e8ne\u2026" : "Search by name, talent, country, stage\u2026",
    idAll: isFr ? "Toutes identit\u00e9s" : "All identities",
    ethAll: isFr ? "Toutes ethnicit\u00e9s" : "All ethnicities",
    showing: isFr ? "Affichage" : "Showing",
    of: isFr ? "sur" : "of",
    loadMore: isFr ? "Afficher plus" : "Load more",
    empty: isFr ? "Aucun r\u00e9sultat." : "No results.",
    headers: {
      num: "#",
      name: isFr ? "Nom" : "Name",
      talent: isFr ? "Discipline" : "Talent",
      identity: isFr ? "Identit\u00e9" : "Identity",
      ethnicity: isFr ? "Ethnicit\u00e9" : "Ethnicity",
      country: isFr ? "Pays" : "Country",
      stage: isFr ? "Sc\u00e8ne" : "Stage",
    },
  };

  return (
    <section className="appendix-section" data-testid="appendix-section">
      <div className="kicker">
        <span className="kicker-num">07</span>
        <span className="kicker-line" />
        <span className="kicker-text">{label.kicker}</span>
      </div>

      <h2 className="section-h">
        {label.heading1}
        <em>{label.heading2}</em>
      </h2>

      <p className="appendix-intro">{label.intro}</p>

      <button
        className="appendix-toggle"
        onClick={() => setOpen((v) => !v)}
        data-testid="appendix-toggle"
        aria-expanded={open}
      >
        <span className="appendix-toggle-ic" aria-hidden="true">
          {open ? "\u2212" : "+"}
        </span>
        <span>{open ? label.toggleClose : label.toggleOpen}</span>
      </button>

      {open && (
        <div className="appendix-body" data-testid="appendix-body">
          <div className="appendix-controls">
            <input
              type="text"
              className="appendix-search"
              placeholder={label.search}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setLimit(50); }}
              data-testid="appendix-search"
            />
            <select
              className="appendix-select"
              value={idFilter}
              onChange={(e) => { setIdFilter(e.target.value); setLimit(50); }}
              data-testid="appendix-filter-id"
              aria-label="Identity filter"
            >
              <option value="all">{label.idAll}</option>
              {Object.entries(IDENTITY_SWATCH).map(([key, v]) => (
                <option key={key} value={key}>{isFr ? v.fr : v.en}</option>
              ))}
            </select>
            <select
              className="appendix-select"
              value={ethFilter}
              onChange={(e) => { setEthFilter(e.target.value); setLimit(50); }}
              data-testid="appendix-filter-eth"
              aria-label="Ethnicity filter"
            >
              <option value="all">{label.ethAll}</option>
              {Object.entries(ETHNICITY_LABEL).map(([key, v]) => (
                <option key={key} value={key}>{isFr ? ETHNICITY_LABEL_FR[key] : v}</option>
              ))}
            </select>
            <span className="appendix-count" data-testid="appendix-count">
              {label.showing} <b>{visible.length}</b> {label.of} <b>{filtered.length}</b>
            </span>
          </div>

          <div className="appendix-table-wrap">
            <table className="appendix-table">
              <thead>
                <tr>
                  <th className="col-num">{label.headers.num}</th>
                  <th>{label.headers.name}</th>
                  <th>{label.headers.talent}</th>
                  <th>{label.headers.identity}</th>
                  <th>{label.headers.ethnicity}</th>
                  <th>{label.headers.country}</th>
                  <th>{label.headers.stage}</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr><td colSpan={7} className="appendix-empty">{label.empty}</td></tr>
                )}
                {visible.map((p) => {
                  const swatch = IDENTITY_SWATCH[p.p] || IDENTITY_SWATCH.qnb;
                  return (
                    <tr key={p.id} data-testid={`appendix-row-${p.id}`}>
                      <td className="col-num">{p.id}</td>
                      <td className="col-name">{p.n}</td>
                      <td className="col-talent">{p.t}</td>
                      <td>
                        <span className="id-tag" style={{ color: swatch.color, borderColor: swatch.color }}>
                          <span className="id-tag-chip" style={{ background: swatch.color }} />
                          {isFr ? swatch.fr : swatch.en}
                        </span>
                        {p.ids && p.ids.length > 0 && (
                          <span className="id-raw">{p.ids.map((i) => `(${i})`).join(" ")}</span>
                        )}
                      </td>
                      <td className="col-eth">
                        {(p.eth || []).map((e) => (
                          <span key={e} className="eth-tag">
                            {isFr ? ETHNICITY_LABEL_FR[e] || e : ETHNICITY_LABEL[e] || e}
                          </span>
                        ))}
                      </td>
                      <td className="col-country">{p.c}</td>
                      <td className="col-stage">{p.s || "\u2014"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {limit < filtered.length && (
            <button
              className="appendix-loadmore"
              onClick={() => setLimit((l) => l + 50)}
              data-testid="appendix-loadmore"
            >
              {label.loadMore} ({filtered.length - limit})
            </button>
          )}
        </div>
      )}
    </section>
  );
}
