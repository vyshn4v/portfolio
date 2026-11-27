# CR-035: Interactive Yoho Profile Name Card on Header Avatar Hover & Focus

## Title
Add interactive editorial Yoho profile name card displaying name, work, availability, nature, and capability actions on header avatar hover/focus/tap

## Description
Replaces the static Yoho header avatar badge with a modular interactive profile card component (`YohoAvatarProfileCard`):
1. Converts `.agent-avatar-wrap` into an accessible `<button type="button">` trigger (`aria-expanded`, `aria-controls`) directly paired with the `#yoho-profile-card` name card (`role="tooltip"`, `popover="hint"` with `popover="auto"` and non-popover CSS fallbacks) so hovering, focusing, or tapping reveals Yoho's identity without clipping inside `.ai-chat-window { overflow: hidden }`.
2. Presents Yoho's **Name & Online Status**, **Work**, **Availability**, **Nature** (`Friendly, concise & engineering-focused`), and **Actions** (`Knowledge`, `Scheduling`, `Architecture`, `Consultations`) in the site's ink/cream/orange editorial theme.
3. Implements WCAG 1.4.13 Hoverable/Dismissible/Persistent behavior (grace delay between trigger and card, capture-phase `Escape` dismissal before closing the chat window, outside click/drag dismiss), progressive `@supports (position-area: block-end)` CSS Anchor Positioning with bounding-rect fallback placement, `@starting-style` + `prefers-reduced-motion` compositor transitions, and `forced-colors` support.

## Date
2026-11-26

## File Location
- `src/components/AIChat/YohoProfileCard.tsx`
- `src/components/AIChat/YohoProfileCard.css`
- `src/components/AIChat/AIChat.tsx`
- `tests/aichat-launcher.test.mjs`
