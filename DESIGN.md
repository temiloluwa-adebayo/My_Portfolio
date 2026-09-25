---
name: Temiloluwa Adebayo
description: Cinematic graphite portfolio where motion and real imagery carry the personality and one signal amber marks every primary action.
colors:
  page: "#121212"
  band: "#161616"
  panel: "#1b1b1b"
  raised: "#232323"
  line: "#2a2a2a"
  line-strong: "#3b3b3b"
  fg: "#efede8"
  muted: "#a8a6a1"
  faint: "#8d8b86"
  live: "#4ade80"
  accent: "#ffb224"
  accent-hover: "#ffc457"
  on-accent: "#1d1303"
typography:
  display:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "2.9rem (sm 4.5rem, lg 5.75rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display-closing:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "2.6rem (md 4rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "2.4rem (md 3.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "2.9rem (wide tile 3.4rem, md 4.25rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "2.2rem (md 2.8rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  title-quiet:
    fontFamily: "Clash Display, Geist Variable, ui-sans-serif, sans-serif"
    fontSize: "1.2rem to 1.35rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem (md 1.125rem)"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"ss01\", \"cv11\""
  body-sm:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"ss01\", \"cv11\""
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono Variable, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.72rem to 0.9rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "\"tnum\""
rounded:
  md: "12px"
  lg: "16px"
  xl: "24px"
  card: "28px"
  feature: "32px"
  panel: "36px"
  full: "9999px"
spacing:
  gutter: "20px (md 32px)"
  grid-gap: "16px (md 20px)"
  card-pad: "24px (md 28px)"
  section: "96px (md 128px)"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.on-accent}"
  button-primary-sm:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.fg}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    padding: "0"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
  card-project:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.card}"
    padding: "10px"
  card-featured:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.feature}"
    padding: "16px"
  tile-fact:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  chip-tool:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    padding: "6px 14px 6px 10px"
  nav-pill-active:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
  tab-pill-active:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.page}"
    rounded: "{rounded.full}"
---

# Design System: Temiloluwa Adebayo

## Overview

**Creative North Star: "The Night Shift Screening Room"**

A graphite room with the lights down, where the work plays on screen. The ground is near-black and warm-neutral, not blue; panels step up one shade at a time and are separated by 1px hairlines rather than shadow. Real imagery does the atmosphere: a crossfading, slowly zooming slideshow behind the hero, real product screenshots inside browser-style frames, the owner's portrait. A fine film grain sits over everything so the flat greys read as material rather than screen.

Motion carries the personality. Content rises into place with a slight backward tilt that flattens as it arrives; interactive things move on springs; cards stack and tuck behind one another on scroll; pointer devices get a gentle 3D tilt with a light sheen. Colour stays almost entirely out of the way so that one signal amber can mean exactly one thing: this is the next step. Green appears only for live status and confirmation.

Typography pairs a geometric, slightly condensed display face (Clash Display) for every heading and figure with Geist for everything a person reads or clicks. Density is generous: long sections, wide gutters, one idea per band.

**Key Characteristics:**
- Warm graphite ladder (page, band, panel, raised) with hairline borders; no pure black, no pure white.
- One accent, amber, used only on primary actions and the keyboard focus ring.
- Clash Display for headings and figures; Geist for UI and body; Geist Mono for machine-literal strings.
- Large, soft radii (24 to 36px) on containers; fully round pills on every action and chip.
- Film grain over the whole page; generated atmosphere imagery kept decorative.
- Ease-out-expo reveals with a 10° rotateX; springs for interaction; fades only under reduced motion.

## Colors

A warm graphite neutral ladder with one hot signal colour and one status colour.

### Primary
- **Signal Amber** (accent): the fill of every primary action (hero "Start a project", nav "Hire me", "Request a quote", "Send message") and the 2px keyboard focus outline. Never a text colour, border, icon tint, or decorative wash.
- **Lit Amber** (accent-hover): hover fill of primary actions only.
- **Ember Ink** (on-accent): text and icons on an amber fill.

### Tertiary
- **Live Green** (live): availability dot (with a ping), "Open to work", check marks in fact and inclusion lists, the "Copied" state, the command-palette toast, the "Message sent" badge, the finished pipeline tick. Status and confirmation only.

### Neutral
- **Graphite** (page): the page ground, input wells, scrims, the colour text takes on light fills. Also the `theme-color`.
- **Band Graphite** (band): alternate full-width section bands (Stack, Proof, FAQ) so sections separate by tone, not rules.
- **Panel Graphite** (panel): cards, the contact panel, the palette, tab rails.
- **Raised Graphite** (raised): frame bars, active nav pill, selected service, hovered rows and chips.
- **Hairline** (line): default 1px borders and dividers.
- **Strong Hairline** (line-strong): hover borders, secondary-button outline, portrait frame, scrollbar thumb, tertiary-link underline at rest.
- **Bone** (fg): headings, active text, active tab pills (as a fill, with page-coloured text), timeline stroke, selection background.
- **Ash** (muted): body copy and ledes.
- **Smoke** (faint): meta lines, sources, hostnames, placeholders, captions.

### Named Rules
**The One Signal Rule.** Amber marks the primary action and nothing else. If a screen has two amber things, one of them is wrong. Selected and active states use Bone or Raised Graphite, never amber.

**The Status Is Green Rule.** Green means live or done. It is never used to decorate, rank, or highlight.

## Typography

**Display Font:** Clash Display 500 and 600, self-hosted (with Geist Variable, ui-sans-serif)
**Body Font:** Geist Variable (with ui-sans-serif, system-ui), stylistic sets `ss01` and `cv11` on
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, SFMono-Regular)

**Character:** Clash's tight, engineered geometry gives the headlines a poster voice; Geist keeps the reading and interface layer calm and technical. Mono appears only where the string is literally machine text.

### Hierarchy
- **Display** (600, 2.9rem to 5.75rem, 0.95): the hero headline only, two lines, second line at 70% Bone.
- **Display closing** (600, 2.6rem to 4rem, 0.98): the contact panel's closing headline.
- **Headline** (600, 2.4rem to 3.5rem, 1.02): every section heading, always followed by a Geist lede in Ash.
- **Figure** (600, 2.9rem; wide tile 3.4rem to 4.25rem): rolling CV figures in the Proof bento, with prefix and suffix in Ash.
- **Title large** (600, 2.2rem to 2.8rem, 1): featured project names.
- **Title** (600, 1.6rem to 2.4rem): project-card names and sub-section headings.
- **Title quiet** (500, 1.2rem to 1.35rem): stack group labels and service names.
- **Body** (400, 1.05rem to 1.125rem, 1.625): ledes and intros, max width about 36rem. Body small (0.93 to 0.98rem) for card copy, FAQ answers, timeline points.
- **Label** (400, 0.82rem, Smoke, sentence case): sources, tags joined with " · ", captions, form hints. Form field labels at 0.85rem in Ash.
- **Mono** (400, 0.72rem to 0.9rem, tabular): timeline dates, frame-bar hostnames, the email address, and n/N counters.

### Named Rules
**The Machine Text Rule.** Geist Mono is for strings a machine wrote: dates, hostnames, the email address, step and slide counters. Never for headings, labels, or decoration.

**The Sentence Case Rule.** No uppercase tracked labels anywhere. Labels are small, sentence case, and quiet.

## Layout

Single column of full-width sections inside a centred container (max 1180px, 20px gutters, 32px from md). Sections breathe at 96px vertical padding, 128px from md, and alternate between Graphite and Band Graphite grounds. The FAQ narrows its container to 860px; the timeline caps at 900px.

- **Hero:** full small-viewport height; two columns from lg (1.35fr text, 1fr portrait), stacked below.
- **Featured work:** each card is sticky at full viewport height on md+ and tucks behind the next one (scales down 4.5% per step, offset 14px, dims toward Graphite). Below md, and under reduced motion, cards simply stack with 24px gaps.
- **More work:** a 6-column grid on lg, two cards spanning 3 columns over three spanning 2; 2 columns on md; 1 on mobile.
- **Stack:** full-width rows split by hairlines, 14rem label column plus wrapping chips.
- **Services:** 0.9fr / 1.1fr, left heading sticky at 128px from top on lg.
- **Proof:** 4-column bento on lg, the headline figure spans 2.
- **Timeline:** 11.5rem right-aligned date column, a 1px line that draws with scroll, content column.
- **Mobile:** a bottom tab bar replaces the top links; the footer reserves 112px bottom padding for it. Scroll padding is 96px for the fixed nav.

## Elevation & Depth

Depth is tonal first: four graphite steps and hairlines separate everything at rest. Shadows exist, but they are large, soft, and dark (black at 80 to 90%, heavily negative spread), used to lift floating objects off the page, never to outline cards. The one coloured shadow is the amber glow under primary actions. Film grain (fractal noise, 6% opacity, fixed, above all content) unifies the surfaces.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 40px 80px -30px rgba(0,0,0,0.9)`): the hero portrait card; the command palette uses `0 40px 80px -20px rgba(0,0,0,0.8)`.
- **Stack lip** (`box-shadow: 0 -20px 60px -30px rgba(0,0,0,0.9)`): featured cards, casting upward onto the card they cover.
- **Docked** (`box-shadow: 0 16px 40px -20px rgba(0,0,0,0.9)`): the top nav once scrolled; the mobile tab bar uses the upward `0 -8px 40px -12px`.
- **Signal glow** (`box-shadow: 0 8px 24px -8px rgba(255,178,36,0.55), inset 0 1px 0 rgba(255,255,255,0.35)`): primary actions; hover deepens to `0 12px 32px -8px` at 0.7.

### Named Rules
**The Float, Don't Outline Rule.** Shadows lift things that float (nav, palette, portrait, stacked cards). Cards in a grid rely on tone and hairline alone.

**The Glass Only On Imagery Rule.** Backdrop blur is used only where content sits over a photograph or scrolls under a fixed bar: nav, tab bar, hero badge, portrait caption, slideshow controls, palette scrim.

## Shapes

Soft, large corners on containers and fully round pills on everything you press. Radius steps up with the container's importance: 12px for small controls inside panels, 16px for inputs, media frames and FAQ items, 24px for fact tiles, service rows and the palette, 28px for project cards, 32px for featured cards and the portrait, 36px for the contact panel. Every action, chip, tab rail, nav, and status badge is a full pill. Inner radii step down so nested shapes stay concentric (a 28px card with 10px padding holds a 16px frame). Borders are always 1px; the only dashed line separates a selected service's inclusions.

## Components

### Buttons
Three tiers, one component, never mixed up.
- **Shape:** full pill (9999px), 48px tall (40px small), medium weight, 0.95rem.
- **Primary:** Signal Amber fill, Ember Ink text, signal glow, a trailing arrow that nudges 2px right on hover. One per view region.
- **Hover / Focus:** fill to Lit Amber and the glow deepens, 300ms ease-out-expo; press scales to 0.96. Focus is a 2px amber outline at 3px offset on every focusable element.
- **Secondary:** 1px Strong Hairline outline over a translucent Graphite with slight blur, Bone text; hover brightens the border to 50% Bone and fills Raised Graphite. Used for "See my work", "Live website", CV download, LinkedIn, GitHub.
- **Tertiary:** plain Bone text with a 1px Strong Hairline underline at 0.22em offset that turns Bone on hover. "Download CV" in the hero, "Source code".

### Chips
- **Tool chip:** Panel pill, 1px Hairline, Bone text at 0.9rem, a 15px brand mark in its own colour (switched to Bone when it would fall below 4.5:1 on Panel), or a hollow 9px ring when no mark exists. Hover: Strong Hairline border, Raised fill.
- **Status badge:** Graphite pill at 60% with blur, Strong Hairline, pinging Live Green dot, Bone text with Ash detail.

### Cards / Containers
- **Corner Style:** 28px (project), 32px (featured), 24px (fact tile), 36px (contact panel).
- **Background:** Panel Graphite; the contact panel is Panel at 80% over a dim photograph.
- **Shadow Strategy:** none for grid cards; stack lip for featured cards (see Elevation).
- **Border:** 1px Hairline, Strong Hairline on hover (500ms).
- **Internal Padding:** 10px around the media frame, then 20px/12px text inset (project); 12 to 16px outer with a 24px text column (featured); 24 to 28px (fact tile).
- **Media frame:** a 16px-radius Raised figure with a 36px frame bar (two Strong Hairline dots, the hostname in mono Smoke, counters and photo credit on the right) above a 16:10 image. Project images sit at 85% brightness and brighten with a 1.03 zoom on card hover.

### Inputs / Fields
- **Style:** 16px radius, 1px Hairline, Graphite at 60%, Bone text at 0.98rem, Smoke placeholder, 14px by 16px padding. Labels sit above in Ash at 0.85rem. The select uses a custom Ash chevron.
- **Focus:** border to 50% Bone plus a 4px Bone halo at 6%; caret is Bone.
- **Error:** the submit button relabels to "Try again" and an alert line with a mailto fallback slides in above it, in Bone, not red.

### Navigation
- **Top nav:** a floating full-width pill (max 1180px) that, after 24px of scroll, narrows to 980px and gains a Graphite 92% fill, Hairline border, blur and the docked shadow. Left: 34px avatar and name. Centre (md+): section links at 0.875rem in Ash; the active one gets a Raised pill that slides between links on a spring (380/32). Right: a ⌘K search button and the small primary "Hire me".
- **Command palette:** ⌘K, Ctrl K or "/" opens a 34rem Panel dialog (24px radius, Strong Hairline, float shadow) over a 60% black blurred scrim; grouped results (Go to, Projects, Actions), arrow-key selection shown as a Raised row, Esc key cap in mono.
- **Mobile tab bar:** a bottom-docked Panel 85% pill with five icon-over-label tabs; the active tab is a Bone pill with Graphite text that slides on a spring.

### Hero Slideshow
Four generated atmosphere images crossfade every 6.5s (1.6s fade) at 72% opacity, each zooming slowly from 1.1 to 1 over 9s, masked to fade out toward the bottom, under a left-weighted Graphite scrim plus top and bottom fades. The background drifts down 18% on scroll while the content lifts and fades. Thin progress bars at bottom centre (md+) double as slide controls. The headline arrives word by word, each word flipping up from rotateX -70° on a spring.

### Featured Stack and Pipeline Demo
Featured cards pair copy with a screenshot slideshow (auto-advances every 4.2s in view, pauses on hover, swipe or arrow buttons, dot pager). LeadForge replaces the slideshow with a runnable demo: a pill button morphs from "Run the pipeline" through each step (icon swap, character-by-character label) to "Sent. Zero manual steps." with a green tick, over segmented progress bars and a caption stating it is an animation, not a live run.

### Services Selector
A radio list of rounded rows; the selected row takes Raised fill and a 40% Bone border, a filled Bone radio with a Graphite check, and expands its inclusions (green checks, two columns) below a dashed rule. A single amber "Request a quote" below pre-fills the contact form's topic.

### Proof Bento and Timeline
Fact tiles roll each digit column into place on a soft spring when in view, and name their source in Smoke at the tile's foot. The timeline's Bone stroke draws over a Hairline track as you scroll, with Bone dots ringed in Graphite.

### Contact
Contact panel over a 35% photograph. Left: closing headline, copy-email well (mono address, a Raised "Copy" button that flips to green "Copied" for 1.8s), a "Show QR code" pill that expands into a Bone tile with a Graphite QR, and secondary LinkedIn and GitHub pills. Right: the form, divided by a hairline on lg. The amber submit morphs its label through Send, Sending (spinner), and Try again; success replaces the form with a springing green check and "Message sent".

## Do's and Don'ts

### Do:
- **Do** use the Action component's three tiers: amber primary, outlined secondary pill, underlined tertiary link.
- **Do** keep Signal Amber (#ffb224) to primary actions and the focus ring; express selection with Bone or Raised Graphite.
- **Do** separate sections by alternating Graphite and Band Graphite grounds, and components by 1px hairlines.
- **Do** reveal content with the shared rise: 40px up, 10° rotateX flattening, 6px blur clearing, 1s ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`; use springs for anything the visitor drives.
- **Do** give every motion a reduced-motion path: slideshows stop, stacking becomes a plain column, tilt and parallax switch off, digits render static, the timeline shows fully drawn.
- **Do** frame product screenshots in the media frame with the real hostname, and credit any stock photo by name on its frame bar.
- **Do** trace every number on the page to the CV and name its source under the figure.
- **Do** keep generated imagery decorative (empty alt, `aria-hidden`), with its provenance recorded beside the file and disclosed in the footer.

### Don't:
- **Don't** put amber on text, borders, icons, selected states, backgrounds, or a second button in the same group.
- **Don't** place a small label, kicker, or eyebrow line above a section heading. The hero's availability badge is live status with a live dot, not a category label, and is the only element that sits above a headline.
- **Don't** nest a card inside a card. The media frame inside a project card and the control wells inside the contact panel are objects, not prose containers, and are the only sanctioned insets.
- **Don't** use uppercase tracked labels or mono for anything that is not machine text.
- **Don't** outline grid cards with shadows or use hard offset shadows; depth is tone, hairline, and soft float shadows on floating objects.
- **Don't** invent social proof: no testimonials, client logos, satisfaction percentages, or prices.
- **Don't** present generated atmosphere images as the owner's workspace or product, or use them in place of project screenshots.
- **Don't** use pure black or pure white; the extremes are Graphite (#121212) and Bone (#efede8).
