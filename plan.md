# plan.md — Pride Toronto 2025: The Booking Gap (We Are LCV)

## 1. Objectives
- Build a static, mobile-friendly, fashion-forward editorial infographic titled **“Pride Toronto 2025: The Booking Gap”** for We Are LCV (@wearelcv).
- Encode the provided brand palette and identity color system accurately.
- Visualize the required stats clearly (hero number, split comparison, identity breakdown, ethnicity split, and note about White Gay Men share).
- Produce a public-viewable frontend artifact (no backend, no auth, no integrations) suitable for Instagram/story and web viewing.

## 2. Implementation Steps

### Phase 1 — Core layout + chart rendering POC (isolation)
Goal: Prove the hardest part (editorial layout + charts) looks correct on mobile and exports cleanly.

**Build**
- Create a single responsive page with a fixed-width “canvas” (e.g., 1080×1350 IG portrait) that scales down for mobile.
- Implement **SVG-based** components for:
  - Hero stat block: **“60.4% GAY MEN”** with #4A15ED.
  - Split visualization: bar or donut showing **60.4% vs 39.6%**.
  - Identity breakdown bar chart (7 categories, using provided identity colors).
  - Ethnicity horizontal bar: **White 53.3% vs BIPOC 46.7%**.
  - Micro-annotation: **“White Gay Men = 35% of total lineup”**.
- Apply editorial typography hierarchy (bold headline, condensed labels, smallcaps where appropriate) without “spreadsheet look.”

**Validate**
- Check contrast/legibility on #292929 background; ensure #E4E2DD is primary text.
- Verify all chart percentages render precisely and labels don’t overlap at common mobile widths.
- Verify export readiness: crisp on retina (SVG), safe margins for IG UI.

**Fix-until-works gate**
- Do not proceed until: layout is visually coherent, charts match numbers/colors, and mobile scaling is clean.

**User stories (Phase 1)**
1. As a viewer on a phone, I want the hero stat to be instantly readable without zooming.
2. As a viewer, I want the split (Gay Men vs Everyone Else) to be visually obvious in under 2 seconds.
3. As a viewer, I want the identity breakdown colors to match a clear legend so I can decode categories quickly.
4. As a viewer, I want the White vs BIPOC comparison to be unambiguous and labeled.
5. As a viewer, I want the “White Gay Men = 35%” note to be visible but not distract from the main headline.

---

### Phase 2 — V1 infographic app/page build
Goal: Turn the POC into a polished, share-ready v1 with full copy blocks, mission sidebar, and footer/disclaimer.

**Structure**
- Create a single-page layout with sections:
  - Header/title + subtitle (editorial masthead style)
  - Hero stat module
  - Split module
  - Identity breakdown module + legend
  - Ethnicity module
  - Sidebar: We Are LCV mission block
  - Bottom social/contact line
  - Footer disclaimer

**Design system**
- Define tokens for:
  - Background: #292929
  - Text: #E4E2DD
  - Accent: #E5AFFB
  - Identity colors: Trans #9495E6, Sapphic/Pan/Bi #9CF6F6, Lesbian #F9BBE6, Gay Male #4A15ED, Queer/NB #70E580, Hetero/N/A #FF3C00 (plus one additional neutral/“Other/Unknown” if needed for the 7th bucket).
- Typography: choose 1 headline font + 1 body font (Google Fonts), with strong weight contrast.

**Copy blocks (exact requirements)**
- Ensure hero: **“60.4% GAY MEN”** (large, bold, #4A15ED).
- Ensure key stat blocks:
  - “Gay Men = 60.4% (dominant number)”
  - “All Other Identities = 39.6%”
  - “White Performers = 53.3%”
  - “White Gay Men alone = ~35%”
- Sidebar mission: concise statement of We Are LCV mission (provided/approved text).
- Bottom line: **Instagram @wearelcv | Facebook WeAreLcv | info@wearelcv.ca**.
- Footer disclaimer (exact):
  - “Independent community audit by We Are LCV. Not affiliated with or funded by Pride Toronto. Data compiled from public 2025 lineup announcements. Pride Toronto removed their 2025 lineup page on May 1, 2025.”

**Accessibility + responsiveness**
- Maintain minimum text sizes and line heights for readability.
- Ensure color contrast (esp. identity colors on dark background) meets practical readability.

**Testing (end-to-end, 1 round)**
- Render page on common widths (375, 390, 430) and desktop.
- Verify no clipping/overflow; verify legend and labels readable.
- Confirm numbers, ordering, and colors match spec.

**User stories (Phase 2)**
1. As a visitor, I want the infographic to load instantly and not require interaction to understand.
2. As a viewer, I want each chart to have clear labels so I don’t need prior context.
3. As an organizer/advocate, I want the mission sidebar to explain “why this matters” in one glance.
4. As a social viewer, I want the social/contact info to be easy to find for follow-up.
5. As a critical reader, I want the disclaimer to clearly communicate data source limits and independence.

---

### Phase 3 — Polishing + share/export readiness
Goal: Make it publication-grade and easy to repurpose for IG posts/stories.

**Enhancements**
- Add subtle editorial details: dividers, baseline grid feel, consistent spacing rhythm.
- Implement “export mode” styles:
  - Portrait 1080×1350
  - Story 1080×1920 (optional layout variant)
- Add a small legend/key styling upgrade (chips or swatches) without clutter.
- Ensure “no spreadsheet look”: remove heavy gridlines; use minimal axis marks.

**Testing (end-to-end, 1 round)**
- Verify export modes don’t shift typography or misalign bars.
- Confirm all text remains readable on compressed screenshots.

**User stories (Phase 3)**
1. As a social media manager, I want a layout that screenshots cleanly without UI elements cutting off content.
2. As a designer, I want consistent spacing and typographic hierarchy across modules.
3. As a viewer, I want the legend to be understandable without reading a long explanation.
4. As an advocate, I want the chart colors to feel on-brand and cohesive.
5. As a reviewer, I want the final asset to look like a magazine graphic, not a dashboard.

---

### Phase 4 — Optional iteration (only after approval)
- Add alternate caption-safe versions (bigger type, fewer labels).
- Add bilingual variant (EN/FR) if required.
- Add downloadable PNG generation workflow (client-side) if needed.

**User stories (Phase 4)**
1. As a viewer with low vision, I want a large-type version that preserves meaning.
2. As an organizer, I want a story-size variant for easy reposting.
3. As We Are LCV, I want a version with slightly expanded methodology text.
4. As a collaborator, I want a second theme option (same data) for A/B testing.
5. As a publisher, I want a downloadable image file without manually screenshotting.

## 3. Next Actions
- Confirm the exact **7 identity buckets** for the breakdown chart (names + percentages) to match the “409 performers” dataset.
- Confirm whether the split visualization should be **donut** or **bar** (or both), and preferred ordering for the identity breakdown.
- Provide/approve the **We Are LCV mission sidebar text** (1–3 sentences) for inclusion.
- Approve target formats: IG portrait only (1080×1350) vs also story (1080×1920).

## 4. Success Criteria
- All required visuals present: hero stat, split chart, 7-color identity breakdown, ethnicity bar, White Gay Men note, mission sidebar, social/contact, and disclaimer.
- Color usage matches specified hex codes; hero “60.4% GAY MEN” uses **#4A15ED**.
- Mobile-first readability: no overlapping labels, no tiny text, strong hierarchy.
- Editorial/fashion-forward look: minimal chart chrome, bold typography, cohesive spacing.
- Share-ready: exports/screenshots are crisp and correctly framed for Instagram.
