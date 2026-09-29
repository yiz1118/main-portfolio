# Freelance Portfolio V1

## Product goal and audiences
Win international freelance web/app inquiries through clear services, credible project evidence, and a straightforward contact path. Primary audiences: startup founders, small businesses, entrepreneurs, and agency partners. Positioning: Web & App Developer | Websites, MVPs, Dashboards & AI Integrations. English V1; game development supports the story without dominating it.

## Information architecture and pages
Home: hero, selected work, services, six-step process, personal introduction, contact CTA. Work index: category filters and project evidence/status. Case studies: overview, problem, goal, role, solution, features, flow, architecture, process, challenges, screenshots, technologies, result, CTA. Services: five concrete offerings. About: background and accountable AI-assisted workflow. Contact: validated inquiry and alternative contact methods. No blog, auth, or CMS in V1.

## Technical architecture
Next.js App Router, React, strict TypeScript, Tailwind, Lucide, npm lockfile. Server-rendered pages and small interactive components. Typed project/service/site configuration. Draft projects visible in preview, excluded from production listing and sitemap. Provider-independent contact delivery with Resend via server-side fetch. No persistent inquiry database.

## Component architecture
Shared navigation/footer, buttons, page intros, section labels, project cards, visual illustration frames, metadata, architecture diagrams, service rows, process section, and contact fields. Single shared case-study layout. CSS variables define visual tokens.

## Content strategy
Audit existing 榕城寻印, 创序 Agent, and LabelLens as candidates. Publish no unverified client classification, personal role, metrics, or live status. Keep private source evidence in internal documentation. Mark missing facts [NEEDS MY CONTENT]. Designed visuals are explicitly illustrations, never screenshots. Real identity/social/photo/availability remain configurable. Unfinished content uses publicationStatus=draft.

## Design system
Warm white #F8F8F5, ink #191C20, muted #5F6369, accent cobalt #2348D4; thin neutral borders. Locally served Manrope plus system monospace metadata. Editorial hierarchy, 1200px container, generous whitespace, lightly rounded product frames. Single-column mobile work/form layouts; 44px touch targets. CSS-only brief hover feedback; reduced motion; semantic HTML, visible focus, accessible mobile navigation.

## SEO and performance
Per-page and project metadata, generated social image, robots, sitemap, production canonicals from configured URL. Noindex previews and drafts. Optimized images with dimensions, local fonts, minimal client JS. Analytics event interface remains disabled. Target Lighthouse 90+ in all four categories on content pages; measure against production build and report noindex impact honestly.

## Contact/security
Shared validation, same-origin JSON POST, 16KiB request limit, honeypot, stable submission id, fixed sender/reply-to, provider timeout, no content/secret logs. Explicit unconfigured/error/sending/accepted states. No false sent status. Copyable brief fallback. Production delivery requires provider configuration plus deployment rate limiting confirmation.

## Deployment
Prepare Vercel build and document environment variables; do not deploy automatically. Add verified identity/content, configure domain and Resend verified sender, configure rate limiting, deploy preview, verify live delivery/routes, then enable indexing. README covers setup, scripts, authoring, deployment and acceptance gates.

## Verification
Lint, typecheck, tests, production build. Focused contact/content tests and browser integration tests. Render every page at 375/390/430/768/1024/1440. Check keyboard/mobile navigation, form validation and failures, links, images, unknown slugs, metadata/sitemap/robots, draft/public behavior, reduced motion, accessibility and Lighthouse. Review as founder, small-business owner, agency, frontend engineer, designer, and mobile visitor; fix issues before handover.
