#!/usr/bin/env python3
"""Parse performers_raw.txt into structured JSON for the appendix.

Format (after cleanup):
  N. Name | Talent | (IDENTITY_CODES) | Country | (ETHNICITY_CODES) | Stage(optional)
"""
import json
import re
from pathlib import Path

RAW = Path(__file__).parent / "performers_raw.txt"
OUT = Path(__file__).parents[1] / "frontend" / "src" / "data" / "performers.js"

IDENTITY_CODES = {"TM", "TW", "T", "SAP/Bi", "L", "F", "GM", "M", "Q", "NB", "H", "N/A"}
ETHNICITY_CODES = {"B", "W", "A", "LA", "MENA", "IND", "O/M", "N/A"}

# Map raw identity tokens -> normalized buckets
IDENTITY_BUCKET = {
    "GM": "gm", "M": "gm",                       # Gay Male / AMAB
    "L": "l",  "F": "l",                         # Lesbian / AFAB
    "TM": "t", "TW": "t", "T": "t",              # Trans
    "SAP/Bi": "sap",
    "Q": "qnb", "NB": "qnb",
    "H": "h",  "N/A": "h",
}

ETHNICITY_LABEL = {
    "B": "Black",
    "W": "White",
    "A": "Asian",
    "LA": "Latinx",
    "MENA": "MENA",
    "IND": "Indigenous",
    "O/M": "Mixed / Other",
    "N/A": "—",
}

CODE_RE = re.compile(r"\(([^()]+)\)")


def extract_codes(text):
    """Pull all parenthesized code tokens from a field."""
    codes = []
    for group in CODE_RE.findall(text or ""):
        # group may be "GM" or "SAP/Bi" or "A/SA/EA" etc.
        raw = group.strip()
        codes.append(raw)
    return codes


def split_codes(codes):
    identities, ethnicities = [], []
    for c in codes:
        token = c.strip().upper().replace(" ", "")
        # Normalize sapphic: original is "SAP/BI" after upper
        if token in {"SAP/BI", "SAP/B", "SAPBI"}:
            identities.append("SAP/Bi")
            continue
        if token == "N/A":
            identities.append("N/A")
            continue
        # Ethnicity checks (common variants)
        if token in {"B", "W", "A", "LA", "MENA", "IND", "O/M"}:
            ethnicities.append(token)
            continue
        if token in {"ME/NA"}:
            ethnicities.append("MENA")
            continue
        if token.startswith("A/"):  # A/SA, A/SA/EA → Asian
            ethnicities.append("A")
            continue
        if token in {"IDN"}:
            ethnicities.append("IND")
            continue
        # Identity checks
        if token in {"TM", "TW", "T", "L", "F", "GM", "M", "Q", "NB", "H", "AMAB"}:
            identities.append(token.replace("AMAB", "M"))
            continue
        # Fallback — skip unknown
    return identities, ethnicities


def primary_identity_bucket(identities):
    """Pick the most specific identity bucket for the row."""
    # Priority order: trans > lesbian/sapphic > queer/nb > gay > hetero
    order = ["t", "sap", "l", "qnb", "gm", "h"]
    tokens = [IDENTITY_BUCKET.get(t) for t in identities if t in IDENTITY_BUCKET]
    tokens = [t for t in tokens if t]
    # Merge duplicates preserving priority
    for k in order:
        if k in tokens:
            return k
    return "h"


def parse_line(line):
    # Line like: "5.  Adrianna Expose |DQ | (GM) (M) | Canada | (W) |"
    m = re.match(r"^\s*(\d+)\.\s*(.+)$", line)
    if not m:
        return None
    num = int(m.group(1))
    body = m.group(2)
    # Split by | and strip each
    parts = [p.strip() for p in body.split("|")]
    # Remove trailing empty
    while parts and parts[-1] == "":
        parts.pop()
    if len(parts) < 2:
        return None
    name = parts[0]
    talent = parts[1] if len(parts) > 1 else ""
    rest_fields = parts[2:]
    # Collect all parenthesized codes anywhere in remaining fields
    all_codes = []
    for f in rest_fields:
        all_codes.extend(extract_codes(f))
    identities, ethnicities = split_codes(all_codes)
    # Country = the first non-paren, non-stage-named text field after the codes
    country = None
    stage = None
    KNOWN_STAGES = {
        "BLOCKORAMA", "GREEN SPACE FESTIVAL", "NXNE 2025",
        "MILL ST WELLESLEY STAGE", "OLG CENTRAL STAGE",
        "TD MAIN STAGE", "SKATES & SOUNDS", "SKATES AND SOUNDS",
        "ROGERS COMMUNITY STAGE", "BOAT CRUISE", "MILL ST WELLSLEY STAGE",
        "OLG CDENTRAL STAGE",
    }
    for f in rest_fields:
        # skip fields that are pure codes
        stripped = re.sub(r"\([^)]*\)", "", f).strip()
        if not stripped:
            continue
        up = stripped.upper()
        if up in KNOWN_STAGES or any(k in up for k in ["MAIN STAGE", "STAGE", "FESTIVAL", "NXNE", "BLOCKORAMA", "BOAT"]):
            if stage is None:
                stage = " ".join(w.capitalize() if not w.isupper() else w for w in stripped.split())
            continue
        if country is None:
            country = stripped
    primary = primary_identity_bucket(identities)
    return {
        "id": num,
        "n": name,
        "t": talent or "—",
        "ids": identities,
        "p": primary,
        "eth": ethnicities,
        "c": country or "—",
        "s": stage or "",
    }


def main():
    rows = []
    with RAW.open() as fp:
        for line in fp:
            line = line.rstrip()
            if not line.strip():
                continue
            parsed = parse_line(line)
            if parsed:
                rows.append(parsed)

    # Tally counts
    by_identity = {}
    for r in rows:
        by_identity[r["p"]] = by_identity.get(r["p"], 0) + 1

    print(f"Parsed {len(rows)} performer rows.")
    print(f"Primary identity tally: {by_identity}")

    # Write JS module
    OUT.parent.mkdir(parents=True, exist_ok=True)
    js = "/* Auto-generated from /app/scripts/performers_raw.txt — do not edit by hand. */\n"
    js += "export const PERFORMERS = " + json.dumps(rows, ensure_ascii=False) + ";\n"
    js += f"export const PERFORMERS_COUNT = {len(rows)};\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
