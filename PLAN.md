# Six-project portfolio hub

## Product objective

Present Alson Chua's independent design and frontend development work across automotive, SaaS, fashion, hospitality, architecture, and skincare. The portfolio connects a visitor's first impression to a detailed case, a live demonstration, and a real freelance conversation.

## Architecture

Keep all six applications in their own repositories and deployments. One typed project collection drives the hub's presentation, case routes, metadata, next navigation, and image capture. Personal identity and contact messages live in `lib/site.ts`. The shared Next.js case template renders each project's actual content without embedding or copying its application.

## Design contract

Edition of Six (October 2026): the portfolio is presented as a fine-art print portfolio. Rag-white sheet, press-black ink, graphite pencil, and one vermilion AC chop; Schibsted Grotesk for display and interface, Libre Caslon italic for inscriptions. Each project is a numbered plate (n/6) with a debossed plate mark and a typeset inscription; the hero is a credits ledger crediting Alson Chua at every stage from Discover to Launch. Project screenshots supply industry-specific colour. Spreads vary by project: wide plate, diptych, mirrored, and desktop-with-phone. See DESIGN.md.

## Content contract

All six are Independent Concept Project, 2026. Explain objectives as design intent and capabilities as implemented frontend behavior. Show actual screenshots with provenance. State local/demo behavior where appropriate; never imply real clients, commissioned buildings, live AI services, booking confirmations, payments, or measured business outcomes.

## Conversion

Primary CTA: Start a Project. Cases and live/source actions remain easy to find. External destinations open a new tab to preserve the visitor's portfolio context. Email, WhatsApp, and LinkedIn are prominent; GitHub is secondary. A brief can be shared through a mail client, prepared WhatsApp message, or clipboard without backend credentials. Optional provider delivery retains explicit validation and receipt behavior.

## Verification and delivery

Run lint, typecheck, unit tests, and production build. Check eleven pages at 375/390/430/768/1024/1440, navigation, image loading, links, contacts, reduced motion, and automated accessibility. Inspect deployed destinations and record blocks honestly. Verify production metadata, sitemap, and representative Lighthouse routes. Retain evidence and a five-part integration report; prepare local changes without automatically publishing them.
