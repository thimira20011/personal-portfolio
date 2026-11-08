# Living portfolio redesign

## Confirmed direction

Primary audience: software engineering internship recruiters. Ink black and warm sand are the primary colors; the owner selected electric lime highlights, an animated pixel developer workspace, and direct implementation in React. Preserve factual content and working interactions. Local commits are permitted; pushing and publishing are not.

## Reference findings

- [Aditya Dubey](https://ad1tya.me/): a distinct character illustration, strong personal name, compact navigation, and immediate resume/contact access. Borrow the idea of a memorable personal artifact, not the ASCII illustration or layout.
- [Redoyanul Haque](https://www.redoyanulhaque.me/): automated capture remained at the loading presentation; its final transitions could not be reliably assessed. Do not invent an animation analysis or reproduce its blocking loader.
- [Developer portfolios collection](https://github.com/emmabostian/developer-portfolios): use as a discovery reference, not a template or source of copied assets.

## Implementation sequence

1. Replace blue theme tokens with an ink-and-sand system in both themes, electric lime actions, and readable muted colors. Use the existing self-hosted fonts with a stronger Manrope display treatment.
2. Recompose the hero around a large headline and original pixel workspace. Keep the resume visible. Move the real portrait to About so personal identity remains present.
3. Animate the scene with a monitor cursor, coffee steam and a small signal light. Add subtle pointer depth, bounded to the artwork. Provide pause/resume; pause offscreen and in hidden tabs. Reduced-motion mode is still by default.
4. Choreograph masked hero lines, staggered supporting copy, distinct project image reveals, short responsive hover feedback, and animated native disclosures. Keep native scrolling and links. No blocking loader or delayed access to content.
5. Extend warm surfaces and lime interaction details through projects, experience, credentials and contact. Keep reading text still after its first entrance.
6. Verify the production build, interaction suite, scene pause/reduced-motion behavior, keyboard access, both themes, 375px phone, landscape phone, tablet and desktop. Inspect rendered results in two batched rounds.

## Motion intent

Hero/scene: rare first-visit delight and state indication. Project entrances: orientation and continuity, once only. Buttons: immediate feedback. CSS handles deterministic motion; WAAPI handles viewport reveals; pointer movement updates only the scene layer without React renders. Shared strong ease-out tokens remain; UI responses 160–240ms, marketing entrances 600–900ms with 60–80ms overlap.

## Known limits

The design skill's remote concept service was unavailable. The user's explicit palette and workspace selection determine the direction. The UI skill's pixel-art search matched the illustration style but suggested arcade fonts and red/blue colors; those suggestions are rejected because they conflict with this professional portfolio and the user's palette. Its React effect cleanup guidance applies; React 19-only APIs do not apply to this React 18 app.
