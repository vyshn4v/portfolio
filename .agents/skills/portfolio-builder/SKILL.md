---
name: portfolio-builder
description: Builds Vyshnav P C's editorial React/TypeScript portfolio (vyshnavpc.com) from the resume-populated design specification — organic color-splash hero, tech marquee, experience, Domain Scanner and QStack project storytelling, technical expertise, certifications, and contact. Works phase-by-phase, one section at a time, stopping for review after each. Use when starting, resuming, or extending the portfolio site build.
---

# Portfolio Builder

Builds vyshnavpc.com section by section from the design specification below.

## ⚠️ EXECUTION RULE — READ FIRST

**Build exactly ONE phase from the Build Order per turn. Then stop completely.**

This holds even if the user's request was "build the whole portfolio" or
"do all of it" — that request means "work through the full Build Order
over multiple turns," not "generate everything in one pass." Do not chain
phases together, do not keep going because you have context budget left,
and do not skip ahead to a later phase.

At the end of a phase:
1. State which phase you just built and what files changed.
2. List anything you left as a `TODO` (missing links, unclear content).
3. Ask the user to review before you continue — then stop your turn.

Do not resume with the next phase until the user's next message
confirms it. A short "looks good" or "continue" counts as confirmation
for the *next* phase only — it does not grant permission to run several
phases in a row.

## Source of truth

- **Content**: `resources/content.ts` — the full resume content already
  extracted into typed data. Do not invent, embellish, or paraphrase resume
  facts (titles, dates, metrics, stack names). If a value is missing, leave
  a `TODO` comment instead of guessing.
- **Design tokens & motion timing**: `resources/design-tokens.md`.
- **This file**: page structure, build order, and non-negotiable rules.

## Stack

React + TypeScript + Vite + Framer Motion + Lucide React.
Use GSAP only if one specific interaction genuinely can't be done in Framer
Motion. No heavy WebGL, no video backgrounds, no custom cursor on mobile/tablet.

## Target file structure

```
src/
  components/
    Navigation/  Preloader/  Hero/  Blob/  Marquee/
    About/  Experience/  Projects/  ProjectCard/
    Skills/  Philosophy/  Certifications/  Contact/  Footer/  Reveal/
  data/
    profile.ts  experience.ts  projects.ts  skills.ts  certifications.ts
  hooks/
    useMousePosition.ts  useScrollProgress.ts  useMediaQuery.ts
  styles/
    globals.css  variables.css  typography.css
  App.tsx
  main.tsx
```

Content lives only in `data/*.ts`, never hardcoded inside presentational
components — that's what makes later resume updates a data change, not a
layout change.

## Build order (one phase per turn)

### Phase 0 — Scaffold, tokens, preloader & navigation
- Init Vite + React + TypeScript project; install Framer Motion, Lucide React.
- Create the folder structure above (empty component folders are fine).
- Split `resources/content.ts` into the five files it's already organized
  into: `data/profile.ts`, `data/experience.ts`, `data/projects.ts`,
  `data/skills.ts`, `data/certifications.ts` — copy verbatim, no edits.
- Write `styles/variables.css` from `resources/design-tokens.md` (colors,
  type scale, grain).
- Build `Preloader/` (0–1000ms) and fixed minimal `Navigation/` (enters at
  1200ms per the hero timing sequence).
- **Stop.** Confirm the scaffold, tokens, and nav look right before Hero.

### Phase 1 — Hero
- Left-aligned oversized type, organic splash on the right at ~40–50% of
  hero width, warm off-white background, scroll hint at the bottom.
- Populate from `profile.ts`: eyebrow, `heroHeading`, `heroSupport`.
- `Blob/`: layered SVG/CSS organic shapes in orange, rust, muted green,
  beige — irregular paths, not a circle. Continuous 6–10s low-amplitude
  drift; desktop-only cursor parallax of 10–20px.
- Follow the hero timing sequence and hero/splash motion specs in
  `resources/design-tokens.md` exactly (entrance times and easing).
- **Stop.** Confirm the hero before the marquee.

### Phase 2 — Tech marquee
- Continuous horizontal marquee, duplicated content, 35–50s linear loop.
- Content: Node.js, NestJS, TypeScript, PostgreSQL, Redis, Docker,
  Kubernetes, AWS, React.
- **Stop.**

### Phase 3 — About
- Compressed professional narrative from `profile.summary`, plus one scale
  metric pulled from the experience bullets (the 1,000–2,000 req/min
  decision engine). Section heading uses the clip-path reveal from the
  animation table.
- **Stop.**

### Phase 4 — Experience
- Render `experience.ts` as an editorial row layout (not a card grid):
  role, company, period, all bullets, and the two awards.
- **Stop.**

### Phase 5 — Selected work: Domain Scanner
- Pull the `domain-scanner` entry from `projects.ts`.
- Visual treatment: an illustrative mini product surface — risk score,
  scan status, domain input, checks, infra badges — not a literal
  screenshot. Alternate-direction entrance per the animation table.
- **Stop.**

### Phase 6 — Selected work: QStack
- Pull the `qstack` entry from `projects.ts`.
- Visual treatment: a restrained technical diagram — questions, tags,
  search, `/ask`, vector retrieval, notifications, reputation — as a
  system/architecture map, not a screenshot. Mark it in-progress (no live
  URL) per its `status` field.
- **Stop.**

### Phase 7 — Technical expertise
- Render `skills.ts` grouped by category (Backend, Databases, Messaging &
  Integrations, DevOps & Cloud, Frontend, Tools). No percentage bars or
  skill-level meters — plain grouped lists only.
- **Stop.**

### Phase 8 — Engineering philosophy
- Write 3–4 short principles, but only as inferences from what's already
  documented in `experience.ts` / `projects.ts` — e.g. production ownership
  end-to-end, designing for real request volume, async-first workflows,
  mentoring/reviewing for correctness. Do not introduce generic platitudes
  unconnected to the actual work on record.
- **Stop.**

### Phase 9 — Certifications
- Render `certifications.ts`. Keep credential links where the `url` field
  is filled; leave the `TODO` ones as plain text, not fake links.
- Also surface education (`profile.education`) and languages
  (`profile.languages`) here or in a compact adjacent block.
- **Stop.**

### Phase 10 — Contact / closing CTA
- Large closing line: "LET'S BUILD SOMETHING USEFUL."
- Dark panel: `--color-ink` (#0D2322) background, cream type, one
  restrained orange organic shape.
- Email and phone from `profile.email` / `profile.phone` exactly as given.
  LinkedIn/GitHub use `profile.links` — while those are still `TODO`
  placeholders, render them as visibly inactive/pending, never as a fake
  working URL.
- **Stop.**

### Phase 11 — Footer
- Minimal identity, current year (computed, not hardcoded), stack note.
- **Stop.**

### Phase 12 — Responsive pass
- Tablet (768–1199px): scale down heading/splash sizes, keep the asymmetry.
- Mobile (<768px): recompose, don't just shrink — vertical project rows,
  compact nav, no custom cursor, no mouse parallax, keep scroll/text
  reveals.
- **Stop.**

### Phase 13 — Accessibility, performance, reduced motion
- Semantic headings, keyboard nav, visible focus states, alt text, buttons
  instead of clickable divs.
- `prefers-reduced-motion`: collapse animation intensity to near-zero while
  keeping everything visible and interactive.
- Animate only `transform` / `opacity` / `clip-path`. Lazy-load imagery,
  prefer SVG/AVIF/WebP. Confirm no WebGL/video crept in anywhere.
- **Stop.**

### Phase 14 — Final QA
Walk the checklist below top to bottom against the live build and report
any unchecked items — don't silently fix and move on, list them first.

## Non-negotiable rules (apply in every phase)

- No portrait or photo of a person, anywhere. The organic splash is the
  only visual anchor for identity.
- No resume fact is invented or softened — dates, the request-volume
  figure, award names, stack names all come from `content.ts` verbatim.
- No content is hardcoded into a component — it comes from `data/*.ts`.
- No fake contact links — unresolved links stay visibly `TODO`, never a
  placeholder that looks like a working URL.
- Editorial/asymmetric layout throughout — avoid defaulting to a generic
  card grid unless a phase explicitly calls for a card-like surface
  (Domain Scanner's mini product surface is the one deliberate exception).

## Definition of done

- [ ] Exact resume content populated from `content.ts`, nothing invented
- [ ] No portrait/photo anywhere; the organic splash carries the hero
- [ ] Hero, experience, and project copy read as editorial, not card-grid
- [ ] Domain Scanner and QStack each have bespoke visual storytelling
- [ ] All professional/credential links preserved where supplied, `TODO`
      links visibly marked as pending rather than faked
- [ ] Framer Motion reveals are staggered per the animation table, not ad hoc
- [ ] Custom cursor is desktop-only; reduced-motion mode implemented
- [ ] Mobile is a separate composition, not a scaled-down desktop
- [ ] Fast load, no heavy animation dependencies
- [ ] SEO metadata present; keyboard/focus behavior accessible

## How to drive this skill in Antigravity

Place this folder at `.agents/skills/portfolio-builder/` in the project
root (or `.antigravity/skills/portfolio-builder/` — Antigravity checks
both). The EXECUTION RULE above makes the agent stop after every phase
on its own, so a single kickoff message is enough:

> Use the portfolio-builder skill to build the portfolio.

It builds Phase 0, reports what it did, and stops. Reply with anything
confirming ("continue", "looks good", "next") to get Phase 1, and so on.
You can also jump straight to a specific phase by name if you're resuming
partway through — e.g. "Use the portfolio-builder skill, build Phase 5."
This keeps each phase small enough to actually check before the next one
builds on top of it — the whole point of going one by one instead of in
a single giant generation.
