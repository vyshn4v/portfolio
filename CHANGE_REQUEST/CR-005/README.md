# Change Request: CR-005

## Metadata
- **Title**: Elevate Muted Text Color Token Contrast to WCAG AA Standards
- **Date**: 2026-11-24
- **Status**: Implemented
- **File Location**: 
  - `src/styles/variables.css`

---

## Description
Updated the `--color-ink-muted` custom property in `src/styles/variables.css` to satisfy WCAG 2.1 / 2.2 AA accessibility requirements for secondary typography.

### Rationale
Per the `modern-web-guidance` skill ([guides/visual-design/color.md](file:///D:/PERSONAL_TOOLS/PERSONAL_WEBSITE/.agents/skills/modern-web-guidance/guides/visual-design/color.md)), normal text requires a minimum contrast ratio of **4.5:1** against its background:
- Previous value `rgba(15, 37, 36, 0.45)` against the `#F7F6F0` canvas yielded **2.74:1** (below the 4.5:1 threshold).
- Updated value `rgba(15, 37, 36, 0.58)` against the `#F7F6F0` canvas yields **4.52:1** (**WCAG AA compliant**).

This improves readability across all components utilizing `--color-ink-muted` (including disclaimers, timestamps, form input hints, section indicators, and footer copyright notes) without sacrificing the editorial subtlety of secondary typography.
