# Change Request: CR-011

## Title
Address Code Review: Repository-Relative Links, GPU-Accelerated Hero Pulse, and Component Data Decoupling

## Date
2026-11-24

## Author
Senior Software Engineer (Antigravity)

## Status
Completed

---

## Description
This Change Request addresses all code review feedback across documentation, CSS animation performance, and architectural data separation:

1. **Repository-Relative Links in Documentation**:
   - Updated [CHANGE_REQUEST/CR-009/README.md](../CR-009/README.md) and [CHANGE_REQUEST/CR-010/README.md](../CR-010/README.md) (and [CHANGE_REQUEST/CR-005/README.md](../CR-005/README.md)) to use repository-relative targets (e.g. `../../src/...`, `./README.md`, `../../public/...`) instead of machine-specific `file:///` URLs, ensuring all links resolve in GitHub or on any developer's machine.

2. **GPU-Accelerated Pulse Ring Animation ([src/components/Hero/Hero.css](../../src/components/Hero/Hero.css))**:
   - Replaced continuous `box-shadow` keyframe mutations on `.hero-availability-pill .pulse-dot` with an isolated `::before` pseudo-element.
   - The animation now targets only `transform` (`scale`) and `opacity` properties, running exclusively on the GPU compositor thread without triggering layout calculations or repaints, while preserving the visual pulse effect.

3. **Decoupled Hero & About Narrative Content into Data Modules**:
   - Moved hardcoded title greeting, quote, stamp caption, stat labels, capability cards copy, and performance metrics out of [src/components/Hero/Hero.tsx](../../src/components/Hero/Hero.tsx) and [src/components/About/About.tsx](../../src/components/About/About.tsx) into [src/data/profile.ts](../../src/data/profile.ts).
   - Components now focus purely on layout, animation, and icon rendering, rendering all copy dynamically from the centralized `profile.hero` and `profile.about` data objects.

4. **Decoupled Yoho Architecture Surface Content into Data Modules**:
   - Moved all Yoho blueprint architecture specifications—including layer titles, badges, node chips, embedding dimensions (1536-dim), and streaming telemetry (< 280ms latency)—into `yoho-ai-agent.architecture` within [src/data/projects.ts](../../src/data/projects.ts).
   - Refactored [src/components/Projects/YohoAgentSurface.tsx](../../src/components/Projects/YohoAgentSurface.tsx) to accept a typed `data?: ArchitectureBlueprint` prop, completely freeing the presentational component from hardcoded project-specific content.

---

## File Locations
- [src/data/profile.ts](../../src/data/profile.ts)
- [src/data/projects.ts](../../src/data/projects.ts)
- [src/components/Hero/Hero.tsx](../../src/components/Hero/Hero.tsx)
- [src/components/Hero/Hero.css](../../src/components/Hero/Hero.css)
- [src/components/About/About.tsx](../../src/components/About/About.tsx)
- [src/components/Projects/YohoAgentSurface.tsx](../../src/components/Projects/YohoAgentSurface.tsx)
- [src/components/Projects/Projects.tsx](../../src/components/Projects/Projects.tsx)
- [CHANGE_REQUEST/CR-009/README.md](../CR-009/README.md)
- [CHANGE_REQUEST/CR-010/README.md](../CR-010/README.md)
- [CHANGE_REQUEST/CR-011/README.md](./README.md)
