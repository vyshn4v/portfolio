# Change Request: CR-003

## Metadata
- **Title**: Add Google Modern Web Guidance Skill to Repository
- **Date**: 2026-11-24
- **Status**: Implemented
- **File Location**: 
  - `.agents/skills/modern-web-guidance/SKILL.md`
  - `.agents/skills/modern-web-guidance/guides/`

---

## Description
Added the Google Modern Web Guidance skill directly to the repository under `.agents/skills/modern-web-guidance/`.

### Motivation
The system had Google's `modern-web-guidance` plugin installed globally (`~/.gemini/config/plugins/modern-web-guidance`), but it was not committed as a local workspace skill. Adding it locally ensures that any AI agent working within this workspace has immediate access to modern web standards, UI/UX best practices, and frontend guidance without relying solely on global configuration.

### Details of Changes
1. **Skill Definition (`.agents/skills/modern-web-guidance/SKILL.md`)**:
   - Contains the core instruction set conforming to the Antigravity and Agent Skills standard.
   - Guides workflow for searching, retrieving, verifying, and disclosing modern web guidelines (CSS, HTML, Accessibility, Web APIs, Visual Design).

2. **Guidance Guides (`.agents/skills/modern-web-guidance/guides/`)**:
   - Includes full reference guides covering accessibility, visual design (typography, colors, scrollbars, dark mode), UI components, forms, performance, privacy, and modern CSS/JS APIs.
