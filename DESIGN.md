---
name: Temiloluwa Adebayo
description: Quiet near-black, photo-led portfolio where the proof is production facts.
colors:
  page: "#131313"
  band: "#161616"
  panel: "#1b1b1b"
  raised: "#222222"
  line: "#2a2a2a"
  line-strong: "#3a3a3a"
  fg: "#ededed"
  muted: "#a3a3a3"
  faint: "#8c8c8c"
  live: "#4ade80"
  pill-hover: "#ffffff"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.1rem (sm 3.75rem, lg 4.75rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontFeature: "\"ss01\", \"cv11\""
  display-closing:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem (md 4rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem (md 2.75rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  figure:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.65rem (sm 2rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem (md 1.125rem)"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  meta:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono Variable, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.7rem to 0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "\"tnum\""
rounded:
  media: "1rem"
  container: "1.5rem"
  card: "1.75rem"
  panel-xl: "2rem"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "32px"
  card-gap: "16px"
  card-gap-md: "20px"
  card-inset: "10px"
  head-gap: "56px"
  head-gap-md: "64px"
  section: "96px"
  section-md: "128px"
  container: "1080px"
  container-narrow: "820px"
components:
  pill-solid:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.page}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  pill-solid-hover:
    backgroundColor: "{colors.pill-hover}"
    textColor: "{colors.page}"
  pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  pill-outline-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.fg}"
  pill-compact:
    rounded: "{rounded.full}"
    padding: "8px 16px"
  stack-chip:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    padding: "8px 16px 8px 12px"
  stack-chip-hover:
    backgroundColor: "{colors.raised}"
  status-pill:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "6px 16px 6px 12px"
  icon-tile:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.media}"
    size: "56px"
  project-card:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-inset}"
  project-media:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.media}"
  accordion-item:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.container}"
    padding: "24px 28px"
  fact-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    rounded: "{rounded.container}"
    padding: "28px"
  contact-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.panel-xl}"
    padding: "96px 40px"
  nav-bar:
    backgroundColor: "{colors.page}"
    height: "72px"
---

# Design System: Temiloluwa Adebayo

## Overview

**Creative North Star: "The Quiet Ledger"**

A graphite room with the lights low, where the only things that glow are the work and the facts about it. The ground is near-black and nearly flat; depth comes from four steps of grey and a hairline, never from shadow or colour. Everything interactive is a pill, everything that holds content is a softly rounded panel, and the one living colour is a green that means "true" or "running".

Density is generous: one idea per section, centred section heads, wide vertical rhythm (128px between sections on desktop) and a single 1080px column. Type does the atmosphere: Geist at weight 300 and tight negative tracking for the big statements, regular Geist for everything else, Geist Mono only where a value is literally machine text (a date range, a hostname, an email address). Real photography (the portrait, live-site screenshots) and real brand marks carry the colour the palette withholds.

The world rejects the neon-glow "hacker terminal" register and any invented social proof. Every project image is real: a screenshot of the live site or desktop app, or, where no screen can be shown, a clearly labelled and credited Unsplash photo. Never a mock screenshot.

**Key Characteristics:**
- Near-black tonal ladder (page, band, panel, raised) with 1px hairlines instead of shadows.
- Pill-shaped actions: solid off-white primary with an arrow, outlined secondary.
- Light-weight, tightly tracked Geist display; mono reserved for dates, hostnames, email.
- One accent hue, green, used only as a truth signal.
- Motion is one soft rise-and-unblur per section, ease-out-expo, once.

## Colors

A monochrome graphite ladder with a single green signal; colour otherwise arrives only through photographs and brand marks.

### Primary
- **Signal Green** (live): the availability dot (with a soft ping), the check marks beside project facts, and the "copied" confirmation on the email button. It always means something is live, verified, or done.

### Neutral
- **Graphite Page** (page): the page ground, the nav's frosted fill (80% with backdrop blur), the selection text colour, and the solid pill's text.
- **Band Graphite** (band): full-bleed alternating section bands (Skills, Experience) that separate chapters without a rule.
- **Panel Graphite** (panel): every card, chip, tile, accordion item and the contact panel. The BrandIcon contrast check is computed against this value.
- **Raised Graphite** (raised): the surface inside a card (image frame) and the hover fill for outline pills and chips.
- **Hairline** (line): the default 1px border on every panel, the nav border once scrolled, the footer rule.
- **Hairline Strong** (line-strong): hover/open border state, outline-pill border, scrollbar thumb, the single dot in the screenshot frame bar.
- **Bone** (fg): headings, primary text, the solid pill fill, focus ring.
- **Ash** (muted): default body text and nav links.
- **Smoke** (faint): meta lines, sources, tag lists, hostnames, dates. Still passes contrast on panel; do not go darker for text.
- **Paper White** (pill-hover): hover state of the solid pill only.

### Named Rules
**The Live Green Rule.** Green is the only hue in the system and it signals truth or status: live dot, verified-fact check, copied confirmation. It never fills a surface, a button, or a heading.

**The Tonal Ladder Rule.** Separation is made by stepping one rung on page, band, panel, raised, plus a hairline. A new surface picks a rung; it does not invent a grey.

## Typography

**Display Font:** Geist Variable (with ui-sans-serif, system-ui)
**Body Font:** Geist Variable
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, SFMono-Regular)

Both faces are self-hosted via @fontsource-variable. Body runs with stylistic sets ss01 and cv11 on; headings use balanced wrapping, paragraphs pretty wrapping.

**Character:** One family doing two voices: whisper-light and tightly tracked at display size, plain and even at reading size. Mono is a data voice, not a decoration.

### Hierarchy
- **Display** (hero H1 only): light, very tight tracking, sub-1 leading; scales from 3.1rem to 4.75rem.
- **Display Closing** (contact banner H2): light, 2.5rem to 4rem, capped at 14ch.
- **Headline** (section heads): regular weight, 2rem to 2.75rem, centred with a muted lede under it, max width 36rem.
- **Title** (project card titles 1.5rem; accordion role titles 1.1rem to 1.25rem at -0.01em): regular weight.
- **Body** (intros and ledes, 1rem to 1.125rem) and **Body Small** (card copy, list items, 0.95rem): relaxed leading, Ash colour, intro capped at 34rem.
- **Label** (pills, 0.875rem, weight 500) and **Meta** (sources, role meta, 0.82 to 0.85rem, Smoke).
- **Mono** (0.7 to 0.8rem, tabular numerals): date ranges, the hostname in a screenshot frame, the email address. Nothing else.

### Named Rules
**The Light Statement Rule.** Only the two display statements run at weight 300; section heads, titles and body stay at 400, and weight 500 is for pill labels, the name, and the bold lead of a fact.

**The Machine Text Rule.** Geist Mono appears only on literal machine strings: dates, hostnames, email. Never for labels, headings, or flavour.

## Layout

A single centred column, max 1080px, with 20px side gutters (32px from md). The experience section narrows to 820px. Sections breathe on a 96px / 128px (md) vertical rhythm and alternate between page and band backgrounds. Each section opens with a centred head and a 56px / 64px gap before content.

The hero is two columns from md (1.05fr / 1fr, 32px gap): text left vertically centred, portrait right stretched to the column height. On mobile it stacks, portrait capped at 26rem. Projects sit in a two-column grid from md (16px / 20px gaps), one column below. Facts run as two full-bleed marquees (19rem cards, 22rem from sm) that become a 1/2/4-column static grid under reduced motion. The nav is fixed, 72px tall, transparent until 12px of scroll, then frosted page with a hairline; below md it collapses to a height-animated menu with large light links. Anchor scroll offset is 5.5rem.

## Elevation & Depth

The system is flat: there are no box-shadows anywhere. Depth is tonal (page, band, panel, raised) and edged with 1px hairlines; hover and open states strengthen the hairline or step the fill one rung up. The only blur in the system is the frosted nav and the entrance unblur. Screenshots sit at 82% brightness and come up to full on card hover, so imagery lifts instead of the surface.

### Named Rules
**The Hairline, Not Shadow Rule.** A container earns separation with a one-rung tone step and a 1px line. Shadows are not part of this world.

## Shapes

Soft, generous corners in four sizes plus the pill. Actions, chips, status tags, avatars and social buttons are full pills or circles. Project cards and the portrait panel use the card radius; accordion items and fact cards the slightly smaller container radius; the contact banner the largest, panel-xl. Media nested inside a card (image frame, stack icon tiles) uses the media radius, so a 10px card inset leaves a visible concentric margin. The focus ring follows the pill shape by default.

## Components

### Buttons (Pill)
Confident and quiet.
- **Shape:** full pill.
- **Solid (primary):** Bone fill, Graphite Page text, 10px by 20px, weight 500, usually with a trailing arrow that nudges 2px right on hover. Hover lifts to Paper White.
- **Outline (secondary):** transparent with a Hairline Strong border and Bone text; hover fills Raised and brightens the border.
- **Compact:** 8px by 16px inside cards and the nav.
- **Press:** scales to 0.97. Transitions 300ms ease-out-expo.
- **Focus:** 2px Bone outline, 3px offset.
- Each pair puts at most one solid pill per group; the primary action (Contact / Email) is the solid one.

### Chips
- **Status pill:** panel fill, hairline, Ash text, green dot with ping; secondary detail in Smoke hidden below sm.
- **Stack chip:** panel fill, hairline, Bone text, 16px BrandIcon; hover steps to Raised and Hairline Strong.

### BrandIcon
Real simple-icons marks in their brand colour, with a contrast floor: if a brand hex falls under 4.5:1 against Panel Graphite, the mark renders in Bone instead. Used in stack chips (16px) and the hero icon marquee (24px in 56px tiles).

### Cards / Containers
- **Project card:** panel fill, hairline (strong on hover), card radius, 10px inset around a media block, then title, kind in Smoke, description, green-check fact list, dot-separated tags in Smoke, and compact pills pushed to the bottom.
- **Screenshot frame (projects with a live site):** Raised surface, media radius, a 32px bar with one grey dot and the mono hostname, then a 16:10 top-cropped screenshot, dimmed until hover, scaling 1.02 over 700ms.
- **Image frame labels:** the frame bar shows the live host in mono; a desktop capture or stock photo shows a sans label instead ("Windows desktop app", "Illustrative photo"), and stock photos carry the photographer credit linked to Unsplash at the bar's right.
- **Fact card:** panel fill, container radius, 28px padding; lead phrase weight 500 in Bone, the rest in Ash, source in Smoke at the bottom.

### Experience Accordion
Stacked container-radius panels with 12px gaps; the first is open by default and one opens at a time. Header row: title, company in Ash, mono date range (right-aligned from sm, under the company on mobile), and a chevron rotating 180 degrees over 500ms. The body animates height and opacity over 500ms ease-out-expo and lists points with small Smoke dot bullets.

### Marquees
Duplicated tracks translating -50% linearly (hero icons 40s, fact rows 70s, second fact row reversed), with 8% edge fade masks. They pause on hover and focus-within. Under reduced motion the CSS animation stops, and the fact rows are replaced by a static grid.

### Contact Panel
panel-xl rounded banner, centred: 64px avatar with a Hairline Strong ring offset 4px, Display Closing statement, muted line, a solid "Email me" pill beside an outline "Download CV" pill, then the email in mono as a copy button that swaps its copy icon for a green check for 2 seconds (with a polite live-region announcement), falling back to mailto if the clipboard fails.

### Navigation
Avatar (32px circle) plus name on the left; Ash text links that turn Bone on hover; a compact solid "Contact me" pill on the right. Mobile: a 40px circular menu toggle and a height-animated panel of 1.5rem light links and a solid pill.

### Motion
- **Easing:** ease-out-expo for every transition and entrance.
- **Section reveal:** rise 18px and unblur from 6px over 900ms, triggered once when 80px into view; project cards stagger 80ms by column.
- **Hero entrance:** text rises 24px over 1s; the portrait unblurs from 10px and scales from 0.97 over 1.2s.
- Reduced motion is honoured globally (motion's user setting, CSS marquee stop, ping hidden, smooth scroll off).

## Do's and Don'ts

### Do:
- **Do** place every new surface on an existing rung (page, band, panel, raised) with a 1px line or line-strong border.
- **Do** make actions pills: solid Bone for the one primary action, outline for the rest.
- **Do** use ease-out-expo and a single rise-and-unblur reveal per section, once.
- **Do** render brand marks through the BrandIcon contrast rule so no mark drops under 4.5:1 on panel.
- **Do** use a real screenshot wherever one exists; use a stock photo only when no screen can be shown, labelled "Illustrative photo" and credited.
- **Do** keep marquees pausable on hover and focus, and provide a static layout under reduced motion.

### Don't:
- **Don't** add box-shadows, glows, or neon; depth is tonal.
- **Don't** introduce a second accent hue, or use green for fills, buttons or headings.
- **Don't** set labels, headings or decoration in Geist Mono; it is for dates, hostnames and email only.
- **Don't** put small uppercase kickers or eyebrows above headings; section heads are a title plus a lede.
- **Don't** invent testimonials, client logos, satisfaction figures, or screenshots for projects without a live site.
- **Don't** use weight 300 below display size, or bold (700) anywhere.
