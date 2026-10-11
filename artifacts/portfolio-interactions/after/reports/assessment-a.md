# Assessment A — independent design review

Reviewer: `/root/design_assessment`. Method: source inspection, 24 fresh Chrome page/viewport visits and supplied after screenshots. Reviewed `/`, `/work`, `/services`, `/about`, `/contact`, `/work/vanta`, `/work/nexa`, `/work/atelier` at 375, 768 and 1440 pixels. The reviewer did not run or read the detector, Assessment B, or other reviewer findings. This file is the parent's faithful condensed record of the returned assessment; the inspected runtime preceded the final polish rebuild.

## Design specificity

Authored and coherent. Paper, cobalt, Manrope, numbered indexes and generous editorial spacing provide a consistent frame, while automotive, SaaS, fashion, hospitality, architecture and skincare retain different compositions and actual imagery. The six-project preview helps visitors compare work before committing to a case study. Image exploration, enlargement, section navigation and repeated contact routes support inspection and inquiry. Familiar oversized headings and final contact typography are applied consistently rather than arbitrarily.

## Heuristics

| Heuristic | Score | Evidence |
|---|---:|---|
| Visibility of system status | 3 | Preview selection, active navigation, section state, filter results, errors and copy feedback work. |
| Match with real world | 4 | Familiar navigation, plain services, explicit concept/demo boundaries. |
| User control and freedom | 4 | Manual selection, reset, native back links, section jumps, previous/next, Escape/focus return. |
| Consistency and standards | 3 | Coherent system; four new-tab contact links lacked existing announcements. |
| Error prevention | 3 | Required/optional labels, types, autocomplete, limits and validation; actual delivery not inspected. |
| Recognition rather than recall | 3 | Named previews, indexes and case links; tablet selector cramped. |
| Flexibility and efficiency | n/a | Application customization is not necessary for a persuasive portfolio; keyboard paths were checked. |
| Aesthetic and minimalist design | 3 | Strong hierarchy and restrained motion; compact selector and disclosure weaknesses. |
| Error recovery | 3 | Four empty-form errors, Name focus and Copy confirmation; no external delivery exercised. |
| Help and documentation | n/a | Dedicated product help does not apply; contextual contact and demo guidance does. |
| Total | **26/32** | Good, 81.25%; eight applicable heuristics. |

## Strengths

The actual work is the main evidence. VANTA's dark automotive composition, NEXA's layered interface and ATELIER's architectural imagery remain distinct. Manual preview selection preserves control; End selected SOVA and moved focus at all three widths. Mobile navigation focused Work and Escape returned focus to its trigger. Contact messages explain exactly what copying and sharing do; empty submission identifies four fields and focuses Name.

## Issues and final-batch response

1. **P2: hidden concept caption below 1024px.** Fresh 375/768 inspection confirmed `app/globals.css` hid “Independent concept.” Keep the same label visible and let it wrap. Parent removed the hide rule and enabled wrapping.
2. **P2: cramped tablet selector.** At 768px its container ended at x=736 but SOVA ended at x=756.61, 20.61px outside the frame. Document itself did not overflow. FORM / 27 broke the number/name rhythm. Parent changed <=1023px to three columns and two rows, retaining 44px targets.
3. **P3: four new-tab announcements missing.** Contact's WhatsApp, LinkedIn and GitHub alternatives, plus form “Share on WhatsApp,” lacked the shared accessible announcement. Parent added the established hidden text; visible copy and destinations remain the same. This is DOM/browser evidence, not native screen-reader acceptance.

The parent also identified tiny mobile thumbnails and transparent-header ghost content before final rebuild, and corrected both in the same polish batch. Final runtime confirmation is recorded in the handoff and verification reports rather than changing this original assessment score.

## Cognitive load and emotional path

Two literal checklist weaknesses: six preview/collection options and seven case sections exceed four-item chunk/choice guidance. This is moderate cognitive load under the reference, not an instruction to remove the six concepts. Clear compact grouping and the index address the concrete issue. Other checklist items passed: focus, grouping, hierarchy, one decision at a time, low recall demands and progressive disclosure.

The inspected homepage was 9627px tall at 1440 and 7143px at 375, so collection navigation is useful. Fresh ATELIER/VANTA jumps and return-to-top restored the expected location. Arrival is confident, industry variation supplies the emotional peak, cases give an analytical phase, services/About reassure and contact provides clear alternatives. Compact selector crowding and missing disclosure were the observed valleys.

## Personas and minor observations

- First-time visitor: initial mobile/tablet disclosure was missing; other project boundaries and navigation were clear.
- Distracted mobile visitor: touch menu and local contact worked. Contact form starts around 812px at 375, following immediately discoverable direct alternatives; a deliberate ordering tradeoff, not an observed blocker.
- Keyboard visitor: previews, section links, Escape and validation focus worked; new-tab announcements needed consistency.
- No AGENTS.md Design Context was found in the repository or two inspected parents; no project-specific personas were invented.
- “Budget range” offers conversational preferences rather than ranges. This small existing label mismatch is outside interaction priorities.
- Some supplied capture positions initially suggested a section-state mismatch; fresh runtime jumps did not reproduce it, so the reviewer did not report it as a defect.

## Run notes

24 fresh page/width combinations had no document overflow. Keyboard, mouse, emulated touch and reduced motion were exercised. Browser instances were closed; shared port 3000 remained running. Reviewer made no file writes. Detector output remained isolated. Physical device/native screen-reader acceptance was not established. Questions skipped: implementation scope already authorized by the user.
