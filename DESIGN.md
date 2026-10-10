---
name: ABNA
description: 'A Biztosítás Nem Alszik! – a local insurance advisor in night navy, brand blue and one lamp of amber.'
colors:
  night: "#07122e"
  navy-900: "#0b1a3f"
  navy-800: "#12285e"
  navy-700: "#1b3a85"
  blue-600: "#2457d6"
  blue-700: "#1c46b4"
  blue-300: "#9dbcff"
  blue-100: "#dbe6ff"
  sky-50: "#f3f6fc"
  lamp: "#f4b740"
  text: "#14203d"
  text-muted: "#48557a"
  text-subtle: "#5e6a89"
  on-dark: "#ffffff"
  on-dark-muted: "#c3d0ee"
  on-dark-subtle: "#9fb0d6"
  border: "#dce3f0"
  border-strong: "#c3cde1"
  danger: "#b42318"
  success: "#0f7a4f"
typography:
  display:
    fontFamily: "'Schibsted Grotesk', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Schibsted Grotesk', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.4vw, 2.75rem)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  title:
    fontFamily: "'Schibsted Grotesk', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.375rem)"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "28px"
  full: "999px"
spacing:
  sp-1: "0.25rem"
  sp-2: "0.5rem"
  sp-3: "0.75rem"
  sp-4: "1rem"
  sp-5: "1.25rem"
  sp-6: "1.5rem"
  sp-8: "2rem"
  sp-10: "2.5rem"
  sp-12: "3rem"
  sp-16: "4rem"
  section-y: "clamp(4.5rem, 9vw, 7.5rem)"
  gutter: "clamp(1rem, 4vw, 2rem)"
components:
  button-primary:
    backgroundColor: "{colors.blue-600}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blue-700}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-outline:
    backgroundColor: "#ffffff"
    textColor: "{colors.blue-600}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-white:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.full}"
    padding: "1rem 1.875rem"
    height: "56px"
  button-white-hover:
    backgroundColor: "{colors.blue-100}"
  quote-chip:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.25rem 0.75rem 1rem"
    height: "52px"
  quote-chip-hover:
    backgroundColor: "{colors.blue-100}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
    height: "50px"
  choice-pill:
    backgroundColor: "#ffffff"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem 0.5rem 0.8rem"
    height: "46px"
  service-card:
    backgroundColor: "#ffffff"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.5rem, 2.5vw, 2.25rem)"
  form-card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "clamp(1.5rem, 4vw, 2.75rem)"
  nav-cta:
    backgroundColor: "{colors.blue-600}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1.125rem"
    height: "44px"
---

# Design System: ABNA

## Overview

**Creative North Star: "The Light That Stays On"**

The slogan is the system. Night-navy grounds (hero, page hero, CTA band, footer) frame calm white and sky-tinted reading sections, and on the dark grounds one slow beam of light sweeps and one amber lamp glows. Everything else is quiet, legible and local: a real advisor's portrait, a real address, a phone number that stays one tap away.

Density is generous and unhurried; sections breathe on a fluid `section-y` rhythm and content sits in a 1200px container. The incumbent navy/blue identity from the original site is kept; refinement sharpened it into a ramp from night to sky and added the single warm note. Hungarian copy needs latin-ext glyphs (ő, ű) everywhere, so both faces are self-hosted with latin-ext subsets and no third-party font or script is ever loaded.

**Key Characteristics:**
- Night-navy grounds bookend every page; white and sky-50 carry the reading.
- Brand blue is the action colour; amber "lamp" is the only warm hue and is used as light, never as fill.
- Heavy, tight Schibsted Grotesk display over plain Inter body.
- Pill buttons, soft-cornered cards, navy-tinted layered shadows.
- One ambient motion (the beam), one choreographed entrance (the hero), quiet capped reveals everywhere else.

## Colors

A cool night-to-sky blue ramp with a single amber lamp.

### Primary
- **Brand Blue** (blue-600): every primary action (buttons, nav call button, checked choice pills), icon tint on light grounds, focus ring and link colour on light grounds. Hover deepens to **Pressed Blue** (blue-700).

### Secondary
- **Night Navy ramp** (night, navy-900, navy-800, navy-700): the dark grounds. Heroes and the CTA band layer a navy-700 radial bloom over a 160–170deg linear gradient from night to navy-800, with navy-900 as the solid fallback. Footer is flat night. navy-900 also fills step numbers, avatars and the value-column top rule.

### Tertiary
- **Lamp Amber** (lamp): the light that stays on. The hero headline underline, the beam's source glow, rating stars, and the hover underline on the hero phone number. Never text, never a background fill, never a button.

### Neutral
- **Ice Blue** (blue-300): highlighted words and the focus ring on dark grounds, current-page underline in the transparent navbar.
- **Mist** (blue-100): hover fill for white buttons and quote chips.
- **Sky Paper** (sky-50): alternate section ground, tag/benefit/testimonial fills, icon tiles.
- **Ink** (text), **Slate** (text-muted, paragraphs), **Dust** (text-subtle, meta): text on light.
- **On-dark** white / muted / subtle: the same three-step text hierarchy on navy.
- **Hairline** (border) and **Field Edge** (border-strong): card borders and input strokes.
- **Danger** and **Success**: form validation and success state only.

### Named Rules
**The One Lamp Rule.** Amber is the only warm colour and appears as light (a stroke, a glow, a star), at most a few times per page. It never fills a surface or carries text.

**The Bookend Rule.** Every page opens on a night-navy ground and closes on one (CTA band and/or footer). Reading content lives between them on white or sky-50.

## Typography

**Display Font:** Schibsted Grotesk, variable 400–900 (with Inter, system-ui)
**Body Font:** Inter, variable 400–700 (with system-ui, -apple-system, Segoe UI)

**Character:** A dense, newsprint-confident grotesk set heavy and tight for headlines against a neutral, highly legible Inter for everything a client must read. Intermediate weights (550, 650, 750, 850) are used deliberately.

### Hierarchy
- **Display** (850, clamp 3–6rem, 0.98): the home hero headline only; set in masked lines. Subpage heroes use h1 at clamp(2.25rem, 5vw, 3.75rem), 1.04, -0.035em.
- **Headline** (750, clamp 1.875–2.75rem, 1.12): section h2, max ~16–22ch, `text-wrap: balance`.
- **Title** (750, clamp 1.2–1.375rem, 1.25): card and strip h3.
- **Body** (400, 1.0625rem / 1rem under 640px, 1.65): paragraphs in Slate, 46–72ch measures; long-form at 1.75 line-height. `text-wrap: pretty`.
- **Label** (600, 0.9375rem): buttons, form labels, nav links (550). Footer column titles at 0.8125rem / 650 / +0.04em, sentence case.
- **Figures**: phone numbers and hero stats use `tabular-nums`; stats set in display 800.

### Named Rules
**The Heavy-Head, Plain-Body Rule.** Schibsted Grotesk is for headings, figures, the logo and the error code; Inter for every sentence, label and control.

## Layout

Container max 1200px plus fluid gutters (clamp 1–2rem). Sections pad vertically with `section-y`; alternation of white and sky-50 marks rhythm, not borders. Section headers are a two-column grid at 900px+ (heading 1.25fr, lead 1fr, aligned to baseline end). Home hero: 1.12fr / 0.88fr text-and-portrait split; subpages: content plus a 340px sticky sidebar; quote forms: form card plus 360px info rail. Card grids are three-up, collapsing to one column (max 640px) at 960px.

Breakpoints: 1100px (nav call button collapses to icon), 960px (hamburger menu, single-column grids, hero portrait becomes a 64px round byline), 640px (stacked full-width buttons, single-column forms). Fixed navbar 76px (68px under 960px) is transparent over the navy hero and turns white with a hairline shadow on scroll.

## Elevation & Depth

Layered, navy-tinted, soft. Shadows are tinted with navy-900 (never neutral black) and stack a tight contact shadow with a wide ambient one. Cards rest at sm and lift to md on hover; floating overlays use lg. On dark grounds depth comes from radial navy-700 blooms and the beam, not from shadows.

### Shadow Vocabulary
- **Rest** (`--shadow-sm`): service cards at rest.
- **Lift** (`--shadow-md`): hovered cards, form card, dark sidebar card, skip link.
- **Float** (`--shadow-lg`): the about-section address badge that overlaps the portrait.
- **Blue Glow** (`--shadow-btn`): primary buttons and nav call button on hover.
- **Night Drop** (`0 8px 24px rgba(3,10,30,.28)` to `.38`): white buttons and quote chips sitting on navy.

### Named Rules
**The Tinted Shadow Rule.** Every shadow is a navy or brand-blue rgba, never grey or black, and never a hard offset.

## Shapes

Rounded but not soft-toy: pills for anything you press, 12px for things you pick or type in, 18px for cards, 28px for the big portrait and the form card. Icon tiles are 42–56px squares at 10–14px radius; avatars and step numbers are circles. Borders are 1px hairlines on cards and 1.5px on controls. Icons are the Lucide line set (self-hosted sprite, `img/icons.svg`), 1.75 stroke, round caps, coloured with currentColor.

## Components

### Buttons
- **Shape:** full pill (999px), 48px min height (56px large, 42px small), 1.5px border.
- **Primary:** Brand Blue fill, white label, Blue Glow shadow; hover to Pressed Blue with a stronger glow.
- **Secondary (on navy):** transparent with 42% white border; hover adds 10% white fill and solid white border.
- **Outline (on light):** white fill, Field Edge border, blue label; hover border turns Brand Blue.
- **White (on navy):** white fill, navy label, Night Drop; hover Mist.
- **Press:** all buttons nudge down 1px and scale to 0.985.

### Quote Chips
The home hero's working call-to-action: three white 12px-radius chips (52px tall) with a blue product icon, one per quote form. Hover lifts 2px, fills Mist, deepens the Night Drop. Full width under 640px.

### Cards / Containers
- **Service card:** white, hairline border, 18px radius, Rest shadow; hover lifts 3px, border goes 35% blue, icon tile flips from sky-50/blue to blue/white, arrow nudges 4px right. The whole card is the link (stretched pseudo-element).
- **Testimonial / benefit / CTA strip:** sky-50 fill with hairline border, no shadow.
- **Dark sidebar card:** navy-900 with a navy-700 radial bloom, Lift shadow, full-width primary button.
- **Form card:** white, 28px radius, Lift shadow.

### Inputs / Fields
- **Style:** 50px min height, 1.5px Field Edge stroke, 12px radius, white fill; hover stroke darkens.
- **Focus:** border Brand Blue plus a 4px 16% blue halo.
- **Error:** Danger border and halo, inline message with a masked alert icon, sliding in 4px.
- **Choice pills:** radio/checkbox options as 46px pills; checked state is Brand Blue border on a pale blue fill.

### Navigation
Transparent over the hero with on-dark-muted links; a 2px underline draws from the left on hover and marks the current page (Ice Blue on dark, Brand Blue when scrolled). Scrolled or open, the bar turns white. The blue pill call button always shows the phone number (icon-only under 1100px). Under 960px a two-bar toggle opens a white drop-down menu of 52px rows with blue icons.

### Hero Entrance (signature)
Runs once fonts are ready (`html.is-loaded`, with a 1.5s failsafe). Headline lines rise out of a mask (translateY 105% to 0, 1.05s, second line +0.1s); the lamp underline draws left to right (scaleX 0 to 1, 0.9s, 0.8s delay); lead, quote chips and stats fade up 14px in a 0.3 / 0.42 / 0.54s cascade; the portrait reveals bottom-up via `clip-path: inset()` (1.3s) while its image settles from scale 1.08. Subpage heroes cascade their children at 60ms steps, capped at the fifth. Hero stats count up once with an expo-out curve.

### The Beam (signature)
An absolutely positioned, pointer-less conic wedge of Ice Blue light, radially masked, rotating between -14deg and 22deg over 18s alternate with the in-out curve, with a small amber-to-blue lamp glow at its source. It sits on the home hero (upper right) and the CTA band (top centre). It is the only infinite animation in the system.

### Scroll Reveal
Elements opt in with `.reveal`; only `html.js` hides them, so content is visible without JavaScript. Reveal is opacity plus an 18px rise (0.8–0.9s ease-out), triggered once by IntersectionObserver. Stagger is `--d` times 90ms and is capped at `--d:3` (270ms).

### Reduced Motion
The beam freezes at 4deg; masks, clip-paths, rises, lifts on hover and the check-draw are removed; entrances and reveals become a 0.4s opacity fade with no delay; count-up is skipped; smooth scroll is disabled.

## Do's and Don'ts

### Do:
- **Do** open and close every page on a night-navy ground and keep reading content on white or sky-50.
- **Do** use Brand Blue for every primary action and keep the phone number one tap away (nav call button, hero, sidebar, CTA).
- **Do** keep the lamp as light: underline, glow, star, hover underline.
- **Do** switch the focus ring to Ice Blue on dark grounds; keep it Brand Blue on light.
- **Do** gate every entrance on `html.js`, cap reveal stagger at 270ms, and ship the reduced-motion path with any new motion.
- **Do** use the self-hosted Lucide sprite at 1.75 stroke for icons and keep latin-ext subsets for both faces.

### Don't:
- **Don't** fill a surface, button or text with amber.
- **Don't** use neutral grey or black shadows, or hard offset shadows.
- **Don't** add a second ambient loop; the beam is the only infinite motion.
- **Don't** load fonts, icons or scripts from a third-party host.
- **Don't** set body copy or labels in Schibsted Grotesk, or headings in Inter.
