# CR-023: About Section Shared Responsive Card Heights & Dynamic Pillar Labels

## Title
About Section Shared Responsive Card Heights & Dynamic Pillar Labels

## Description
This change request addresses the two code review comments on the About section:

1. **Shared Responsive Desktop Height Rule (`About.css`)**:
   - Replaced disparate, fixed `min-height: 104px` properties on `.metric-card` and `.about-feature-card` with a consolidated shared responsive sizing rule:
     ```css
     .metric-card,
     .about-feature-card {
       min-height: clamp(124px, 10.5vw, 136px);
       box-sizing: border-box;
       padding: 20px 24px;
     }
     ```
   - Consolidated shared surface styling (background, border, radius, shadow, hover micro-transitions) into a DRY combined selector.
   - Guarantees identical rendered heights for each matching pair across all viewport widths above 960px with zero content clipping or padding overflow.
   - Resets to `min-height: auto` on mobile (`≤640px`) for fluid touch ergonomics.

2. **Dynamic Pillar Labels via `profile.about` (`profile.ts` & `About.tsx`)**:
   - Added `metricsLabel` and `capabilitiesLabel` (plus `eyebrow`) to the `AboutContent` interface in `profile.ts`.
   - Populated `profile.about` with:
     - `metricsLabel: "PROVEN SCALE & IMPACT"`
     - `capabilitiesLabel: "CORE ARCHITECTURAL FOCUS"`
     - `eyebrow: "ENGINEERING SUMMARY"`
   - Updated `About.tsx` to render `{profile.about.metricsLabel}` and `{profile.about.capabilitiesLabel}` dynamically, eliminating embedded hardcoded strings.

## Date
2026-11-24

## Affected Files
- [profile.ts](../../src/data/profile.ts) - Added `metricsLabel`, `capabilitiesLabel`, and `eyebrow` fields to `AboutContent` interface and object.
- [About.tsx](../../src/components/About/About.tsx) - Rendered dynamic pillar labels from `profile.about`.
- [About.css](../../src/components/About/About.css) - Implemented shared responsive `min-height: clamp(124px, 10.5vw, 136px)` rule and consolidated DRY surface styling.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified identical matching pair heights across desktop viewports (961px, 1024px, 1200px, 1440px) via Playwright.
