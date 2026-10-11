# Assessment B — independent detector and browser evidence

Reviewer: `/root/evidence_assessment`. No Assessment A, parent findings or other reports were read. The reviewer made no repository writes; this is the parent's faithful condensed record of the returned assessment. The original inspected runtime preceded the final polish rebuild.

## Detector

The installed launcher completed one scan over eleven changed markup targets, with exit 0, stdout `[]`, no stderr and zero findings/rule counts/locations/false positives. Exact target list, launcher/engine and recovery accounting are in `detector.json`. An initial wrapper failed before launcher execution with “The network path was not found”; direct PowerShell invocation recovered. No completed scan was rerun. CSS was inspected manually rather than supplied as a markup scan target. `.impeccable/critique/ignore.md` was absent. Zero findings are limited to the detector and selected markup, not proof of overall quality.

## Browser evidence

Twelve fresh-context Chrome visits: `/`, `/services`, `/work/vanta`; 1440x1000 and 390x844; ordinary and reduced motion. All returned HTTP 200 with no document overflow, broken completed images or page errors. Correct titles/h1s and route current-page states were present. Reduced motion had `scroll-behavior: auto`, no pending reveals, and the same document heights as ordinary motion. Above-fold content was visible immediately; ordinary pending reveals were below the fold.

| Sample anchor | Target top | Header bottom | Context |
|---|---:|---:|---|
| Home VANTA, desktop | 180.39px | 89px | Index ends at 152px; VANTA current |
| Home VANTA, mobile | 109.66px | 75px | VANTA current |
| VANTA Skills, desktop | 129.98px | 89px | Capabilities current, opacity 1 |
| VANTA Skills, mobile | 130.06px | 75px | Capabilities current, opacity 1 |

Positions/states matched under both motion preferences and remained below the header. In-memory viewport screenshots of the three representative pages at both sizes were inspected; none saved by this read-only reviewer.

## Rendered issue missed by markup scan

**P3: tiny mobile thumbnail fragments remained visible.** The broad earlier `.hero-selector button>span:first-child` selector overrode the narrower mobile thumbnail rule. At 390px thumbnails were roughly 17–43px wide and 7–17px high; at 320px they shrank to 0–25px, with FORM / 27 reaching 0x0. Buttons still had 44px height, labels were present and neither document overflow nor controls outside the 320px viewport occurred. This was visual noise rather than an observed navigation blocker.

Parent fixed the cause in the final batch: replaced the broad first-child number styling with `.selector-number` and removed obsolete first-child overrides. Final browser confirmation asserts hidden thumbnails and targets fitting the actual showcase frame at all compact widths.

## Strengths and source coverage

Coherent paper/cobalt/Manrope system, actual project imagery, readable service columns/rows, case concept disclosure and live/source links. Native named preview buttons expose `aria-pressed`, polite feedback and Arrow/Home/End handlers. Section links use `aria-current=location`. Pointer exploration preserves native navigation and checks motion/coarse-pointer preferences. Source includes menu Escape/focus management, focused-ancestor reveals, labels/errors and polite contact status. These handlers were inspected in source; this reviewer did not exercise clipboard, contact delivery, menu/keyboard loops or external destinations. Parent's separate browser suite covers the interaction paths.

## Limits and cleanup

No native browser tool or Human overlay tab was available. Mutable preflight, live helper, detect.js injection and overlay console collection were skipped because this reviewer's role was read-only; parent explicitly confirmed the fallback. No live helper started, no helper/temp file cleanup required, and no user-visible overlay was claimed. Fallback: CLI scan, DOM/style measurements, in-memory screenshots, fragment observations and source inspection. All reviewer-owned browsers/contexts/pages closed in finally; shared port3000 left running. Context helper was not rerun.

Evidence is local Chrome/source inspection, not physical-device, native Safari, native screen-reader or actual email-delivery acceptance. Incumbent metadata sizing and restrained shadows were not treated as permission to replace the brand. Questions skipped: the user authorized direct implementation and final polish.
