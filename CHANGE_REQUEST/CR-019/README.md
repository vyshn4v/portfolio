# CR-019: About Section Two-Tier Symmetrical Architecture & Space Elimination

## Title
About Section Two-Tier Symmetrical Architecture & Space Elimination

## Description
This change request completely eliminates the 511px empty space in the About section by establishing a two-tier symmetrical layout:

1. **Tier 1: Editorial Introduction (`about-intro-grid`)**:
   - Structured as a balanced 2-column introduction:
     - **Left Column**: `ENGINEERING SUMMARY` eyebrow and large display heading (`ARCHITECTING RELIABLE BACKEND SYSTEMS.`).
     - **Right Column**: The two storytelling narrative paragraphs detailing enterprise InsurTech presales-to-production delivery and autonomous agentic AI workflows.
   - Separated from Tier 2 by a subtle, elegant horizontal divider.

2. **Tier 2: Evidence & Architecture (`about-pillars-grid`)**:
   - Structured as a 1:1 symmetrical two-pillar grid:
     - **Left Pillar (`about-metrics-col`)**: `PROVEN SCALE & IMPACT` eyebrow with the **3 Metric Cards** (`1,000–2,000 req/min`, `20% deployment effort cut`, `0-Day notice period`).
     - **Right Pillar (`about-capabilities-col`)**: `CORE ARCHITECTURAL FOCUS` eyebrow with the **3 Capability Cards** (`High-Throughput Decision APIs`, `Multi-Agent AI & RAG Systems`, `Cloud Delivery & DevOps`).
   - Shared elevation, card geometry, and `min-height: 104px` across both pillars ensures exact 1:1 vertical alignment and height parity with **0px dead space**.

3. **Responsive Breakpoints**:
   - Desktop (>960px): Two symmetrical tiers (`1fr 1fr`).
   - Mobile/Tablet (≤960px): Fluid vertical stacking with clear hierarchical flow (Heading -> Narrative -> Metrics -> Capabilities).

## Date
2026-11-24

## Affected Files
- [About.tsx](../../src/components/About/About.tsx) - Restructured DOM into Tier 1 (Editorial Intro) and Tier 2 (Symmetrical Pillars).
- [About.css](../../src/components/About/About.css) - Updated layout rules for `.about-intro-grid`, `.about-pillars-grid`, and balanced card heights.

## Verification
- Verified TypeScript compilation and production build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified visual alignment and zero dead space via Playwright DOM evaluation and screenshot.
