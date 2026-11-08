# Portfolio visual system

This is a refinement of the established blue engineering portfolio, aimed at software engineering internship recruiters.

## Foundations

- Display: self-hosted Space Grotesk, weight 500; body: self-hosted Manrope, weights 400–700. Fonts are licensed under the SIL Open Font License; licenses ship in `public/fonts`.
- Display scale: 32–74px hero, 30–48px section headings, 30–36px project titles, 19–25px supporting headings. Body text is 14–18px, with 1.7–1.9 line height; utility text is 12–13px.
- Main container: 1296px including 48px gutters, 32px at intermediate widths, 24px on mobile, 20px on small phones.
- Spacing: 4px base, with 8/12/16/20/24/28/32/40/48/56/64px intervals. Section space is fluid from 64–112px.
- Radius: 5px labels, 8px controls, 12px supporting cards, 16px primary project and portrait frames.

## Semantic colors

| Token | Light | Dark |
| --- | --- | --- |
| Page | `#f8fafc` | `#0b1524` |
| Surface | `#ffffff` | `#101f32` |
| Alternate surface | `#edf2f8` | `#172a40` |
| Ink | `#172b45` | `#ecf3fa` |
| Muted | `#4e627a` | `#b3c3d6` |
| Line | `#d9e2ed` | `#2a3d54` |
| Accent / action | `#086aa8` | `#8bd3ff` |
| Action text | `#ffffff` | `#10263d` |

## Composition and interactions

The portrait and resume lead the hero; relevant awards, leadership, and writing support them. Selected project text and screenshots sit side by side on desktop and stack in reading order on phones. Case studies remain native `details` elements. About uses open columns; writing uses ruled rows. Avoid nested decorative panels, tilted images, gradient text, and repeating numbered section labels.

Primary controls are at least 44px; form fields use 16px text. Focus rings appear immediately. Motion tokens are defined in `src/index.css`; timing and interaction styles live in `src/lively.css`. Entrance and press easing: `cubic-bezier(0.23, 1, 0.32, 1)`; on-screen travel: `cubic-bezier(0.77, 0, 0.175, 1)`. Hero stagger: 60ms; hero motion: 420–700ms; component entrances: 420ms; press response: 160ms. Hover movement requires a fine pointer. Reduced motion removes positional movement and keeps short color feedback.
