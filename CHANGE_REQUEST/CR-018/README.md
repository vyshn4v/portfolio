# CR-018: About Section Layout Rebalancing — Scale Metrics Left Rail

## Title
About Section Layout Rebalancing — Scale Metrics Left Rail

## Description
This change request restructures the layout of the About section (`About.tsx` and `About.css`) to achieve visual equilibrium, eliminate orphan grid elements, and establish a consistent left-anchored reading flow:

1. **Left-Rail Proof-Point Rail (`about-metrics-col`)**:
   - Re-anchored the 3 primary engineering scale metrics (`1,000–2,000 req/min`, `20% deployment effort reduction`, and `0-Day notice period`) into a dedicated left rail under the eyebrow `PROVEN SCALE & IMPACT`.
   - Each metric is rendered inside an elevated editorial card (`.metric-card`) matching the design system's border, shadow, and hover physics.
   - Solves the previous 2-column orphan issue where `0-Day` sat isolated with an awkward empty gap on row 2.
   - Creates a direct vertical visual rhythm with the Hero section's left-anchored `2+ YEARS PRODUCTION EXPERIENCE` stat block.

2. **Right-Rail Technical Narrative & Capabilities (`about-narrative-col`)**:
   - Organized the right rail into a coherent editorial flow: `ENGINEERING SUMMARY` eyebrow, large display heading, two detailed narrative paragraphs, and a cleanly divided capability stack (`.about-capabilities-list`).
   - Relocated the 3 capability cards (`High-Throughput Decision APIs`, `Multi-Agent AI & RAG Systems`, `Cloud Delivery & DevOps`) beneath the narrative paragraphs, eliminating the previous ~300px dead space on the left column and balancing total column heights.

3. **Responsive Breakpoints**:
   - On desktop (>960px): 2-column balanced grid (`0.85fr 1.15fr`).
   - On tablet (641px–960px): Narrative leads first, followed by a 3-column metric row (`repeat(3, 1fr)`).
   - On mobile (<=640px): Natural vertical stack with fluid typography and optimized card padding.

## Date
2026-11-24

## Affected Files
- [About.tsx](../../src/components/About/About.tsx) - Restructured DOM hierarchy to place metrics rail in left column and capabilities below narrative in right column.
- [About.css](../../src/components/About/About.css) - Updated grid ratios, card styles, and responsive rules.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified responsive layout via Playwright screenshot across desktop and tablet viewports.
