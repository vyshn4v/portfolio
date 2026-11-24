# CR-015: System-Wide Badge Legibility, WCAG Contrast Standards & Typography Harmonization

## Title
System-Wide Badge Legibility, WCAG Contrast Standards & Typography Harmonization

## Description
Following the modern web guidance analysis for badge legibility and optical contrast, this change request implements system-wide contrast and typography enhancements across all portfolio sections:

1. **Accessible Color Tokens**:
   - Added `--color-orange-text: #A84805;` in `variables.css`. When paired against the `#F7F6F0` light body background, this provides an accessible **5.40:1** contrast ratio (comfortably surpassing the WCAG AA 4.5:1 minimum threshold for normal text where `#D7720C` previously sat at only 3.08:1).
   - Increased `--color-ink-muted` opacity from `0.58` to `0.65` (`rgba(15, 37, 36, 0.65)`), lifting metadata contrast from 3.96:1 to **4.92:1** (WCAG AA compliant) while preserving the muted visual hierarchy for timestamps, location prefixes, and technical metrics.
2. **Badge & Status Pill Legibility**:
   - **QStack In-Dev Status Badge**: Updated text color to `--color-orange-text` on `rgba(168, 72, 5, 0.12)`, elevating contrast from 2.71:1 (critical fail) to **4.55:1** (WCAG AA compliant).
   - **Contact Social Action Badges**: Upgraded `.active-pill-tag` from 10px monospace (`#8EAAA4`) to screen-optimized `Inter` (11px, weight 600, `#A7F3D0` on `rgba(47, 105, 100, 0.4)`), lifting contrast to **8.2:1** and eliminating optical stroke irradiation.
   - **Footer Agency Badge**: Updated `CONSULTANCY` pill to use `Inter` 11px with `--color-orange-text` on subtle tint (4.55:1 contrast).
   - **Philosophy & QStack Badges**: Normalized pill typography to `Inter` (11px, 600 weight, 999px border-radius).
3. **Micro-Text Elimination**:
   - Upgraded all 9px and 10px micro-text in Domain Scanner audit results and technical diagram telemetry to 11px with clear contrast.
4. **SVG Accessibility Compliance**:
   - Applied `aria-hidden="true"` to decorative social inline SVGs in `Contact.tsx` (`GithubIcon`, `LeetCodeIcon`, `LinkedinIcon`), the Contact panel background ambient SVG, and the acrylic brush stroke in `Blob.tsx`.

## Date
2026-11-24

## Affected Files
- [variables.css](../../src/styles/variables.css) - Added `--color-orange-text: #A84805` and tuned `--color-ink-muted: rgba(15, 37, 36, 0.65)`.
- [typography.css](../../src/styles/typography.css) - Applied `--color-orange-text` to `.eyebrow`.
- [Experience.css](../../src/components/Experience/Experience.css) - Applied `--color-orange-text` to `.experience-period`, `.awards-heading`, and `.bullet-index`.
- [Skills.css](../../src/components/Skills/Skills.css) - Applied `--color-orange-text` to `.category-index`.
- [Certifications.css](../../src/components/Certifications/Certifications.css) - Applied `--color-orange-text` to `.cert-link-btn`, `.edu-period`, and `.language-level`.
- [Projects.css](../../src/components/Projects/Projects.css) - Optimized `.project-status-badge.in-dev` contrast (4.55:1), `.project-status-badge.live`, Domain Scanner status pills (11px Inter), and QStack diagram chips.
- [YohoAgentSurface.tsx](../../src/components/Projects/YohoAgentSurface.tsx) - Enhanced blueprint header badge with `#A7F3D0` text on dark teal pill.
- [Contact.css](../../src/components/Contact/Contact.css) - Enhanced `.active-pill-tag` with `#A7F3D0` and `.pending-pill` with 11px `Inter` rounded pill treatment.
- [Contact.tsx](../../src/components/Contact/Contact.tsx) - Added `aria-hidden="true"` to decorative SVGs.
- [Blob.tsx](../../src/components/Blob/Blob.tsx) - Added `aria-hidden="true"` to ambient decorative SVG.
- [Footer.css](../../src/components/Footer/Footer.css) - Applied `--color-orange-text` and 11px `Inter` to `.agency-badge`.
- [Philosophy.css](../../src/components/Philosophy/Philosophy.css) - Applied 11px `Inter` to `.philosophy-tag`.

## Verification
- Verified TypeScript compilation and Vite production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified WCAG AA contrast compliance across all text and badge states:
  - `--color-orange-text` on `#F7F6F0`: **5.40:1** (Passes WCAG AA)
  - `--color-ink-muted` on `#F7F6F0`: **4.92:1** (Passes WCAG AA)
  - In-Dev status badge: **4.55:1** (Passes WCAG AA)
  - Contact action pills: **8.20:1** (Passes WCAG AAA)
