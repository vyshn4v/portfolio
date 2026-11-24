# CR-021: Hero Section Accessible Mobile Scroll Cue & Target Optimization

## Title
Hero Section Accessible Mobile Scroll Cue & Target Optimization

## Description
This change request addresses the mobile ergonomics, touch target accessibility, and scrolling destination of the "SCROLL TO EXPLORE" hint in the Hero section:

1. **Accessible 44px Touch Target (`Hero.css`)**:
   - Converted the mobile scroll hint into a dedicated, centered micro-pill meeting WCAG 2.5.5 minimum touch target requirements (`min-height: 44px`, `min-width: 44px`).
   - Added subtle tactile elevation (`border: 1px solid rgba(198, 190, 165, 0.45)`, `border-radius: 999px`, `box-shadow`) and active touch feedback.
   - Included gentle keyframe animation (`bounceDown`) on the down arrow, with full `prefers-reduced-motion` compliance.

2. **Optimized Scroll Destination (`Hero.tsx`)**:
   - Updated `handleScrollClick` to target `#about` (the primary editorial section following Hero) with smooth scrolling, falling back to `.marquee-container`.
   - Updated `aria-label` to `"Scroll to explore about and featured projects"`.

3. **Desktop & Mobile Harmony**:
   - Preserves the sleek editorial line-indicator layout on desktop screens (>768px).
   - Resolves the left-aligned orphan stacking on mobile screens (≤768px) by centering the pill beneath the full-width location bar.

## Date
2026-11-24

## Affected Files
- [Hero.tsx](../../src/components/Hero/Hero.tsx) - Updated scroll destination to `#about` and added semantic class names to scroll hint children.
- [Hero.css](../../src/components/Hero/Hero.css) - Implemented centered mobile micro-pill, 44px touch target, and bounce animation.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified mobile touch target ergonomics and desktop hover physics across viewports.
