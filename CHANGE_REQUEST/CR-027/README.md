# CR-027: Match Chat Window Corner Radius with Launcher Button

## Title
Match Chat Window Corner Radius with Launcher Button (`12px`)

## Description
Reduced the Yoho AI chat window corner radius from `20px` (desktop) and `16px` (mobile) to `12px` so it matches the unified **Meet Yoho** launcher button across every viewport and eliminates corner-radius jumps during the `layoutId` expansion morph:

1. **Single Shared CSS Radius Token (`src/components/AIChat/AIChat.css`)**:
   - Defined `--chat-corner-radius: 12px;` once on `.ai-chat-root` (DRY single source of truth).
   - Applied `border-radius: var(--chat-corner-radius);` and `corner-shape: squircle;` to both `.ai-chat-launcher-btn` and `.ai-chat-window`, removing the separate `20px` and mobile `16px` overrides.

2. **Shared Morph Constant (`src/components/AIChat/AIChat.tsx`)**:
   - Added `const CHAT_CORNER_RADIUS = 12;` and passed `borderRadius: CHAT_CORNER_RADIUS` on both `.ai-chat-launcher-btn` and `.ai-chat-window` (desktop and mobile) so Framer Motion interpolates consistently.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Updated assertions to verify `--chat-corner-radius: 12px` is shared by both `.ai-chat-launcher-btn` and `.ai-chat-window`, and `CHAT_CORNER_RADIUS = 12` is defined in `AIChat.tsx`.

## Date
2026-11-26

## File Location
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Unified `--chat-corner-radius: 12px` and `corner-shape: squircle` across button and window.
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Shared `CHAT_CORNER_RADIUS = 12` constant applied to both morph states.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated unit test assertions.
- [CR-027 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 4 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified rendered button and open chat window both report `borderRadius: 12px` in Playwright.
