# Alson Chua — Freelance Portfolio

A portfolio hub for Alson Chua, Independent Web & App Developer, based in Malaysia and working with clients worldwide. The homepage presents six independent concept projects; shared case studies explain their design, experience, responsive behavior, and implementation.

The six applications remain separate repositories and deployments. This repository contains their metadata, editorial presentations, case-study content, and real screenshots. It does not import their application source.

## Run locally

The installed stack is Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, locally served Manrope, and Lucide with SVG social marks.

```powershell
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000/). No credentials are required for the site or direct email/WhatsApp contact flow.

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Contact, content, capture-receipt, and link-encoding checks |
| `npm run build` | Optimized production build |
| `npm start` | Serve the compiled build |
| `npm run check` | Lint, types, tests, build |
| `npm run test:browser -- --workers=1` | Eleven pages at six widths, navigation, links, contact states, accessibility |
| `npm run test:public` | Isolated public-mode build, sitemap, metadata, redirects, and Lighthouse |
| `npm run capture:projects` | Recapture the deployed projects with Chrome and save WebP assets and receipts |
| `npm run verify:links` | Open all six live sites and repositories; check the case-page and contact destinations |

Browser and capture scripts use installed Google Chrome. Browser tests start port 3101 with a test-only mocked email provider. Public-mode verification uses `.next-public/`, port 3102, and `https://portfolio.example` as a canonical test fixture. These tests send no real email or messages and do not deploy the site.

## Content architecture

| Location | Responsibility |
| --- | --- |
| `data/projects.ts` | Ordered project records, live/source URLs, all case text, image paths, captions, and page paths |
| `lib/site.ts` | Supplied public identity, contact destinations, encoded messages, canonical origin, and form options |
| `app/page.tsx` | Homepage with all six large editorial presentations |
| `app/work/page.tsx` | Filterable project collection |
| `app/work/[slug]/page.tsx` | Shared case template and generated project metadata |
| `components/project-card.tsx` | Editorial project presentation with project-specific composition |
| `components/contact-links.tsx` | Email, WhatsApp, LinkedIn, and optional secondary GitHub links |
| `public/projects/{slug}/` | Six actual deployed-interface captures per project |
| `scripts/` | Screenshot capture and external-link verification |
| `artifacts/integration/` | Capture receipts, link receipts, responsive screenshots, and visual review |

Each record is labeled **Independent Concept Project**, year **2026**. Roles, services, stack, objectives, design decisions, page features, responsive behavior, implementation, skills, and demonstration limitations are explicit. No client results, real transactions, testimonials, or awards are implied.

Routes, in order: `/work/vanta`, `/work/nexa`, `/work/form27`, `/work/ember`, `/work/atelier`, `/work/sova`. Next-project navigation cycles through the same order. `/projects` redirects permanently to `/work`; matching new slugs redirect to their cases. Retired draft cases return 404.

## Image authoring

Each project directory contains `cover.webp`, `hero.webp`, `desktop-01.webp`, `desktop-02.webp`, `detail-01.webp`, and `mobile-01.webp`. These are screenshots of the actual deployed applications, including their own concept imagery. They are not generated mockups of interfaces.

`artifacts/integration/screenshot-receipts.json` records source URL, HTTP status, page title, viewport, capture time, byte size, and SHA-256. Tests compare every displayed file to its receipt. Recapture a specific missing or changed image with:

```powershell
npm run capture:projects -- form27 --image=desktop-02
```

The script uses project URLs and page paths from the central data, preserves receipts for unaffected images, and only records a successful capture after visible images load. Commit the image and its updated receipt together when publishing changes.

## Contact behavior

The primary CTA is **Start a Project**. Email, WhatsApp, and LinkedIn appear on the contact page, in shared CTAs, and in the footer. WhatsApp uses the exact supplied introductory message, URL-encoded. The project-brief form can open a mail client, prepare a WhatsApp message containing the entered brief, or copy the brief. Opening a prepared message does not send it automatically.

The existing server-side Resend adapter remains optional. When configured, the form posts to `/api/contact` and reports success only after an acceptance receipt. Shared validation, request limits, origin checks, honeypot, idempotency, timeout, and error preservation remain in place. Without configuration the endpoint returns 503, while direct contact continues to work. No inquiry database or automatic reply is implemented.

## Environment and publication

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Optional HTTPS canonical override; defaults to the supplied main portfolio URL |
| `SITE_MODE` | `production` enables public indexing eligibility; default local mode remains preview |
| `SITE_INDEXING` | `true` enables indexing in production only |
| `RESEND_API_KEY` | Optional server-only provider key |
| `CONTACT_FROM` | Optional verified provider sender |
| `CONTACT_TO` | Optional provider recipient |
| `CONTACT_RATE_LIMIT_READY` | Must be `true` for provider delivery in production |
| `PORTFOLIO_BUILD_DIR` | Optional build-directory override used by public-mode tests |

All six cases are visible in both local and production builds. Preview builds remain noindex and have an empty sitemap. An indexing-enabled production build lists all six cases with canonical `/work/` routes. Personal contact links work independently of provider credentials.

The implementation is prepared for the existing Vercel project. Deployment and server-delivery configuration are separate from local verification. No commit, push, deployment, provider configuration, or real message send was performed for this integration.

See [the integration report](docs/INTEGRATION.md), [verification evidence](docs/VERIFICATION.md), and [content status](docs/CONTENT.md).
