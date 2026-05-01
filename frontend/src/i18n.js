/* Translations — EN / FR
 * All user-visible strings for The Booking Gap.
 * FR uses natural Canadian French.
 */

export const LOCALES = ["en", "fr"];

export const translations = {
  en: {
    // Nav / toolbar
    toolbar: {
      langEN: "EN",
      langFR: "FR",
      viewFull: "Full Audit",
      viewStory: "Story Card",
      download: "Download PNG",
      downloading: "Preparing…",
    },
    // Masthead
    masthead: {
      eyebrowLeft: "Independent Community Audit",
      eyebrowRight: "Vol. 01 · Summer 2025",
      title1: "The Booking",
      title2: "Gap",
      deck: ["Pride Toronto 2025 — ", "who actually got on the stage?"],
      bylineCount: " performers analyzed",
      bylineCompiled: "Compiled from public 2025 lineup announcements",
      bylineBy: "by",
    },
    // Hero
    hero: {
      kicker: "The Headline",
      were: "were",
      identity: "Gay Men",
      explainer: [
        "Of the ",
        "409 performers",
        " booked across Pride Toronto 2025's public lineup, ",
        "60.4% were Gay Men",
        " — the single largest identity bloc. Lesbians, Trans performers, Sapphic\u00a0/\u00a0Pan\u00a0/\u00a0Bi artists, Queer\u00a0/\u00a0Non-Binary folks and Heterosexual allies ",
        "combined",
        " made up just ",
        "39.6%",
        ".",
      ],
    },
    // Split
    split: {
      kicker: "The Split",
      heading1: "Gay\u00a0Men ",
      heading2: "vs.",
      heading3: " Everyone\u00a0Else.",
      statA: "Gay Men",
      statB: "Everyone Else",
      labelA: "GAY MEN",
      labelB: "EVERYONE ELSE",
      footnote: [
        "* Lesbians · Trans · Sapphic\u00a0/\u00a0Pan\u00a0/\u00a0Bi · Queer\u00a0/\u00a0Non-Binary · Heterosexual\u00a0/\u00a0N·A — ",
        "combined.",
      ],
    },
    // Identity breakdown
    identity: {
      kicker: "The Full Breakdown",
      heading1: "Six identity groups. ",
      heading2: "One stage.",
      labels: {
        gm:  { name: "Gay Male",           short: "GM / M" },
        qnb: { name: "Queer / Non-Binary", short: "Q / NB" },
        t:   { name: "Trans",              short: "TM / TW / T" },
        l:   { name: "Lesbian",            short: "L / F" },
        h:   { name: "Heterosexual / N·A", short: "H / N·A" },
        sap: { name: "Sapphic / Pan / Bi", short: "SAP / Bi" },
      },
      footnote:
        "Some performers identify with more than one category (e.g. Queer + Lesbian). Each bar represents the share of the 409-performer lineup that includes that identity, so totals can exceed 100%. Bars are scaled relative to the largest identity for visual comparison.",
    },
    // Ethnicity
    ethnicity: {
      kicker: "The Ethnicity Split",
      heading1: "Who is on stage, ",
      heading2: "by ethnicity.",
      white: "White",
      bipoc: "BIPOC",
      calloutEyebrow: "Most-booked identity × ethnicity",
      calloutText: [
        "of the ",
        "entire 409-performer lineup",
        " were ",
        "White Gay Men",
        ", alone — ",
        "more than Lesbians, Trans, Sapphic and Heterosexual women combined.",
      ],
    },
    // Methodology
    methodology: {
      kicker: "Methodology & Context",
      heading1: "How this audit was ",
      heading2: "put together.",
      intro:
        "This audit is compiled entirely from publicly available sources. The We Are LCV team reviewed Pride Toronto's 2025 programming announcements, posters, flyers and stage listings, coded each performer's publicly stated identity and ethnicity to the best of our ability, and cross-referenced grant-repayment figures with news reporting and federal statements.",
      sections: [
        {
          num: "A",
          title: "The Affiliate Event Program",
          body:
            "Pride Toronto operates an 'Affiliate Event Program' where community groups can apply to have their events listed as official Pride Toronto events. In exchange for a fee (donation-based up to $205.82+), Pride Toronto provides permission to use their logo, social media promotion, and a listing in their digital guide. Pride Toronto does not provide any funding to Affiliate Events — this is a promotional arrangement only, not a financial partnership.",
        },
        {
          num: "B",
          title: "Grant Repayment · KPMG Audit",
          body:
            "A KPMG audit commissioned by Pride Toronto confirmed the organization could not provide evidence that it completed several projects funded by three federal government grants totalling $1.85M. The federal government ordered Pride Toronto to repay more than $505,000. As of January 2024: $100,000 repaid · $424,780.63 still owing (including interest). Additional allegations from an independent investigation by Prof. Tom Hooper (York University) include funds intended for Indigenous artists being redirected to cover VIP passes and staff expenses, and forged letters of support on grant applications. Pride Toronto has since apologized to the affected Indigenous & 2Spirit communities and implemented new financial oversight measures.",
        },
        {
          num: "C",
          title: "Booking-Fee Transparency",
          body:
            "Pride Toronto has never publicly disclosed individual artist booking fees for any festival lineup — including 2025. Artist payment amounts remain confidential under standard performance contracts. This lack of transparency makes it impossible for the public to verify whether pay equity exists across different identities (Gay men, cis-Lesbians, Trans women, Non-Binary performers, etc.). This audit presents publicly available booking data only; fee information is not included because it is not publicly accessible.",
        },
      ],
      sources: {
        title: "Data Sources",
        items: [
          "Talent lineup: public Pride Toronto 2025 programming announcements (posters, flyers, stage listings).",
          "Grant-repayment figures: Toronto Star (Jan\u00a026,\u00a02025), Department of Canadian Heritage statements, KPMG audit as reported in multiple news outlets.",
          "Affiliate Program details: Pride Toronto's official website as of 2026.",
          "Pride Toronto's official website states 860 performers and 467 acts total. This audit analyzes the 409 performers listed in publicly released 2025 lineup announcements prior to the page's removal on May\u00a01,\u00a02025.",
        ],
      },
      corrections: {
        label: "Corrections & feedback",
        text: "For corrections, suggestions, or comments, contact We Are LCV at ",
        emailLabel: "info@wearelcv.ca",
      },
    },
    // Mission
    mission: {
      kicker: "Why This Matters",
      heading1: "About ",
      heading2: "We Are LCV",
      body: [
        "LCV celebrates the rich diversity of ",
        "lesbian creatives",
        " across all artistic fields, with a focus on the arts, dance, music, fashion, and beauty+ industries. Our mission is to ",
        "amplify talent",
        ", ",
        "break stereotypes",
        ", and ",
        "unite the community",
        " through impactful events.",
      ],
      markLabel: "Audit by",
      markHandle: "@wearelcv",
    },
    // Contact
    contact: {
      instagram: "Instagram",
      facebook: "Facebook",
      email: "Email",
    },
    // Disclaimer
    disclaimer: {
      label: "Disclaimer.",
      body: " Independent community audit by We Are LCV. Not affiliated with or funded by Pride Toronto. Data compiled from public 2025 lineup announcements. Pride Toronto removed their 2025 lineup page on May\u00a01,\u00a02025.",
      copyright: "© 2025 We Are LCV · All rights reserved.",
    },
    // Story card (condensed)
    story: {
      topLeft: "INDEPENDENT AUDIT · WE ARE LCV",
      topRight: "PRIDE TORONTO 2025",
      title: "The Booking",
      titleAccent: "Gap.",
      heroNum: "60.4",
      heroPctLabel: "WERE GAY MEN",
      splitA: "Gay Men",
      splitB: "Everyone Else",
      breakdownHeading: "Six identities. One stage.",
      ethnicityHeading: "On stage, by ethnicity.",
      white: "White",
      bipoc: "BIPOC",
      calloutPct: "≈35%",
      calloutText: "of the lineup were White Gay Men — alone.",
      footer: "@wearelcv · wearelcv.ca",
      disclaimer: "Independent audit. Not affiliated with Pride Toronto.",
    },
  },

  fr: {
    toolbar: {
      langEN: "EN",
      langFR: "FR",
      viewFull: "Audit complet",
      viewStory: "Carte Story",
      download: "Télécharger PNG",
      downloading: "Préparation…",
    },
    masthead: {
      eyebrowLeft: "Audit communautaire indépendant",
      eyebrowRight: "Vol. 01 · Été 2025",
      title1: "L'Écart de",
      title2: "Programmation",
      deck: ["Pride Toronto 2025 — ", "qui a vraiment pris la scène\u00a0?"],
      bylineCount: " artistes analysé·e·s",
      bylineCompiled: "Compilé à partir des annonces publiques de la programmation 2025",
      bylineBy: "par",
    },
    hero: {
      kicker: "La Manchette",
      were: "étaient des",
      identity: "hommes gais",
      explainer: [
        "Sur les ",
        "409 artistes",
        " engagé·e·s dans la programmation publique de Pride Toronto 2025, ",
        "60,4\u00a0% étaient des hommes gais",
        "\u00a0— le plus grand bloc identitaire. Lesbiennes, personnes trans, artistes saphiques\u00a0/\u00a0pan\u00a0/\u00a0bi, personnes queer\u00a0/\u00a0non binaires et allié·e·s hétérosexuel·le·s ",
        "combiné·e·s",
        " ne représentaient que ",
        "39,6\u00a0%",
        ".",
      ],
    },
    split: {
      kicker: "La Division",
      heading1: "Hommes\u00a0gais ",
      heading2: "c.",
      heading3: " tous\u00a0les\u00a0autres.",
      statA: "Hommes gais",
      statB: "Tous les autres",
      labelA: "HOMMES GAIS",
      labelB: "TOUS LES AUTRES",
      footnote: [
        "* Lesbiennes · Trans · Saphique\u00a0/\u00a0Pan\u00a0/\u00a0Bi · Queer\u00a0/\u00a0Non\u00a0binaire · Hétérosexuel\u00a0/\u00a0S·O — ",
        "combiné·e·s.",
      ],
    },
    identity: {
      kicker: "La Répartition Complète",
      heading1: "Six groupes identitaires. ",
      heading2: "Une scène.",
      labels: {
        gm:  { name: "Homme gai",            short: "GM / M" },
        qnb: { name: "Queer / Non binaire",  short: "Q / NB" },
        t:   { name: "Trans",                short: "HT / FT / T" },
        l:   { name: "Lesbienne",            short: "L / F" },
        h:   { name: "Hétérosexuel / S·O",    short: "H / S·O" },
        sap: { name: "Saphique / Pan / Bi",  short: "SAP / Bi" },
      },
      footnote:
        "Certain·e·s artistes s'identifient à plus d'une catégorie (p.\u00a0ex. Queer + Lesbienne). Chaque barre représente la part des 409 artistes qui inclut cette identité\u00a0; les totaux peuvent donc dépasser 100\u00a0%. Les barres sont mises à l'échelle de l'identité la plus nombreuse.",
    },
    ethnicity: {
      kicker: "La Division Ethnique",
      heading1: "Qui est sur scène, ",
      heading2: "par origine ethnique.",
      white: "Blanc·he·s",
      bipoc: "PANDC",
      calloutEyebrow: "Identité × ethnicité la plus engagée",
      calloutText: [
        "de la ",
        "programmation totale de 409\u00a0artistes",
        " étaient des ",
        "hommes gais blancs",
        ", à eux seuls — ",
        "soit plus que les lesbiennes, les personnes trans, les saphiques et les femmes hétérosexuelles réunies.",
      ],
    },
    methodology: {
      kicker: "Méthodologie & Contexte",
      heading1: "Comment cet audit a été ",
      heading2: "construit.",
      intro:
        "Cet audit est compilé entièrement à partir de sources publiques. L'équipe We Are LCV a examiné les annonces de programmation 2025 de Pride Toronto, les affiches, tracts et listes de scènes, a codé l'identité et l'origine ethnique publiquement déclarées de chaque artiste au meilleur de sa capacité, et a recoupé les chiffres de remboursement de subventions avec les reportages et les déclarations fédérales.",
      sections: [
        {
          num: "A",
          title: "Le Programme d'Événements Affiliés",
          body:
            "Pride Toronto gère un « Programme d'événements affiliés » qui permet aux groupes communautaires de faire inscrire leurs événements comme événements officiels. En échange d'un tarif (sur base de dons, jusqu'à 205,82\u00a0$ et plus), Pride Toronto accorde l'autorisation d'utiliser son logo, une promotion sur les réseaux sociaux et une inscription dans son guide numérique. Pride Toronto ne fournit aucun financement aux événements affiliés\u00a0— il s'agit d'un arrangement promotionnel, pas d'un partenariat financier.",
        },
        {
          num: "B",
          title: "Remboursement de Subventions · Audit KPMG",
          body:
            "Un audit KPMG commandé par Pride Toronto a confirmé que l'organisation ne pouvait fournir de preuves qu'elle avait mené à terme plusieurs projets financés par trois subventions fédérales totalisant 1,85\u00a0M$. Le gouvernement fédéral a ordonné à Pride Toronto de rembourser plus de 505\u00a0000\u00a0$. Au 24\u00a0janvier\u00a02024\u00a0: 100\u00a0000\u00a0$ remboursés · 424\u00a0780,63\u00a0$ encore dûs (intérêts compris). Une enquête indépendante du Pr.\u00a0Tom\u00a0Hooper (Université York) allègue également que des fonds destinés aux artistes autochtones auraient été redirigés vers des passes VIP et des dépenses de personnel, et que des lettres d'appui auraient été falsifiées. Pride Toronto s'est depuis excusé auprès des communautés autochtones et bispirituelles concernées et a mis en place de nouvelles mesures de surveillance financière.",
        },
        {
          num: "C",
          title: "Transparence des Cachets",
          body:
            "Pride Toronto n'a jamais divulgué publiquement les cachets individuels des artistes pour une quelconque programmation de festival — y compris 2025. Les montants de rémunération demeurent confidentiels aux termes des contrats de spectacle. Ce manque de transparence rend impossible la vérification de l'équité salariale entre différentes identités (hommes gais, lesbiennes cis, femmes trans, artistes non binaires, etc.). Cet audit présente uniquement les données d'engagement publiquement disponibles\u00a0; l'information sur les cachets n'est pas incluse car elle n'est pas accessible au public.",
        },
      ],
      sources: {
        title: "Sources",
        items: [
          "Programmation\u00a0: annonces publiques de programmation Pride Toronto 2025 (affiches, tracts, listes de scènes).",
          "Chiffres de remboursement\u00a0: Toronto Star (26\u00a0janvier\u00a02024), déclarations du ministère du Patrimoine canadien, audit KPMG tel que rapporté dans plusieurs médias.",
          "Détails du Programme d'affiliés\u00a0: site officiel de Pride Toronto, état en\u00a02026.",
          "Le site officiel de Pride Toronto indique 860\u00a0artistes et 467\u00a0numéros au total. Cet audit porte sur les 409\u00a0artistes listé·e·s dans les annonces publiques de 2025 avant le retrait de la page le 1er\u00a0mai\u00a02025.",
        ],
      },
      corrections: {
        label: "Corrections & commentaires",
        text: "Pour toute correction, suggestion ou commentaire, écrivez à We Are LCV\u00a0: ",
        emailLabel: "info@wearelcv.ca",
      },
    },
    mission: {
      kicker: "Pourquoi Ça Compte",
      heading1: "À propos de ",
      heading2: "We Are LCV",
      body: [
        "LCV célèbre la riche diversité des ",
        "créatrices lesbiennes",
        " dans tous les domaines artistiques, avec un accent sur les arts, la danse, la musique, la mode et les industries de la beauté+. Notre mission\u00a0: ",
        "amplifier les talents",
        ", ",
        "briser les stéréotypes",
        ", et ",
        "unir la communauté",
        " par des événements marquants.",
      ],
      markLabel: "Audit par",
      markHandle: "@wearelcv",
    },
    contact: {
      instagram: "Instagram",
      facebook: "Facebook",
      email: "Courriel",
    },
    disclaimer: {
      label: "Avis.",
      body: " Audit communautaire indépendant par We Are LCV. Non affilié à Pride Toronto, ni financé par cette organisation. Données compilées à partir des annonces publiques de la programmation 2025. Pride Toronto a retiré la page de sa programmation 2025 le 1er\u00a0mai\u00a02025.",
      copyright: "© 2025 We Are LCV · Tous droits réservés.",
    },
    story: {
      topLeft: "AUDIT INDÉPENDANT · WE ARE LCV",
      topRight: "PRIDE TORONTO 2025",
      title: "L'Écart de",
      titleAccent: "Programmation.",
      heroNum: "60,4",
      heroPctLabel: "ÉTAIENT DES HOMMES GAIS",
      splitA: "Hommes gais",
      splitB: "Tous les autres",
      breakdownHeading: "Six identités. Une scène.",
      ethnicityHeading: "Sur scène, par ethnicité.",
      white: "Blanc·he·s",
      bipoc: "PANDC",
      calloutPct: "≈35\u00a0%",
      calloutText: "de la programmation étaient des hommes gais blancs — à eux seuls.",
      footer: "@wearelcv · wearelcv.ca",
      disclaimer: "Audit indépendant. Non affilié à Pride Toronto.",
    },
  },
};

export function getLocale() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("lcv-lang") || "en";
}

export function setLocaleStorage(lang) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("lcv-lang", lang);
  }
}

export function formatPct(value, locale) {
  // 60.4 → "60.4%" (en) / "60,4\u00a0%" (fr)
  if (locale === "fr") {
    return `${String(value).replace(".", ",")}\u00a0%`;
  }
  return `${value}%`;
}

export function formatInt(value, locale) {
  if (locale === "fr") {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  }
  return String(value);
}
