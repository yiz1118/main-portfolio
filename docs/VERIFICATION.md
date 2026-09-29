# Six-project integration verification

Verified locally on 2026-09-29 in `Portfolio website/main-portfolio`. The portfolio changes are local and have not been deployed. The six external concept applications were already deployed by the user and were inspected at their supplied URLs.

| Check | Evidence and result |
| --- | --- |
| Lint | `npm run lint` passed |
| TypeScript | `npm run typecheck` passed; production build also checked types |
| Unit tests | 18 passed: contact behavior, six-project contract, exact capture hashes, next order, canonical policy, message encoding |
| Production build | Passed; all six `/work/[slug]` cases generated |
| Browser acceptance | 15 Playwright tests passed against the compiled build |
| Responsive pages | Eleven pages at 375, 390, 430, 768, 1024, and 1440 px: 66 combinations, loaded images, one h1, no horizontal overflow |
| Actual direct-contact page | Checked separately at all six widths without a provider; email/WhatsApp brief controls and clipboard passed |
| Navigation | Mobile focus, Escape, route closing, collection filters, case/live links, and cyclic next navigation passed |
| Links and assets | Internal routes and screenshot links resolve; all 36 presentation assets match successful capture receipts |
| Public-mode SEO | All eleven routes, canonical paths, indexing, robots, six sitemap cases, 308 legacy index redirect, and retired-case 404s passed |
| Preview SEO | Eleven routes have title, description, Open Graph, Twitter card, and noindex |
| Accessibility | Zero automated axe WCAG 2 A/AA and 2.1 AA violations on eleven page types; navigation and contact focus behavior checked |
| Reduced motion | Nonessential transitions suppressed under reduced-motion preference |
| External sites | All six live sites and all six repository pages opened in Chrome with HTTP 200 |
| Other destinations | 23 case-feature page destinations, GitHub profile, and WhatsApp returned 200; LinkedIn returned 999, blocking automated verification |

## Lighthouse

Measured on an isolated local production build with indexing enabled and a test canonical origin. These are lab measurements, not live deployment or field Core Web Vitals evidence.

| Route | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 94 | 100 | 100 | 100 |
| `/work/vanta` | 95 | 100 | 100 | 100 |
| `/contact` | 99 | 100 | 100 | 100 |

## Evidence locations

- `artifacts/integration/screenshot-receipts.json`: 36 captures with live URL, viewport, status, timestamp, and file hash; zero capture failures.
- `artifacts/integration/external-links.json`: twelve browser openings and 26 additional destinations checked; the LinkedIn block is recorded rather than marked successful.
- `artifacts/integration/responsive/`: 66 page captures plus six direct-contact captures.
- `artifacts/integration/review/`: review boards and editorial presentation captures.
- `artifacts/reports/preview-smoke.json`: normal local contact and metadata evidence.
- `artifacts/reports/public-build.json`: isolated production route, robots, sitemap, and Lighthouse evidence.
- `artifacts/lighthouse/`: current homepage, VANTA case, and contact reports. Other files in this directory are historical V1 reports.

Visual inspection covered the shared shell, project presentations, case headers, mobile screenshot sections, contact layout, and the six-width review boards. Capture tooling waits for fonts and visible media; screenshots preserve the deployed interfaces. No physical-device, screen-reader, inbox-delivery, or new public-deployment result is claimed.

The browser contact acceptance test uses a mocked provider. The normal local endpoint remains unconfigured and returns 503; direct email and WhatsApp preparation still work. No actual email, WhatsApp message, reservation, purchase, or database write occurred.
