# Freelance Portfolio

An English-language freelance portfolio for websites, applications, MVPs, dashboards, and AI integrations. Built to communicate services, show reviewable project work, and support project inquiries.

## Stack and local setup

Next.js 16 App Router, React 19, strict TypeScript 6, Tailwind CSS 4, Lucide, and locally served Manrope. npm manages the lockfile. Node.js 24 LTS is recommended; Next.js requires Node >=20.9. TypeScript 6 and ESLint 9 are the latest compatible major versions for the installed Next.js lint plugins; their current dependency contracts exclude TypeScript 7 and ESLint 10.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. No secrets or environment variables are needed for the portfolio preview. Copy `.env.example` to `.env.local` only when configuring your own environment; never commit credentials.

| Script | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run lint` | ESLint |
| `npm run typecheck` | Strict TypeScript check |
| `npm test` | Contact and content tests |
| `npm run build` | Production compilation and route generation |
| `npm start` | Serve the compiled build |
| `npm run check` | Lint, types, tests, build |
| `npm run test:browser` | Production-build browser checks; requires installed Chrome and a completed build |
| `npm run test:public` | Build an isolated production fixture, verify draft exclusion/SEO, and measure Lighthouse |

Browser tests run a separate server on port 3101 with a **test-only mocked email provider**. They never send real inquiries. Screenshots go to `artifacts/screenshots/`; Playwright reports go to `playwright-report/`. Tests cover every page at 375/390/430/768/1024/1440px, keyboard navigation, links, contact states, SEO, reduced motion, and automated WCAG checks. Test-only provider loading is isolated in `tests/mock-email.mjs`; do not use that server command for normal hosting.

`npm run test:public` uses `.next-public/` and port 3102, with `https://portfolio.example` as an isolated canonical fixture. It does not deploy to that domain. Reports are saved in `artifacts/lighthouse/` and `artifacts/reports/public-build.json`. That Windows verification script uses the installed Chrome executable. Keep ports 3101/3102 available. `PORTFOLIO_BUILD_DIR` is an optional build/test output override; normal development and deployment use `.next/`.

Optional real testimonials and authorized logos can be added to `data/social-proof.ts`. Its component renders nothing when these arrays are empty.

## Architecture

```text
app/                  Pages, route handler, metadata, robots, sitemap, social image
components/           Shared navigation, footer, sections, work presentation, form
data/projects.ts      Typed case-study content
data/services.ts      Services and development process
lib/site.ts           Identity, contact links, budget options, publication settings
lib/contact.ts        Shared inquiry validation and copyable summary
lib/contact-handler.ts Request handling and delivery boundary
lib/delivery.ts       Provider interface and server-side Resend adapter
lib/analytics.ts      Optional event adapter; disabled by default
public/projects/      Local presentation illustrations and future screenshots
tests/                Focused unit and browser acceptance tests
docs/                 Content evidence, launch checklist and verification report
```

The content pages are server rendered, with small client components for navigation, filters, form and optional analytics. There is no CMS, authentication, inquiry database, or tracking dependency. API credentials are used only on the server. Private evidence paths remain in internal documentation, never project data.

## Identity and project authoring

Edit `lib/site.ts` to supply your public name, brand, email, LinkedIn, GitHub, optional portrait, and availability. Replace markers listed in `docs/CONTENT.md`. Blank social links and unavailable demos are omitted. Do not populate them with `#` or invented URLs.

Add a typed entry to `data/projects.ts`. Every case study supports overview, problem, goal, personal role, solution, features, user flow, architecture, process, challenges/resolutions, captioned screenshots, technologies, results, limitations, and optional demo/repository links. Place local images in `public/projects/`, then set their image paths and honest alt text. Use `kind: "screenshot"` only for actual product captures. Replace illustration captions before publishing actual imagery.

`publicationStatus` is independent from `projectType` and `developmentStatus`:

- `draft`: visible in preview, inaccessible and absent from listings in production.
- `published`: visible in both. Confirm attribution, classification, images and claims before switching.
- `projectType`: client, personal, concept, university, or experimental. Draft candidates currently omit it pending your confirmation.

All three initial projects are drafts. Therefore a production-mode build currently shows a polished work-preparation message instead of unconfirmed case studies. Adding draft case studies does not create actual public project proof; this is an explicit content gate.

## Environment variables

| Variable | Use |
|---|---|
| `SITE_URL` | Real HTTPS site origin; enables correct canonicals and social URLs |
| `SITE_MODE` | `preview` (default) or `production`; determines draft visibility at build time |
| `SITE_INDEXING` | `true` enables indexing only in production with a real HTTPS origin |
| `RESEND_API_KEY` | Server-only email provider credential |
| `CONTACT_FROM` | Sender on a domain verified in Resend |
| `CONTACT_TO` | Inquiry recipient |
| `CONTACT_RATE_LIMIT_READY` | `true` confirms deployment rate limiting; required for production delivery |

Vercel's `VERCEL_ENV=production` always hides drafts, even if `SITE_MODE=preview`. Publication changes require a rebuild. A preview build uses localhost as the social-image metadata base if no domain is configured; it does not generate a localhost canonical. Previews use noindex, disallow crawling, and an empty sitemap. A production build with indexing disabled is also noindex. Drafts never enter the public sitemap.

## Contact delivery

Without email configuration, the page explains that submission is unavailable and provides a copyable project brief. No success message is simulated. With configuration, the form posts to `/api/contact`. Shared validation checks required fields, lengths, options, email and a honeypot. The handler rejects foreign origins, non-JSON requests and bodies above 16KiB.

The provider uses a fixed sender, visitor Reply-To, plain-text content, a ten-second timeout and a stable idempotency key. Success means the provider returned an acceptance receipt; it does not prove inbox delivery. Input survives errors, and neither secrets nor inquiry bodies are logged. A future provider can implement `InquiryDelivery` without changing the form. No auto-reply emails are sent.

## Vercel deployment

1. Supply verified identity, contact details, screenshot assets and at least the intended published case studies. Review `docs/CONTENT.md`.
2. Import this folder as a Next.js project in Vercel, with `npm ci` installation and `npm run build`. Select Node.js 24.
3. Configure your actual domain and set `SITE_URL=https://your-real-domain` for production. Keep preview deployments unindexed.
4. Verify a sender domain in Resend; set `RESEND_API_KEY`, `CONTACT_FROM`, and `CONTACT_TO` as server-side environment variables.
5. In Vercel Firewall, configure a rate-limit rule for POST requests whose path is `/api/contact` (initial policy: five requests per minute per source IP). Validate this rule, then set `CONTACT_RATE_LIMIT_READY=true`. If the chosen hosting plan cannot enforce it, leave delivery disabled until a real limiting mechanism is in place.
6. Deploy a preview, verify navigation, responsive layouts, real contact submission and receipt in the intended inbox. The local test suite only proves mocked provider behavior.
7. For production, set `SITE_MODE=production`; enable `SITE_INDEXING=true` after reviewing real public content. Deploy again and verify robots, sitemap, canonicals, social image and draft exclusions.
8. Run a live review after domain assignment. No deployment, domain purchase, provider account setup, or real email send was performed by the local implementation.

## Performance and review

Local fonts, server-rendered content, CSS-only motion and local project visuals keep the page light. Next Image supports raster screenshot optimization when real screenshots are supplied. Current SVG illustrations are served directly. Reduced motion is supported.

See `docs/VERIFICATION.md` for measured checks and their limits. Lighthouse is laboratory evidence; field Core Web Vitals need real traffic. Before publication, review the site as a founder, small-business owner, agency partner, engineer, designer, and mobile visitor.
