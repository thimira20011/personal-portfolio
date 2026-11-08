---
name: Thimira Portfolio
description: Ink, sand, and electric lime around an original living pixel workspace.
colors:
  ink-black: "#171714"
  sand-brown: "#c3a47d"
  electric-lime: "#c4f464"
  action-ink: "#20251a"
  light-page: "#ece4d6"
  light-surface: "#f5eee3"
  light-surface-alt: "#e1d4c1"
  light-ink: "#23231e"
  light-muted: "#595346"
  light-subtle: "#665c4c"
  light-line: "#c7b9a3"
  light-accent: "#426015"
  light-accent-soft: "#e0e8c9"
  light-positive: "#446023"
  light-positive-soft: "#e2e6cf"
  light-error: "#a52920"
  light-sand: "#8a6943"
  dark-surface: "#20201b"
  dark-surface-alt: "#2b2a23"
  dark-ink: "#eee5d5"
  dark-muted: "#bfb39e"
  dark-subtle: "#b3a58e"
  dark-line: "#444236"
  dark-accent-soft: "#303a23"
  dark-positive: "#c4d5a6"
  dark-positive-soft: "#2d3425"
  dark-error: "#ffb0a5"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(44px, 4.9vw, 70px)"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 3.5vw, 48px)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  tag: "5px"
  control: "8px"
  card: "12px"
  navigation: "14px"
  primary-frame: "16px"
spacing:
  tight: "8px"
  compact: "12px"
  group: "16px"
  inset: "24px"
  block: "32px"
  section-title: "48px"
  section: "clamp(64px, 7vw, 112px)"
components:
  button-primary:
    backgroundColor: "{colors.electric-lime}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  input:
    backgroundColor: "{colors.light-page}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  navigation:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-muted}"
    rounded: "{rounded.navigation}"
    height: "72px"
  filter:
    backgroundColor: "{colors.electric-lime}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  project-card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.primary-frame}"
---

# Design System: Thimira Portfolio

## Overview

**Creative North Star: "A little corner of my world"**

A little corner of my world pairs a finished pixel workspace with a readable engineering portfolio. Ink black and warm sand carry the surfaces and typography; electric lime identifies actions and interaction states.

The interface uses tonal layers, restrained borders, and clear type rather than ornamental chrome. Motion introduces the work and animates the decorative scene while leaving reading content still after arrival.

**Key Characteristics:**

- Ink and sand surfaces with lime actions.
- Bold Manrope display and readable supporting text.
- Original pixel artwork with a visible pause control.
- Adaptive layouts and a still reduced-motion composition.

## Colors

Ink black and sand brown are the primary identity colors; lime is the highlight and action color. The frontmatter records the implemented values. Component frontmatter records the root light theme; the CSS semantic variables adapt those components in dark mode.

| CSS role | Light token | Dark token |
| --- | --- | --- |
| Page | light-page | ink-black |
| Surface / alternate | light-surface / light-surface-alt | dark-surface / dark-surface-alt |
| Text / muted / subtle | light-ink / light-muted / light-subtle | dark-ink / dark-muted / dark-subtle |
| Divider | light-line | dark-line |
| Link / focus | light-accent | electric-lime |
| Accent surface | light-accent-soft | dark-accent-soft |
| Action / action text | electric-lime / action-ink | electric-lime / action-ink |
| Sand emphasis | light-sand | sand-brown |
| Positive / supporting surface | light-positive / light-positive-soft | dark-positive / dark-positive-soft |
| Error | light-error | dark-error |

The darker olive link color keeps small text readable on light sand. Lime retains its stronger role on primary buttons in both themes. Selection uses action and action-text colors; carets and focus rings use the accent.

**The Theme Pair Rule.** Use the semantic CSS variables for surfaces and text so each foreground travels with its light or dark background.

## Typography

**Display Font:** Manrope, sans-serif. **Body Font:** Manrope, sans-serif. The variable font is self-hosted; its license lives in public/fonts.

The frontmatter's display, headline, title, body, and label roles describe the primary desktop hierarchy. Hero supporting copy uses 16px text at 1.9 line height and a 53ch measure; section descriptions use a 65ch measure. Project body copy uses 14–16px text. Inputs remain 16px.

At widths up to 1100px the hero uses clamp(36px, 4.9vw, 54px). Below 768px it uses clamp(35px, 8.5vw, 60px); below 375px it uses 32px. Mobile project titles use 32px, or 30px on the smallest breakpoint. Headings balance their lines; paragraphs use pretty wrapping.

**The Readable Type Rule.** Pixel art belongs to the illustration; the interface and engineering content remain in Manrope.

## Layout

The main container is 1296px including 48px horizontal gutters. Gutters become 32px up to 1100px, 24px below 768px, and 20px below 375px. Section space is fluid; heading-to-content space is 48px on desktop and 32px on mobile.

The hero uses a 1.15:1 column ratio and a 48px by 24px gap, with a three-column proof strip at its base. Below 768px the copy, artwork, and proof links stack. Selected projects use paired text and image columns on desktop; mobile reading order is text, image, then the native case-study disclosure. About pairs a portrait with biography columns before stacking on smaller screens.

## Elevation & Depth

Tonal surfaces and single borders separate most content. Project previews use an offset soft shadow (0 16px 32px -18px rgb(22 20 14 / 40%)); the mobile menu uses a softer offset shadow (0 16px 32px -20px rgb(0 0 0 / 30%)). Supporting content panels remain flat.

**The Still Reading Rule.** Reading content enters once and stays still; ongoing animation belongs to the pausable decorative workspace.

## Shapes

Controls have gently rounded corners; tags are tighter, supporting cards use 12px corners, and primary project/portrait frames use the 16px frame radius. Navigation uses a 14px shell, becoming 12px on mobile. Focus outlines are immediate, 3px wide, and offset by 4px. The artwork retains its own transparent silhouette.

## Components

**Buttons.** Primary actions use lime with dark text; secondary actions use the theme surface and divider. Standard actions are at least 52px high; icon controls are 44px square. Press feedback scales to 0.97 over 160ms. Fine-pointer hover raises buttons by 1px. Keyboard focus remains immediate.

**Filters and tags.** Filters are 44px-high controls; selection uses the primary action pair and aria-pressed. Technology tags are passive labels with alternate-surface fills and muted text.

**Cards and disclosures.** Selected projects pair a surface text region with an alternate-surface screenshot region. Padding is 36px on desktop, 28px at intermediate widths, and 24px on mobile. Case studies use native details/summary controls. Disclosure content enters over 240ms; keyboard-triggered disclosure content appears without that entrance.

**Inputs.** Fields use page-colored fills, theme text, a divider border, 8px corners, and 12px by 14px padding. Placeholders use muted text. Errors use the theme error color; disabled fields dim. Textareas can resize vertically.

**Navigation.** The fixed shell is 72px high on desktop and 64px on mobile. Current links use the accent and a 240ms underline transition. No content link remains current at Home. Below 768px a button exposes the vertical menu; Escape closes it and returns focus.

**Pixel workspace and motion.** The original transparent 960 by 640 WebP is decorative. CSS animates a monitor cursor (2.6s), signal light and steam (3.6s), and small pixels (6s). A visible control pauses the scene. Scene animation and pointer depth suspend offscreen, in hidden tabs, and under reduced motion. Fine-pointer depth is bounded and updates the artwork layer directly.

Hero lines enter over 900ms with an 80ms separation. Supporting elements overlap at 60ms intervals; the artwork settles over 1000ms. Offscreen content reveals once through WAAPI over 700ms, with project-image reveals over 900ms. The strong ease-out is cubic-bezier(0.23, 1, 0.32, 1); on-screen travel uses cubic-bezier(0.77, 0, 0.175, 1). Reduced motion removes positional animation and retains short color/opacity feedback.

## Do's and Don'ts

### Do:

- **Do** pair semantic foreground and background variables in both themes.
- **Do** keep controls at least 44px high and form text at 16px.
- **Do** gate hover movement to fine pointers and honor reduced motion.
- **Do** retain the original artwork's transparency and provenance.

### Don't:

- **Don't** use the pixel artwork's styling as a body-text font.
- **Don't** hide reading content behind a loader or replay entrances on every scroll.
- **Don't** run the artwork when paused, offscreen, in a hidden tab, or under reduced motion.
