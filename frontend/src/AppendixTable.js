import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PERFORMERS, PERFORMERS_COUNT } from "./data/performers";

/* --------------------------------------------------------------------------
 * AppendixTable — expandable 421-performer dataset
 *   · Expand / collapse
 *   · Deep-linkable URL params:  ?appendix=1&q=…&id=…&eth=…&sort=…
 *   · Search + identity filter + ethnicity filter
 *   · Sortable columns (number / name / identity / ethnicity / country / stage)
 *   · "Load more" pagination (+50)
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

// Identity priority for sort ordering (Gay Male first — mirrors chart order)
const IDENTITY_ORDER = { gm: 0, qnb: 1, t: 2, l: 3, h: 4, sap: 5 };

// Columns configuration
const SORT_KEYS = ["num", "name", "talent", "identity", "ethnicity", "country", "stage"];

function compareStrings(a, b) {
  const sa = (a || "").toString();
  const sb = (b || "").toString();
  return sa.localeCompare(sb, undefined, { sensitivity: "base" });
}

function sortPerformers(rows, sortKey, sortDir) {
  const dir = sortDir === "desc" ? -1 : 1;
  const sorted = [...rows].sort((x, y) => {
    let r = 0;
    switch (sortKey) {
      case "name":      r = compareStrings(x.n, y.n); break;
      case "talent":    r = compareStrings(x.t, y.t); break;
      case "identity":  r = (IDENTITY_ORDER[x.p] ?? 99) - (IDENTITY_ORDER[y.p] ?? 99); break;
      case "ethnicity": r = compareStrings((x.eth || [])[0] || "\uFFFF", (y.eth || [])[0] || "\uFFFF"); break;
      case "country":   r = compareStrings(x.c, y.c); break;
      case "stage":     r = compareStrings(x.s || "\uFFFF", y.s || "\uFFFF"); break;
      case "num":
      default:          r = x.id - y.id; break;
    }
    if (r === 0) r = x.id - y.id; // stable fallback
    return r * dir;
  });
  return sorted;
}

export default function AppendixTable({ t, lang }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFr = lang === "fr";

  // ---------- state (seeded from URL) ----------
  const [open, setOpen] = useState(searchParams.get("appendix") === "1");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [idFilter, setIdFilter] = useState(searchParams.get("id") || "all");
  const [ethFilter, setEthFilter] = useState(searchParams.get("eth") || "all");
  const [sortKey, setSortKey] = useState(() => {
    const sp = searchParams.get("sort") || "num";
    return SORT_KEYS.includes(sp.replace(/^-/, "")) ? sp.replace(/^-/, "") : "num";
  });
  const [sortDir, setSortDir] = useState(() => {
    const sp = searchParams.get("sort") || "num";
    return sp.startsWith("-") ? "desc" : "asc";
  });
  const [limit, setLimit] = useState(50);

  // ---------- sync state → URL (shallow, no nav) ----------
  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    // preserve any non-appendix params we don't own
    const managed = ["appendix", "q", "id", "eth", "sort"];
    managed.forEach((k) => next.delete(k));

    if (open) next.set("appendix", "1");
    if (query.trim()) next.set("q", query.trim());
    if (idFilter !== "all") next.set("id", idFilter);
    if (ethFilter !== "all") next.set("eth", ethFilter);
    if (!(sortKey === "num" && sortDir === "asc")) {
      next.set("sort", (sortDir === "desc" ? "-" : "") + sortKey);
    }

    // avoid noisy history entries — use replace
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query, idFilter, ethFilter, sortKey, sortDir]);

  // ---------- filter & sort ----------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = PERFORMERS.filter((p) => {
      if (idFilter !== "all" && p.p !== idFilter) return false;
      if (ethFilter !== "all" && !(p.eth || []).includes(ethFilter)) return false;
      if (q) {
        const hay = `${p.n} ${p.t} ${p.c} ${p.s}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return sortPerformers(rows, sortKey, sortDir);
  }, [query, idFilter, ethFilter, sortKey, sortDir]);

  const visible = filtered.slice(0, limit);

  // Reset pagination when filters/sorts change
  useEffect(() => {
    setLimit(50);
  }, [query, idFilter, ethFilter, sortKey, sortDir]);

  const handleSort = useCallback(
    (key) => {
      if (!SORT_KEYS.includes(key)) return;
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setIdFilter("all");
    setEthFilter("all");
    setSortKey("num");
    setSortDir("asc");
  }, []);

  // ---------- i18n labels ----------
  const label = {
    kicker: isFr ? "Annexe" : "Appendix",
    heading1: isFr ? "Le jeu de donn\u00e9es " : "The full ",
    heading2: isFr ? "complet." : "409-performer dataset.",
    intro: isFr
      ? `Tableau filtrable et partageable des ${PERFORMERS_COUNT} artistes publiquement annonc\u00e9\u00b7e\u00b7s dans la programmation 2025 de Pride Toronto (les groupes de plusieurs personnes ont \u00e9t\u00e9 \u00e9clat\u00e9s en entr\u00e9es individuelles). Toutes vos s\u00e9lections s'encodent dans l'URL \u2014 partagez le lien et les filtres sont pr\u00e9serv\u00e9s.`
      : `A filterable, shareable table of all ${PERFORMERS_COUNT} performers publicly announced in Pride Toronto's 2025 lineup (group acts have been expanded into individual rows). Every selection you make is encoded in the URL — share the link and your filters travel with it.`,
    toggleOpen: isFr ? `Afficher le tableau des ${PERFORMERS_COUNT} artistes` : `Show all ${PERFORMERS_COUNT} performers`,
    toggleClose: isFr ? "Masquer le tableau" : "Hide table",
    search: isFr ? "Rechercher par nom, talent, pays, sc\u00e8ne\u2026" : "Search by name, talent, country, stage\u2026",
    idAll: isFr ? "Toutes identit\u00e9s" : "All identities",
    ethAll: isFr ? "Toutes ethnicit\u00e9s" : "All ethnicities",
    showing: isFr ? "Affichage" : "Showing",
    of: isFr ? "sur" : "of",
    loadMore: isFr ? "Afficher plus" : "Load more",
    empty: isFr ? "Aucun r\u00e9sultat." : "No results.",
    clear: isFr ? "R\u00e9initialiser" : "Reset",
    sortBy: isFr ? "Trier par" : "Sort",
    headers: {
      num:       { label: "#",                                         sortable: true  },
      name:      { label: isFr ? "Nom"        : "Name",                sortable: true  },
      talent:    { label: isFr ? "Discipline" : "Talent",              sortable: true  },
      identity:  { label: isFr ? "Identit\u00e9": "Identity",          sortable: true  },
      ethnicity: { label: isFr ? "Ethnicit\u00e9": "Ethnicity",        sortable: true  },
      country:   { label: isFr ? "Pays"       : "Country",             sortable: true  },
      stage:     { label: isFr ? "Sc\u00e8ne" : "Stage",               sortable: true  },
    },
  };

  const sortIndicator = (key) => {
    if (sortKey !== key) return "\u2195"; // ↕
    return sortDir === "asc" ? "\u25B4" : "\u25BE"; // ▴ / ▾
  };

  return (
    <section className="appendix-section" data-testid="appendix-section">
      <div className="kicker">
        <span className="kicker-num">08</span>
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
              onChange={(e) => setQuery(e.target.value)}
              data-testid="appendix-search"
            />
            <select
              className="appendix-select"
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
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
              onChange={(e) => setEthFilter(e.target.value)}
              data-testid="appendix-filter-eth"
              aria-label="Ethnicity filter"
            >
              <option value="all">{label.ethAll}</option>
              {Object.entries(ETHNICITY_LABEL).map(([key, v]) => (
                <option key={key} value={key}>{isFr ? ETHNICITY_LABEL_FR[key] : v}</option>
              ))}
            </select>
            {(query || idFilter !== "all" || ethFilter !== "all" || sortKey !== "num" || sortDir !== "asc") && (
              <button
                className="appendix-clear"
                onClick={clearFilters}
                data-testid="appendix-clear"
                title="Clear filters and sort"
              >
                {label.clear}
              </button>
            )}
            <span className="appendix-count" data-testid="appendix-count">
              {label.showing} <b>{visible.length}</b> {label.of} <b>{filtered.length}</b>
            </span>
          </div>

          <div className="appendix-table-wrap">
            <table className="appendix-table">
              <thead>
                <tr>
                  {Object.entries(label.headers).map(([key, col]) => (
                    <th
                      key={key}
                      className={`col-${key === "num" ? "num" : ""} ${sortKey === key ? "is-sorted" : ""}`}
                      scope="col"
                    >
                      <button
                        className="th-sort"
                        onClick={() => handleSort(key)}
                        data-testid={`appendix-sort-${key}`}
                        aria-sort={sortKey === key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <span>{col.label}</span>
                        <span className="sort-ic" aria-hidden="true">{sortIndicator(key)}</span>
                      </button>
                    </th>
                  ))}
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
