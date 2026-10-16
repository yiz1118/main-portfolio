---
name: Alson Chua
description: A portfolio set as a numbered print edition in rag paper, press ink, graphite pencil and one vermilion chop.
colors:
  sheet: "#f2f1ec"
  mount: "#f8f7f3"
  pressed: "#ebeae4"
  press: "#151413"
  press-hover: "#2c2a27"
  graphite: "#5e5c57"
  graphite-faint: "#8a877f"
  rule: "#d6d3ca"
  rule-strong: "#b3afa4"
  chop: "#cf3a1e"
  chop-ink: "#b0301a"
  glassine: "rgb(242 241 236 / .84)"
  slab-text: "#f2f1ec"
  slab-muted: "#aaa69c"
  slab-rule: "#3b3935"
typography:
  display:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(46px, 6.6vw, 104px)"
    fontWeight: 620
    lineHeight: 0.94
    letterSpacing: "-0.032em"
  ledger:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 640
    lineHeight: 1.04
    letterSpacing: "-0.036em"
  numeral:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(64px, 7.4vw, 112px)"
    fontWeight: 640
    lineHeight: 0.82
    letterSpacing: "-0.035em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  headline:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 70px)"
    fontWeight: 620
    lineHeight: 1
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(23px, 2.1vw, 30px)"
    fontWeight: 620
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  lede:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(19px, 1.6vw, 22px)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    letterSpacing: "-0.005em"
  meta:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  fine:
    fontFamily: "Schibsted Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  inscription:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
  data:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  gap: "clamp(20px, 2.4vw, 32px)"
  split: "clamp(32px, 6vw, 96px)"
  head: "clamp(36px, 5vw, 64px)"
  section: "clamp(72px, 10vw, 140px)"
  spread: "clamp(80px, 10vw, 148px)"
  row: "12px"
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.press}"
    textColor: "{colors.sheet}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.press-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.press}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.mount}"
  button-slab:
    backgroundColor: "{colors.slab-text}"
    textColor: "{colors.press}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "52px"
  inline-link:
    textColor: "{colors.press}"
    typography: "{typography.label}"
    height: "44px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.press}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "44px"
  filter-chip-active:
    backgroundColor: "{colors.press}"
    textColor: "{colors.sheet}"
  plate-sheet:
    backgroundColor: "{colors.mount}"
    rounded: "{rounded.none}"
    padding: "clamp(14px, 2.4vw, 36px) clamp(14px, 2.4vw, 36px) clamp(12px, 1.8vw, 26px)"
  plate-mark:
    backgroundColor: "{colors.pressed}"
    rounded: "{rounded.none}"
    padding: "clamp(6px, .8vw, 10px)"
  inscription:
    textColor: "{colors.graphite}"
    typography: "{typography.inscription}"
  sheet-tab:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.graphite}"
    padding: "6px 10px 6px 14px"
    height: "44px"
    width: "92px"
  sheet-tab-active:
    backgroundColor: "{colors.mount}"
    textColor: "{colors.press}"
  text-field:
    backgroundColor: "transparent"
    textColor: "{colors.press}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 2px"
    height: "50px"
  nav-link:
    textColor: "{colors.press}"
    height: "44px"
  ink-slab:
    backgroundColor: "{colors.press}"
    textColor: "{colors.slab-text}"
  chop:
    backgroundColor: "{colors.chop}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    size: "30px"
  status-mark:
    backgroundColor: "{colors.chop}"
    size: "8px"
---

# Design System: Alson Chua

## Overview

**Creative North Star: "The Edition of Six"**

The site is handled like a print room's portfolio box. The page is a warm rag-white sheet, everything a visitor must read to decide is set in press ink, annotation is graphite pencil, and the only colour is a small vermilion seal stamped where a logo would usually sit. Every project is treated as a numbered print: mounted on a lighter sheet, framed by a debossed plate mark, and inscribed underneath in italic with its title, its number in the edition and the maker's hand.

Authorship is the organising idea, and it is expressed with printers' devices rather than marketing furniture: credits on a ruled ledger, edition fractions (n/6), catalogue entries with provenance and checksums, a colophon in place of an about card. Structure is drawn with hairline rules, never boxes. Density is generous and editorial: very large, tightly tracked grotesk display type held against quiet italic notes, with each work composed as its own spread on a twelve-column grid so no two neighbouring projects share a layout.

Motion follows the physics of paper and ink. Lines draw from the left, plates are pulled (a translucent paper overlay lifts off the image while the plate mark draws its border), a chosen sheet is struck forward at once with no cross-fade, and a plate carries over into its case-study hero as a shared view transition. Hover is a refinement reserved for fine pointers; reduced motion removes travel and wipes while every state stays legible.

**Key Characteristics:**
- Warm paper neutrals and a single press-black ink; colour appears only in the vermilion chop and its marks.
- Two voices: Schibsted Grotesk for the work and every control, Libre Caslon italic as the pencil (inscriptions, credits, notes).
- Works are mounted plates with inscriptions, never cards.
- 1px hairline rules carry all structure; every corner is square.
- Every count is an edition mark in tabular lining figures.
- The ink slab (a press-black field) appears only behind the commission call and the footer colophon.
- Motion draws, pulls and strikes; works switch instantly.

## Colors

The palette is a print room reduced to five materials: rag paper, mount board, press ink, graphite pencil and a vermilion seal.

### Primary
- **Press Ink** (#151413): headings, the lede, decision copy, primary buttons, the selected filter, the strong rule on top of a list, form or profile, and the ink slab behind the commission call and footer. 16.27:1 on the sheet.
- **Lifted Ink** (#2c2a27): the primary button's hover fill on fine pointers, nothing else.

### Secondary
- **Vermilion Chop** (#cf3a1e): the AC seal (header brand, footer, colophon, profile panel, case concept note, favicon), the 8px availability square, the 5px current-page tick in the desktop nav, the 2px focus outline and the text caret. 4.34:1 on the sheet: enough for marks and the focus ring, too light for body-size text.
- **Chop Ink** (#b0301a): the deeper vermilion that carries field errors, the invalid-field underline and the error status rule (5.65:1 on the sheet).

### Neutral
- **Rag Sheet** (#f2f1ec): the page, the header at rest, the sticky collection index, the mobile menu panel, unselected sheet tabs; as slab paper (#f2f1ec), the text on the ink slab.
- **Mount Board** (#f8f7f3): the lighter sheet every plate is mounted on; also the struck-forward tab, the secondary button's hover fill, keycaps and the mobile-story mount.
- **Plate Deboss** (#ebeae4): the recessed field of the plate mark between mount and image.
- **Graphite** (#5e5c57): the pencil: notes, inscriptions, meta lines, definition terms, captions, inactive tabs and index links (5.91:1 on the sheet).
- **Faint Graphite** (#8a877f): the "/6" denominator of a display-size edition numeral, and the boundary of every control that needs one: secondary button and filter outlines, field underlines and textarea borders (3.17:1, which meets the 3:1 non-text minimum). Never small text.
- **Hairline** (#d6d3ca): row separators, section borders, fact and catalogue rows, sheet-tab outlines, the scrolled header's bottom edge.
- **Strong Hairline** (#b3afa4): ledger rules and dotted leaders, the plate-mark border, keycaps, underline colour on prose links. Decorative structure only; it is 1.9:1 on the sheet, so it never marks a control's boundary.
- **Glassine** (rgb(242 241 236 / .84)): the header once the page scrolls, over a 12px blur; translucent paper, not glass.
- **Slab Graphite** (#aaa69c) and **Slab Rule** (#3b3935): muted text (7.57:1) and hairlines on the ink slab.

### Named Rules
**The Stamp, Not Paint Rule.** Vermilion is applied only as a mark: the chop seal, squares of 8px or less, the focus outline and the caret. It never fills a button, never colours a heading or a link, never tints a surface. Chop Ink carries error text and nothing else.

**The Paper and Ink Rule.** Every surface is paper (sheet, mount, deboss) or ink (the slab). There is no tinted panel, no grey card and no third surface colour, and the slab appears only behind the commission call and the footer.

**The Pencil Rule.** Graphite annotates; press ink is for what the visitor reads to decide or act. Faint Graphite is permitted only at display size.

## Typography

**Display Font:** Schibsted Grotesk Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Schibsted Grotesk Variable (same stack)
**Label/Mono Font:** Libre Caslon Text italic for notes and inscriptions (with Georgia, Times New Roman); system monospace only for checksums and the copyable brief.

**Character:** A compact newspaper grotesk, set heavy and tightly tracked for headings and plainly for interface, against a bookish italic serif that behaves like a pencil note in a margin. The grotesk states; the italic attributes.

### Hierarchy
- **Display** (620, clamp(46px, 6.6vw, 104px), 0.94): page h1s, balanced, held to about 14ch; case titles run to clamp(48px, 7.4vw, 120px).
- **Ledger** (640, clamp(40px, 5vw, 72px), 1.04): the home h1 set as ruled credit rows: stage name, dotted leader, italic credit.
- **Numeral** (640, clamp(64px, 7.4vw, 112px), 0.82, tabular lining): the edition number above each work's title, with its "/6" in regular weight Faint Graphite.
- **Headline** (620, clamp(36px, 4.6vw, 70px), 1.0): section h2s. The commission call (clamp(54px, 7.4vw, 112px), 0.88) and colophon name (clamp(56px, 7vw, 96px), 0.9) are the two oversized exceptions.
- **Title** (620, clamp(23px, 2.1vw, 30px), 1.1): h3s. Work titles in a spread (clamp(30px, 3.4vw, 52px)) and process stages (clamp(32px, 3.6vw, 56px)) scale up inside their rows.
- **Lede** (400, clamp(19px, 1.6vw, 22px), 1.45): one plain sentence under a display heading, in press ink, max 34ch.
- **Body** (400, 17px, 1.6; 16px at 1023px and below): running text in graphite; long reading caps at 58 to 62ch.
- **Label** (600, 16px, -0.005em): buttons, inline links, the nav call to action.
- **Meta** (400, 15px) and **Fine** (400, 14px): presentation meta, definition terms, form labels (at 600), filter chips; status lines, hints, errors, caption types, inscription meta.
- **Note** (Caslon italic 400, 17px, 1.55): section asides, catalogue notes, service outcomes, figure captions (16px), the footer colophon.
- **Inscription** (Caslon italic 400, 16px, 1.4): plate titles and the maker's hand; the edition fraction inside it switches to the grotesk at 15px/500 in tabular figures.

### Named Rules
**The Two Hands Rule.** The grotesk sets anything that is the work or acts: headings, body, navigation, buttons, numbers. Caslon italic sets attribution and annotation only: inscriptions, credits, notes, captions, the Required/Optional mark beside a field label. Caslon never sets a heading, a button or a number.

**The Edition Mark Rule.** Every count is a tabular lining figure in the grotesk: n/6 fractions, stage indexes, sheet-tab numbers, the studio clock.

**The Label-On-The-Object Rule.** Labels sit on the thing they name: the inscription under the plate, the numeral at display size as part of a work's heading, the note beside a section heading rather than above it. A small label stacked above a heading is not part of this system.

## Layout

The container is min(100% minus two gutters, 1328px), centred, with a fluid gutter (clamp(20px, 4vw, 56px)). The header is sticky at 76px (68px at 1023px and below), and anchors scroll-pad by the header height.

Layouts are asymmetric fr splits rather than equal columns: hero 4.4 to 7.6 (ledger left, plate right), section heads 7 to 5 with the note pushed to the right edge, colophon and commission call 7 to 5, page intros 8 to 4, catalogue 3 to 9, case body 2.4 to 9.6 with a sticky table of contents, contact 4 to 8.

Works sit on a twelve-column grid as spreads: heading in 4 columns, visuals in 8, caption ruled beneath the visuals. Variations mirror the spread (heading right), pair the cover with an offset companion plate (8 to 4, or 5 to 7 with the companion raised), or set desktop beside a phone plate (clamp(150px, 17vw, 236px)). Spreads are separated by clamp(80px, 10vw, 148px); sections by clamp(72px, 10vw, 140px) of block padding; heads sit clamp(36px, 5vw, 64px) above their content; grid gaps run clamp(20px, 2.4vw, 32px) and wide column gaps clamp(32px, 6vw, 96px). Fact rows breathe at 12 to 14px.

At 1023px and below, most splits fall to one column (service details stay two), the sheet stack becomes a row of six under the plate, each work's numeral sits beside its title, and sticky side panels become static. At 767px and below, navigation moves into a menu panel, the ledger rows scale to clamp(31px, 8.8vw, 50px), the collection index unsticks into three columns, companion plates and the inscription's hand are dropped, and forms run single column with full-width buttons. Every interactive target is at least 44px (52px buttons, 48px phone tabs, 64px menu rows).

### Named Rules
**The Spread Rule.** Each work gets its own composition on the twelve-column grid, and neighbouring works never share a layout. A uniform grid of project cards is not part of this system.

**The Hairline Rule.** Structure is ruled, not boxed: 1px Hairline between rows, Strong Hairline for ledgers and controls, a press-ink rule across the top of a list, form or profile. Lists of facts, deliverables, stages, commissions and contact routes are separated by rules with no container around them.

## Elevation & Depth

The system is flat paper. Depth comes only from paper behaving like paper: a mounted sheet resting just above the table, a plate mark pressed into it, a tab struck forward from the stack, a translucent sheet lifting off an image. Interface controls, rows and navigation are flat at rest and on hover.

### Shadow Vocabulary
- **Mount** (`box-shadow: 0 1px 0 rgb(21 20 19 / .05), 0 22px 44px -32px rgb(21 20 19 / .42)`): under every plate sheet and the mobile-story mount.
- **Deboss** (`box-shadow: inset 1px 1px 0 rgb(21 20 19 / .1), inset -1px -1px 0 rgb(255 255 255 / .85)`): the plate mark recessed into the mount.
- **Struck Sheet** (`box-shadow: 0 10px 24px -18px rgb(21 20 19 / .5)`): the selected tab in the hero stack, shifted 8px toward the plate.
- **Paper Edge** (`box-shadow: 0 -12px 24px rgb(21 20 19 / .14)`): the leading edge of the overlay as a plate is pulled.
- **Press** (`box-shadow: inset 0 2px 0 rgb(0 0 0 / .22)`): a button while held, with 1px of downward travel.

### Named Rules
**The Paper Physics Rule.** Only paper objects cast shadows: mounts, debossed marks, a struck sheet, a lifting overlay. Buttons, rows, fields and navigation stay flat; a button receives only the inset press while held.

**The Translucent Paper Rule.** Blur appears in two places only: the scrolled header (Glassine over a 12px blur) and the overlay lifting off a plate (10px blur, desaturated). There are no frosted panels.

## Shapes

Every corner is square (0px), including buttons, fields, filters, keycaps, plates and the slab. Where something needs to read as a mark, it is a square: the chop is a filled square seal with an inner keyline and a geometric AC monogram, the availability mark is 8px, the current-page tick 5px, the deliverable bullet 6px. Lines are 1px hairlines; 2px is reserved for active and hover indicators (index underlines, title underlines, the selected phone tab) and the press rule above a form status. The ledger's leaders are dotted, one 1px dot every 6px. A plate is three nested rectangles: mount, deboss with a 1px Strong Hairline border, image. Text inputs and selects carry only a bottom rule; the textarea alone gets a full 1px box. Icons are 2px-stroke line icons, almost always the up-right arrow, at 14 to 22px.

**The Square Rule.** Nothing is rounded. If an element must read as a mark, it is a square.

## Components

### Buttons
Plain, heavy and pressable, like a block of ink on paper.
- **Shape:** square corners (0px), 52px minimum height, 14px 24px padding, an 18px gap to a trailing up-right arrow.
- **Primary:** Press Ink fill, Rag Sheet text, Label type.
- **Hover / Focus:** on fine pointers the fill lifts to Lifted Ink and the arrow nudges 3px up and right (220ms). Focus is a 2px vermilion outline at 4px offset (slab paper on the slab). Held: 1px down with the inset press. Disabled: 0.6 opacity.
- **Secondary:** transparent with a 1px Strong Hairline outline and press text; hover fills with Mount Board and darkens the outline to press.
- **On the slab:** the primary inverts to slab paper with press text, lifting to pure white on hover.

### Inline Links
The quiet second action everywhere ("See the six works", "View Case Study"): Label type in press, 44px tall, trailing arrow. A 1px underline stub covers the first 18% of the word at rest and draws to full width on hover or focus. Prose links inside catalogue rows and service evidence use a conventional underline in Strong Hairline at a 4px offset.

### Chips
- **Style:** category filters are square, 44px, 10px 16px padding, 1px Strong Hairline outline, Meta type, no fill.
- **State:** the pressed filter fills with Press Ink and Rag Sheet text; hover darkens the outline. Technology tags in a case are the same outline at 7px 12px and are not interactive.

### Plate (signature)
The unit of the whole system: Mount Board sheet with the Mount shadow, a Plate Deboss mark with a 1px Strong Hairline border, the image, then an inscription on a three-column grid: italic title in press at left, the n/6 fraction centred in grotesk tabular figures, the hand ("A. Chua, 2026") at right, with an optional grotesk meta line across. Companion plates use a tighter 10px mount and drop the hand.
- **Pull:** on entry the translucent overlay lifts off the image over 980ms on the pull curve while the plate-mark border draws horizontally and vertically; a second plate in the same spread follows 140ms later.
- **Hover:** the image scales to 1.015 and a press-black "View case study" badge appears and follows the pointer; it is shown on focus as well.
- **Carry-over:** a plate morphs into its case-study hero through a shared view transition (520ms).

### Credits Ledger (signature)
The home h1, set as five ruled rows: a stage name in Ledger type, a dotted leader, and the italic credit "Alson Chua"; the last credit is in press, the others in graphite. On arrival each Strong Hairline rule draws from the left (900ms, staggered 80ms), each stage name rises out of a clipped line (820ms), and the credits settle in afterward. Assistive technology hears one plain sentence instead of the visual rows.

### Sheet Stack (signature)
Six numbered tabs along the plate's right edge, 92px wide, outlined in Hairline: a 22px/640 tabular number over a 13px name. The selected tab fills with Mount Board, turns press and is struck 8px toward the plate with the Struck Sheet shadow, and the plate changes at once. Keys 1 to 6, arrows, Home and End all select; a hint line sets the keys as small keycaps (Mount Board, Strong Hairline with a 2px bottom edge). At 1023px and below the stack becomes a row of six beneath the plate with a 2px press underline on the selected tab; on phones it shows numbers only at 48px.

### Inputs / Fields
- **Style:** transparent, no box, a 1px Strong Hairline underline, 50px tall, 17px press text, square corners. The textarea takes a full 1px box at 160px minimum. Labels are 15px/600 grotesk followed by an italic Caslon Required or Optional in graphite.
- **Focus:** the outline is replaced by the underline doubling to 2px press (the textarea gets an inset 1px press line). The caret is vermilion.
- **Error / Disabled:** the underline turns Chop Ink and a 14px Chop Ink message sits below; form status blocks carry a 2px top rule in press, or Chop Ink for errors.

### Navigation
- **Header:** sticky, 76px, Rag Sheet at rest; once the page scrolls it becomes Glassine with a Hairline bottom edge.
- **Brand:** a 30px chop beside the name (17px/650) over the title in 14px Caslon italic (title hidden at 1023px and below); on hover the chop tilts 4 degrees.
- **Links:** 16px grotesk in press with a 1px press underline that draws on hover and focus; the current page keeps the underline and gains a 5px vermilion tick to its left. "Start a Project" closes the row as an inline link.
- **Mobile:** a 44px menu toggle opens a panel of 30px/600 links in 64px ruled rows with arrows, the current page underlined at 2px, a full-width press "Start a Project" button and the location in italic. Focus is trapped while open; Escape closes it.
- **Collection index:** a ruled bar that sticks under the header, with an italic "Turn to a work" label and six numbered links; the current work is press, semibold, with a 2px press underline.

### Ink Slab
The commission call: a Press Ink field with an oversized headline in slab paper whose second line drops to Slab Graphite, a slab-paper lede, the inverted primary button, WhatsApp and email inline links, and a status line with the 8px vermilion square and the live studio clock. The footer continues the slab with Slab Rule hairlines, a 28px chop brand, a two-column link list and an italic colophon naming the typefaces.

### Ruled Lists
- **Catalogue entry:** a press rule on top, two columns of term and value rows separated by Hairline; terms in 15px graphite, values in 16px press; the provenance row spans both columns and sets its checksum in 13px monospace.
- **Process:** one stage per full-width row: index, stage title, what happens, what exists afterward, and an italic credit at the far right; a press rule draws across each row on entry and a press rule closes the list.
- **Commissions:** a two-column ruled list of large titles with a graphite detail line and a trailing arrow; on hover a press rule draws across the top and the arrow nudges 4px.

### Status Mark
An 8px vermilion square, the availability line and the live studio clock ("Studio time 13:21 in Malaysia (GMT+8)") in 14px tabular figures. The mark appears under the hero plate and in the commission call; the clock alone also runs on the contact page and the about profile.

## Do's and Don'ts

### Do:
- **Do** mount every screenshot as a plate: Mount Board (#f8f7f3) with the Mount shadow, a Plate Deboss (#ebeae4) mark with a 1px Strong Hairline border, the image, then an italic inscription with title, n/6 and the hand.
- **Do** draw structure with 1px rules: Hairline (#d6d3ca) between rows, Strong Hairline (#b3afa4) for ledgers, Faint Graphite (#8a877f) for control outlines, Press Ink (#151413) across the top of a list, form or profile.
- **Do** keep vermilion (#cf3a1e) to the chop, squares of 8px or less, the 2px focus outline at 4px offset, and the caret.
- **Do** set every count (n/6, stage index, tab number, clock) in tabular lining figures.
- **Do** give each work its own spread on the twelve-column grid: mirrored, paired with a companion plate, or desktop beside phone.
- **Do** animate lines by drawing them from the left and plates by pulling the paper off; switch between works instantly.
- **Do** gate hover effects behind `(hover: hover) and (pointer: fine)` and give each one a focus-visible equivalent.
- **Do** keep every interactive target at 44px or more (52px buttons, 64px mobile menu rows).
- **Do** reserve the ink slab (#151413) for the commission call and the footer.

### Don't:
- **Don't** round any corner; the radius is 0px throughout.
- **Don't** put projects or content in tinted, bordered or shadowed cards; works are plates and facts are ruled rows.
- **Don't** stack a small label, kicker or numbered eyebrow above a heading; labels live on the object.
- **Don't** set headings, buttons, navigation or numbers in Libre Caslon, or annotation in the grotesk.
- **Don't** use vermilion for text, button fills, links or any area larger than the chop; errors use Chop Ink (#b0301a).
- **Don't** cross-fade between works; the selected sheet is struck forward at once.
- **Don't** give buttons, rows, fields or navigation a drop shadow; the only control shadow is the inset press while a button is held.
- **Don't** use Faint Graphite (#8a877f) for text smaller than display size; it is reserved for display numerals and control boundaries.
- **Don't** stand in a stock or generated portrait, a signature image or a client-logo strip; the chop and the colophon carry identity.
