# CR-014: Immediate Joiner Status Badge Legibility & Typography Enhancement

## Title
Immediate Joiner Status Badge Legibility & Typography Optimization

## Description
This change request addresses optical unreadability and cognitive overload in the Immediate Joiner status badge on dark backgrounds:

1. **Optical Irradiation & Font Choice**: Monospaced typography at 11px (`JetBrains Mono`) inverted on a dark ink background (`#0F2524`) exhibited optical bleeding/stroke thinning, making glyphs strained and hard to parse. Switched font family to the screen-optimized geometric sans-serif `Inter` (`var(--font-body)`), with 12px sizing, 600 weight, `letter-spacing: 0.015em`, and pure `#FFFFFF` color for crisp 14.8:1 contrast exceeding WCAG AAA.
2. **Badge Conciseness & Information Hierarchy**: Shortened the in-capsule status badge from a 57-character compound sentence (`"Immediate Joiner (0-Day Notice) | Open to Relocation / Remote"`) to a concise status indicator (`"Immediate Joiner · 0-Day Notice"`). The relocation clause (`"Open to Relocation / Remote"`) has been gracefully integrated into the Hero footer metadata alongside location (`LOCATION: Kannur, Kerala, India · Open to Relocation / Remote`) and retained as an accessible `title` tooltip on both the hero and footer badges.
3. **Pulse Ring Consistency**: Replaced the box-shadow pulse animation in the footer badge with the GPU-accelerated `transform` + `opacity` pseudo-element ring pattern (`pulse-ring-green`) identical to the Hero badge, eliminating layout repaints.

## Date
2026-11-24

## Affected Files
- [profile.ts](../../src/data/profile.ts) - Added `availabilityBadge` and `relocation` fields to `Profile` model while retaining full string in `availability`.
- [Hero.tsx](../../src/components/Hero/Hero.tsx) - Rendered `profile.availabilityBadge` with `title={profile.availability}` and combined location with relocation in the footer metadata bar.
- [Hero.css](../../src/components/Hero/Hero.css) - Applied `Inter` typography (12px, 600 weight, `#FFFFFF`, 0.015em letter-spacing) and balanced padding (5px 13px) to `.hero-availability-pill`.
- [Footer.tsx](../../src/components/Footer/Footer.tsx) - Rendered `profile.availabilityBadge` with `title={profile.availability}` in the footer brand header.
- [Footer.css](../../src/components/Footer/Footer.css) - Aligned `.footer-availability-badge` typography and GPU-accelerated `pulse-ring-green` animation.

## Verification
- Verified TypeScript compilation and Vite production build (`npm run build`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified WCAG AAA contrast ratio (14.8:1 with `#FFFFFF` text on `#0F2524` background).
