# Portfolio maintenance — 9 November 2026

This pass resolves the dependency audit, adds the owner's current CVs, improves GreenOps evidence, and fixes a short-screen navigation issue. The established ink, sand, and lime design and confirmed personal/project details are preserved.

## Dependencies

| Checkpoint | Low | Moderate | High | Critical | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Original dependency tree | 18 | 16 | 32 | 3 | 69 |
| Compatible updates | 16 | 5 | 13 | 0 | 34 |
| Vite/Vitest migration | 0 | 0 | 0 | 0 | 0 |

The remaining Create React App chains could not be resolved through compatible updates. The project now uses Vite 8.3.6 and Vitest 5.1.0, with React 18 retained. No forced audit fix or vulnerability-suppressing overrides were used. The installed tree has 203 dependencies, compared with more than 1,300 previously. These audit results describe the advisory database at verification time.

`npm start` still serves port 3000. `npm run build` still writes `build/`; `BUILD_PATH` supports isolated verification builds. `vercel.json` explicitly keeps that output directory on the existing Vercel host. The HTML entry moved to the project root, React files use `.jsx`, and public content paths use Vite's base URL. The existing interaction tests were migrated rather than removed.

## Current CVs

- The supplied software engineering and DevOps PDFs are hosted unchanged in `public/cv/`.
- Software engineering is the main hero action, with a direct DevOps alternative.
- The header CV chooser and mobile navigation expose both versions.
- The chooser supports Escape with focus return, outside-pointer dismissal, and direct PDF links.
- Both two-page PDFs were opened and visually inspected, and their hashes match the supplied originals.

## GreenOps and navigation

The GreenOps preview uses the documented Azure telemetry → .NET collection → SCI/Roslyn analysis → observability flow. Its existing dashboard screenshot remains available in an expandable disclosure and opens at full size. No populated dashboard or measured results were fabricated.

The mobile navigation now scrolls within the available viewport height. Its last CV link remains reachable on a 667 × 375 landscape screen.

The new elements reuse the existing color tokens, typography, icon family, disclosure behavior, and rounded-control treatment. The design system's palette, fonts, and motion settings are unchanged; `DESIGN.md` and its token sidecar are preserved.

## Verification

- 4 test files and 25 interaction tests pass, including CV access/dismissal and GreenOps evidence retention.
- Production build passes; JavaScript is 117.95 KB and CSS 12.71 KB gzipped.
- Development server starts and serves the HTML entry, transformed React module, and current PDF.
- Browser checks cover 320, 375, 540, 667, 768, 812, 820, 1024, and 1440-pixel widths, including light/dark themes and reduced motion.
- No horizontal overflow, checked text contrast failures, or runtime exceptions were found in the tested states.
- Shared pause/resume, offscreen suspension, reduced motion, current navigation, CV keyboard dismissal, and PDF responses were verified.
- Both PDF requests returned HTTP 200, `application/pdf`, valid PDF signatures, and the expected file sizes.
- The design detector returned no findings.
- Independent finish review: **ship** for this maintenance scope, with no material fixes requested.

The two pre-existing tracked build-file edits are excluded from this maintenance work. Verification builds use an ignored temporary output directory.
