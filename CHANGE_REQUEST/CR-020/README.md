# CR-020: Hero Section Mobile Location & Eyebrow Responsive Polish

## Title
Hero Section Mobile Location & Eyebrow Responsive Polish

## Description
This change request enhances mobile responsiveness, visual alignment, and typography for the location metadata and top eyebrow in the Hero section:

1. **Semantic, Icon-Anchored Location Bar (`Hero.tsx`)**:
   - Replaced the rigid text label `<span>LOCATION:</span>` with a tactile, accessible `<MapPin size={13} className="hero-location-pin" aria-hidden="true" />` icon from `lucide-react`.
   - Structured location details into semantic sub-spans: `.hero-location-city` (`profile.location`), `.hero-location-sep` (`·`), and `.hero-location-pref` (`profile.relocation`).
   - Prevents awkward hanging indent and vertical floating when wrapping across viewports.

2. **Mobile-First Responsive Layout (`Hero.css`)**:
   - Upgraded `.hero-location-info` on mobile (`≤768px`) with `align-items: flex-start` and top-aligned `MapPin` icon (`margin-top: 2px`) so the pin stays anchored to the first line during multi-line wraps.
   - Set `.hero-location-text` to natural inline wrapping with proportional line-height (`1.5`) and tuned letter spacing (`0.03em`), avoiding harsh word breaks on 320px–390px screens.
   - Enhanced `.hero-eyebrow-row` on mobile (`≤768px` and `≤480px`) with `flex-direction: column` and `align-items: flex-start`, ensuring the role headline and Immediate Joiner pill stack gracefully without horizontal cramping.

## Date
2026-11-24

## Affected Files
- [Hero.tsx](../../src/components/Hero/Hero.tsx) - Added `MapPin` icon and structured location DOM hierarchy.
- [Hero.css](../../src/components/Hero/Hero.css) - Added responsive styling for location metadata and eyebrow stack on mobile viewports.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified mobile rendering across 320px, 375px, and 414px viewports via Playwright screenshots.
