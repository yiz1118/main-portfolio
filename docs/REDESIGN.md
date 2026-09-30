# Main portfolio redesign — 30 September 2026

## Audit before implementation

Inspected every main portfolio page, shared navigation/footer/UI, central project and service content, contact form, layout, metadata, and existing responsive CSS. The six sibling applications remain separate. Baseline browser receipts are in `artifacts/redesign/baseline/audit.json` with desktop and mobile viewport captures.

| Before | Planned change | Why |
| --- | --- | --- |
| Homepage contains 664 visible main-content words. The first screenshot begins at 1,167px on desktop and 1,133px at 390px. | A short identity statement beside a real, manually browsable project preview. | Visitors should see the work within the first screen. |
| Each project repeats a statement and a description underneath its screenshot. | Keep one statement, project type, and two actions. | Images should dominate the reading. |
| Six showcases have mostly similar ruled headers and relatively quiet typography. | Larger titles and screenshots; graphite, cool, fashion, warm, architectural, and organic frames. | Demonstrate range without fragmenting the portfolio identity. |
| Five service descriptions, six process descriptions, two biography paragraphs, and a paragraph-led CTA repeat the hero's positioning. | Six capabilities, five short process steps, a concise personal introduction, and oversized contact typography. | Preserve scope and contact clarity with less scrolling. |
| NEXA's 729-word case study puts overview, brief, design, and four feature explanations before its gallery. All cases share that template. | Alternate brief, desktop screenshot, design notes, screenshots, mobile view, and technical highlights. | Show the interface at the moment its decisions are discussed. |
| About repeats scope, approach, tools, responsibility, and concept-project context. | Short biography, explicit responsibility, compact principles, real project previews. | Make the background easier to skim. |
| Services repeats an outcome below each list. Contact repeats intended client types. | Remove repeated outcomes and compress contact introduction. | Keep useful deliverables and working contact paths. |
| Desktop and mobile have no horizontal overflow at 375/390/430/768/1024/1440. Mobile project compositions shrink desktop overlays. | Preserve responsive correctness; prioritize one large visual on mobile. | Small dashboard overlays are difficult to inspect. |
| Motion is primarily hover scaling; navigation has no scroll state. | Shared once-only reveal observer, image scale/reveal, restrained stagger, scroll-aware sticky navigation, and short UI transitions. | Add rhythm while keeping navigation immediate. |

## Design contract

- Identity: Alson Chua, Independent Web & App Developer; Malaysia, working worldwide.
- Direction: neutral paper, graphite, cobalt detail; oversized Manrope typography, mono indices, precise rules, deliberate asymmetry.
- Hero: actual project imagery, manual six-project selector, no autoplay. One image at a time on mobile.
- Work: all six projects in existing order, prominent imagery, concise statement, case study and live site actions, honest independent-concept labels.
- Cases: all important implementation and demonstration limits preserved; screenshots alternate with concise content.
- Motion: native scrolling; CSS opacity/transform; one observer; no animation dependency; reduced motion and keyboard interaction stay immediate.
- Quality gates: all eleven routes at six widths, loaded imagery, keyboard/touch/hover behavior, contact paths, reduced motion, automated accessibility, lint/types/tests/build, production performance measurement.
- No fabricated portrait, clients, testimonials, business outcomes, or production capability claims.

## Implementation and verification

Implemented in the main portfolio only. The six sibling repositories and deployments were left untouched.

- The homepage is now 383 visible main-content words at 1440px and 381 at 390px. A real VANTA screenshot appears at 182px on desktop and 453px on mobile, with keyboard-accessible manual previews for all six projects.
- The six homepage showcases use large contextual frames: graphite VANTA, cool NEXA, chalk FORM / 27, warm EMBER, architectural ATELIER, and organic SOVA. Mobile keeps one primary visual at a time.
- Services are six compact capabilities. Process is five short steps. About is a concise personal story with a future-proof portrait slot. The final CTA uses oversized type with direct WhatsApp and email actions.
- Case studies now follow visual rhythm: hero, short concept, brief, large screenshot, design notes, gallery, experience list, mobile composition, technical highlights, capabilities, next project, and contact.
- The shared `MotionObserver` progressively enhances below-fold sections once, with opacity/transform only. The hero is visible immediately, project previews are manual rather than autoplay, hover is gated to fine pointers, and reduced motion removes movement.
- Explanatory project copy was reduced by 43.3–48.0% across the six central records. Demo limitations, concept attribution, roles, stack, live URLs, and source URLs remain explicit.

Verification completed 30 September 2026:

- `npm run check`: lint, TypeScript, 18 unit/content/contact tests, and production build passed.
- `npm run test:browser -- --workers=1`: 18 tests passed, including 66 page/viewport combinations at 375, 390, 430, 768, 1024, and 1440px, navigation, links, contact states, touch, hover, reduced motion, and Axe accessibility.
- Isolated public build: all 11 routes, redirects, 404s, canonical metadata, robots, sitemap, and direct contact passed. Lighthouse was 93 performance on `/`, 98 on `/work/vanta`, and 98 on `/contact`; accessibility, best practices, and SEO were 100 on all three.
- 12 primary project/live-source destinations opened with HTTP 200. Supporting project-page checks passed. LinkedIn returned HTTP 999 from the automated browser, so the supplied URL is preserved and recorded as network-unverifiable.
- Review material is under `artifacts/redesign/`, including baseline audit metrics, responsive screenshots, copy-reduction measurements, public-build results, link receipts, preview smoke output, and visual-review boards.
