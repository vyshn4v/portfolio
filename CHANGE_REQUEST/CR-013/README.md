# Change Request: CR-013

## Title
Invert Immediate Joiner Availability Pill to Dark Capsule with Light Typography

## Date
2026-11-24

## Author
Senior Software Engineer (Antigravity)

## Status
Completed

---

## Description
Updated the immediate joiner availability pill in the Hero section and the footer availability badge to a high-contrast dark capsule aesthetic:
- **Background**: Switched to `var(--color-ink)` (`#0F2524`), giving the chip a crisp, authoritative dark boundary against the off-white page canvas (`#F7F6F0`).
- **Typography**: Set text color to `var(--color-bg)` (`#F7F6F0`), ensuring exceptional legibility (contrast ratio > 14:1, exceeding WCAG AAA requirements).
- **Status Beacon**: Updated the pulsing dot to vibrant emerald green (`#22C55E`) with a matching GPU-accelerated `::before` pseudo-element pulse ring (`transform` + `opacity` only).
- **Interactivity**: Added subtle elevation on hover (`translateY(-1px)` and box shadow) for refined micro-interaction.

---

## File Locations
- [src/components/Hero/Hero.css](../../src/components/Hero/Hero.css)
- [src/components/Footer/Footer.css](../../src/components/Footer/Footer.css)
- [CHANGE_REQUEST/CR-013/README.md](./README.md)
