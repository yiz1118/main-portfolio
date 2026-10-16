# Edition of Six — redesign handoff

Date: 16 October 2026. Scope: `main-portfolio` only; the six concept repositories are untouched. Base commit: `01c7b31`. Changes are local and uncommitted; nothing was deployed or sent.

## 1. Project and brand analysis

The site is the freelance portfolio of Alson Chua, Independent Web & App Developer, Malaysia, working worldwide. It must convince founders and startups, brands and small businesses, and agencies (weighted equally) to start a project. Its proof is six independent concept builds (VANTA, NEXA, FORM / 27, EMBER, ATELIER NORTH, SOVA) with live sites, public source, and 36 screenshots carrying SHA-256 capture receipts. No portrait, testimonials, client logos or measured outcomes exist, and none may be invented.

The user confirmed the one thing a visitor should remember: **end-to-end ownership** — one person from idea to launch. Nothing from the previous identity was required to survive.

Audit of the previous build (screens in `artifacts/portfolio-interactions/after/`):

- Strengths kept: real screenshots with provenance, honest concept labels and demo limits, keyboard and touch parity, reduced-motion path, no-JS readability, contact flows that work without a backend, 23 browser tests, Axe-clean routes.
- Weaknesses replaced: the look sat in the generic AI-portfolio cluster (cream paper, cobalt accent, tight sans, mono eyebrow labels, 01/02/03 section numbers); the hero was the category split (copy left, product right, thumbnail row); about a fifth of the text was 8–11 px; projects repeated one tinted-box shell; nothing on the page dramatized ownership.

## 2. Creative direction

Process: Impeccable's direction round (`concept-seed`, key `3eea6f70`) dealt the fifth of seven grounded candidates. The user chose it on the decision page.

**Edition of Six.** A portfolio was originally a case of prints: works pulled, signed and numbered by one hand. The site borrows that system because it states ownership without a claim:

- the hero is a **credits ledger** — Discover, Design, Build, Test, Launch — with "Alson Chua" credited on every line;
- every project is a **numbered plate** (1/6 … 6/6) with a debossed plate mark and an italic inscription (title, edition, "A. Chua, 2026");
- each case study opens as a **catalogue entry** whose Provenance line is real data: the screenshot receipts (capture date, HTTP status, SHA-256);
- a vermilion **AC chop** replaces the logo (a stamped mark, not a forged signature);
- the close is an **ink slab**: "Commission the seventh."
- the hero status line and sheet tabs sit under the plate; the header keeps a plain underlined "Start a Project" so the hero owns the only press-black block.

The six challengers the roll dealt were declined, and each donated one discipline: all six works present at once and struck forward without a cross-fade; direct 1–6 keys; lines that draw rather than fade; a live studio clock (GMT+8); one process stage per full-width row with its result; labels on the object instead of eyebrows.

Why it fits: it is truthful (the concepts are one person's editions), it reads to all three audiences without jargon, and the screenshots keep their own colours on a quiet sheet.

## 3. Design system

Recorded in `DESIGN.md`; the direction contract is in `.impeccable/surfaces/app-page-tsx.md` (development only, not shipped).

- **Colour (restrained, material):** sheet `#f2f1ec`, mount `#f8f7f3`, pressed `#ebeae4`, press ink `#151413`, graphite `#5e5c57` (5.9:1), graphite-faint `#8a877f` (large text only), rules `#d6d3ca` / `#b3afa4`, chop `#cf3a1e` (marks only), chop ink `#b0301a` (5.6:1, form error text only). The ink slab and footer invert to press ink.
- **Type:** Schibsted Grotesk Variable for display and UI (weights 500–650, tracking −0.022 to −0.045 em, fluid `clamp()` sizes); Libre Caslon Text italic for inscriptions, notes and credits; system mono only for SHA-256 hashes. Body 17 px (16 px under 1024 px); nothing interactive under 13 px.
- **Layout:** 1328 px max, `clamp(20px, 4vw, 56px)` gutters, 12-column spreads; hairline rules instead of cards; one elevation (the mounted sheet: 1 px edge plus a soft offset shadow).
- **Components:** `Chop`, `PlateImage` + `Inscription` (`components/plate.tsx`), the hero `HeroShowcase` sheet stack, `ProjectCard` spreads (wide, mirrored, diptych, desktop-with-phone), `Process` rows, catalogue `dl`, ink-slab `ContactCTA`, colophon footer.

## 4. Implementation summary

| Area | Result | Files |
|---|---|---|
| Tokens, type, components, motion | Full stylesheet rewrite; Manrope removed | `app/globals.css`, `package.json` |
| Shell | Chop brand, glassine header when scrolled, ink-black CTA, mobile sheet menu, colophon footer | `components/navigation.tsx`, `components/footer.tsx`, `components/chop.tsx` |
| Home | Credits-ledger h1, plate with sheet stack and 1–6 keys, "An edition of six" spreads, commissions list, five-row process, colophon, ink slab | `app/page.tsx`, `components/hero-showcase.tsx`, `components/project-card.tsx`, `components/process.tsx`, `components/ui.tsx` |
| Case studies | Work n of 6, catalogue entry with provenance from receipts, plate-framed screenshots, margin index, eyebrow-free headings, next work as a plate | `app/work/[slug]/page.tsx`, `lib/provenance.ts` |
| Inner pages | Work, Services (commissions), About (studio mark instead of an invented portrait), Contact (order-sheet form), 404 | `app/*/page.tsx` |
| Data | Process steps gain "what exists after"; `shortTitle()` helper | `data/services.ts`, `data/projects.ts` |
| Identity assets | Chop favicon; ledger social image | `app/icon.svg`, `app/opengraph-image.tsx` |

Preserved unchanged: all routes, redirects, metadata and indexing rules, project content and order, live/source URLs, contact destinations and WhatsApp text, the form's validation, delivery, honeypot, idempotency and fallbacks, analytics hooks, screenshot assets and receipts.

## 5. Motion system

Motion thesis: things are **printed**, not faded.

- **Focal sequence (load):** ledger rules draw left to right (80 ms stagger), stage words rise from their rule, credits ink in, the hero sheet settles and a translucent glassine leaf lifts off the plate (980 ms, `cubic-bezier(.7,0,.2,1)`).
- **Pull on entry:** below the fold each plate is pulled once — a glassine leaf (translucent, backdrop-blurred) slides off while the plate mark draws (IntersectionObserver via the existing `MotionObserver`; content is visible without JS).
- **Continuity:** a React `ViewTransition` morphs a project plate into its case-study hero (`plate-<slug>`, 520 ms).
- **State:** hero sheets switch instantly with the chosen tab struck forward 8 px (an ink underline on the tablet and phone strip); 1–6 and arrow keys select; index underlines draw; buttons press 1 px with an inset shadow.
- **Timing:** feedback 140 ms, state 220 ms, arrival 760 ms; easing `cubic-bezier(.16,1,.3,1)`.
- **Reduced motion:** no travel, wipes, draws or morphs; state colour changes remain. No scroll hijacking, autoplay, cursor replacement or new runtime dependency.

## 6. Responsive and technical QA

| Check | Result |
|---|---|
| `npm run lint`, `npm run typecheck`, `npm test` | Pass; 18 of 18 unit/content/contact tests |
| `npm run build` | Pass (Next.js 16.3.6, Turbopack); 18 static/SSG routes |
| `PORTFOLIO_QA_DIR=artifacts/edition-of-six npx playwright test --workers=1` | **23 of 23 passed** on the final build: 11 routes at 375/390/430/768/1024/1440 (66 combinations, loaded images, one h1, no horizontal overflow, no page errors), mobile menu focus/Escape, keyboard and touch hero selection, collection and case anchors, previous/next, pointer badge bounds, no-JS reading, contact validation/mock delivery/copy fallback, reduced motion, **Axe WCAG 2 A/AA + 2.1 AA: 0 violations on all 11 routes** |
| `npm run test:public` (isolated `.next-public`, fixture domain) | All public routes, canonicals, 308 legacy redirect, retired 404s, robots, sitemap and direct contact verified |
| Lighthouse, mobile lab, local production fixture (final run) | `/` **94** — LCP 2.9 s, FCP 1.5 s, TBT 20 ms, CLS 0. `/work/vanta` **97** — LCP 2.6 s, TBT 20 ms, CLS 0.002. `/contact` **97** — LCP 2.5 s, TBT 20 ms, CLS 0. Accessibility, best practices and SEO 100 on all three. Reports in `artifacts/edition-of-six/lighthouse/` |
| Impeccable detector on all changed UI files | 0 findings |
| Hero first-screen check (production) | Plate image top at y = 158 (1440×900), 141 (1024), 135 (768), 553–561 (375–430 phones); width ≥ 295 px everywhere |
| Shared-element morph | Verified in headless Chrome: `::view-transition-group(plate-nexa)` ran and finished on a home → case navigation |
| Console | No errors on 7 routes in production; only the expected 404 on an unknown route |

Previous build for comparison (from `docs/portfolio-interaction-handoff.md`, same method): `/` 94 / LCP 3.0 s, `/work/vanta` 99 / LCP 2.1 s, `/contact` 96 / LCP 2.6 s. Home and contact LCP improved slightly; the case route's LCP is 0.5 s slower in this lab run. Lab variance between runs is a few hundred milliseconds, so treat these as comparable, not as a measured gain or loss.

Not measured: field Core Web Vitals or INP, Safari and Firefox (view transitions and the backdrop-filter glassine degrade gracefully there but were not checked), physical phones, screen-reader acceptance. Home LCP (2.9 s lab) does not meet the 2.5 s target.

Evidence note: Playwright's `fullPage` screenshots mis-resolve `vw` units after a page has been scrolled, which made some headings look small in captures. The review evidence in `.impeccable/review/` was therefore captured by scrolling real viewports and stitching; the live pages compute correctly (verified with `getComputedStyle`). The suite's own full-page captures in `artifacts/edition-of-six/responsive/` can show the same artefact.

**Documentation pass.** The Impeccable documenter wrote `DESIGN.md` and `.impeccable/design.json` from the built code and reported inconsistencies. Fixed afterwards:
- Placeholder text now reaches 4.5:1 (graphite).
- Control boundaries now reach 3:1 (Faint Graphite instead of the 1.9:1 hairline) on fields, secondary buttons and filters.
- The remaining labels above headings are gone (404 page, next-work note).
- A no-op focus rule and two unused rules were removed.
- Four stray colours now map to tokens.
- The social image uses the real chop path.

The final suite after these changes: 18/18 unit tests and **23/23 browser tests** passed, with Axe clean.

## 7. Review and scorecard

**Independent finish review.** A fresh reviewer agent with no access to the build conversation judged the production captures against the direction contract. Persistence, type, material and ground all scored as a match. The verdict was **fix**, with eight material findings:

1. A label row sat above the case h1.
2. Italic labels sat above page intros and process results.
3. The first-viewport plate was outweighed by the ledger.
4. Two boxed six-item grids appeared together on mobile.
5. Vermilion was used as a general accent.
6. Services and values carried numbers with no sequence.
7. The mount was reused as a card for the contact form and the About profile.
8. Tracking went below the floor, the colophon type was oversized, the title repeated, and two press-black CTAs shared one viewport.

All eight were fixed in one batch. The first verdict pass scored 1–7 resolved and 8 partial. The remainder of 8 was fixed and the second verdict pass returned **ship**. That verdict covers those fixes and is not a new full review. Motion could not be judged from stills.

**Scorecard (1–10).** Each score is backed by the evidence above. Where evidence is thin, the score says so.

| Category | Score | Evidence and limits |
|---|---:|---|
| Typography | 8.5 | Two voices with a clear job each: Schibsted Grotesk for statements, Libre Caslon italic for the hand. Fluid scale; tracking within −0.035 em; no text under 13 px; the reviewer scored type a match. |
| Layout | 8 | 12-column spreads vary by work (wide, mirrored, diptych, desktop + phone). The first viewport is rebalanced (plate 594 px wide; right column ends at 720 against 770). Diptych companions are small on desktop. |
| Whitespace | 8 | One rhythm (`clamp` section padding, 80–148 px between spreads), with more space above headings than below. Long quiet stretches between spreads at 1440 px are deliberate but could feel slow to some visitors. |
| Visual hierarchy | 8.5 | One press-black action per viewport; ledger, then plate, then actions; catalogue facts in a ruled `dl`. |
| Color | 8 | Restrained and disciplined: vermilion only on the chop and status marks. Axe found no contrast failures. The palette is intentionally quiet so the six screenshots supply colour. |
| Motion design | 7.5 | An authored load sequence, a once-only pull with plate marks drawing, and a plate-to-case shared-element morph, all with a reduced-motion path. Verified mechanically in headless Chrome only; no human review on real devices. |
| Micro-interactions | 8 | Sheet tabs struck forward, 1–6 and arrow keys, drawing underlines, 1 px press with an inset shadow, a bounded pointer badge, a live studio clock. |
| Responsiveness | 8.5 | 66 route/width combinations clean. Dedicated tablet (two-column hero, tab strip) and phone (numeral strip) compositions. Plate in the first screen at every width. |
| Originality | 8.5 | The print-portfolio system (credits ledger, n/6 plates, catalogue entry, provenance hashes, chop) is specific to a one-person portfolio and is not a template look. |
| Usability | 8.5 | 23/23 browser tests, including keyboard, touch, no-JS, contact flows and Axe. Contact is one step away on every page. |
| Performance | 7.5 | Lighthouse 94/97/97 (lab), TBT 20 ms, CLS ≤ 0.002. Home LCP 2.9 s misses the 2.5 s target. No new runtime dependency; two self-hosted font files (~74 KB). |
| Consistency | 8.5 | One token set and component grammar across all 11 routes. Review inconsistencies were removed. Detector: 0 findings. |
| Brand fit | 9 | Directly dramatizes the one thing the user said a visitor should remember — end-to-end ownership — with truthful material (credits, edition numbers, provenance). |

No category reaches 9 except brand fit. Moving the others up needs evidence this run could not produce: device testing, field performance, and human review of motion.

## 8. Remaining opportunities

1. **Home LCP under 2.5 s.** Move the two faces to `next/font/local`, which gives preload hints and size-adjusted fallbacks. Then test whether the hero plate can drop to a lighter `quality`, or whether the below-fold covers can load later on phones.
2. **Real-device and cross-browser pass.** Check Safari and Firefox (view transitions, backdrop-filter), a mid-range Android phone (pull animation smoothness), and VoiceOver/TalkBack on the ledger h1 and sheet tabs.
3. **Human motion review.** Watch the load sequence and the pulls at full speed. The reviewer could only judge stills.
4. **Real material when it exists.** A real portrait or studio photograph for About, and authorized testimonials or client work. `components/social-proof.tsx` is ready and renders nothing while empty. Never fabricate these.
5. **Diptych detail.** Companion plates (NEXA dashboard, ATELIER project page) are small on desktop. An enlarge or lightbox interaction would let visitors inspect them.
6. **Type-scale consolidation.** With DESIGN.md in place, the Impeccable detector reports 26 font sizes that sit off the documented ramp. Most are fluid `clamp()` endpoints between documented roles. Folding them into a smaller set of type tokens would make the system easier to extend. Colour drift is zero.
7. **Social image fonts.** The Open Graph image now uses the real chop. It still renders the credits in the renderer default sans and italic; it needs static TTF/WOFF files of the two faces, because Satori cannot read the variable woff2.
8. **Ship.** Nothing is committed or deployed. Commit on a branch, review the diff, and deploy to the existing Vercel project when ready.
