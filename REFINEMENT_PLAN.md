# Navigation, type, motion and card refinement

The owner approved the recommendations from the previous review and added card design to scope. The existing version through `8f083ee` was pushed to origin/main first, as explicitly requested. The two pre-existing build output edits remain excluded from commits.

## Scope

1. Slim the navigation to 64px, use a single-line Thimira wordmark, retain four section links and a quiet resume link, and give current navigation a smooth moving indicator.
2. Self-host Bricolage Grotesque for display typography, keeping Manrope for navigation and reading. Preserve the palette and finished pixel illustration.
3. Add sparse, slow background pixels around the edges. Share the workspace's pause control, respect system reduced motion, and suspend activity in hidden tabs.
   The owner subsequently requested more visible header activity and extra background graphics, then explicitly asked for gentle motion. Keep the desk grounded; animate monitor code, cursor and steam. Add low-contrast geometric pixel stars, diamonds and a stepped trail at the edges. Avoid idle vertical bobbing and use a critically damped pointer response.
4. Refine selected projects with a prominent left-hand screenshot and a clear Problem / My contribution / Outcome description list using existing facts. Keep native case-study disclosures and project filtering.
5. Give secondary projects, credentials and awards lighter surfaces and consistent borders, spacing and restrained hover states. Keep informational timeline entries steady.
6. Give contact a stronger closing composition, a direct email action, visible internship availability and a separately framed message form. Preserve contact details and the actual form service.

## Tools and verification

Use Motion for React for interruptible spring-based movement; keep deterministic background loops in CSS. Avoid adding other animation dependencies. Verify the production build, interaction tests, keyboard navigation, global pause, reduced motion, fonts loading, both themes, mobile, tablet and desktop. Capture in batched rounds and record the finished system in DESIGN.md and its sidecar.

## Network history

The initial push, font request and Motion installation timed out on the university connection. The owner changed networks. The baseline push then succeeded and font downloads resumed. No network settings were changed persistently.
