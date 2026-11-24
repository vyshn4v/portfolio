# CR-022: Disable Hero Scroll Indicator on Mobile Viewports

## Title
Disable Hero Scroll Indicator on Mobile Viewports

## Description
This change request disables the "SCROLL TO EXPLORE" hint on mobile devices (`≤768px`) in favor of a clean, swipe-first mobile user experience:

1. **Swipe-First Mobile Experience (`Hero.css`)**:
   - Set `.hero-scroll-hint { display: none; }` on viewports `≤768px`.
   - On touchscreens, users naturally flick/swipe down to browse. Removing the desktop-centric click/scroll hint gives the bottom location bar full breathing room and eliminates mobile visual noise.
2. **Simplified Footer Bar**:
   - Cleaned up `.hero-footer-bar` on mobile so the location metadata (`.hero-location-info`) sits uninterrupted across the bottom border without extra stacked elements or unnecessary animation keyframes.
3. **Preserved Desktop Polish**:
   - The desktop scroll hint (`SCROLL TO EXPLORE [—] ↓`) remains fully active on screens `>768px` with its smooth scroll navigation to `#about`.

## Date
2026-11-24

## Affected Files
- [Hero.css](../../src/components/Hero/Hero.css) - Hid `.hero-scroll-hint` on mobile (`≤768px`) and simplified `.hero-footer-bar`.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified mobile layout via Playwright screenshots across 320px, 375px, and 414px viewports.
