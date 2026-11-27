# CR-033: Increase Yoho Chat Background Watermark Visibility & Clarity

## Title
Increase Yoho Chat Background Watermark Visibility & Clarity

## Description
Boosted the visibility and crispness of the Yoho Coding Ghost background watermark inside `.chat-messages-stage`:

1. **Higher Opacity & Unblurred Clarity (`src/components/AIChat/AIChat.css`)**:
   - Increased `.chat-messages-stage::before` opacity from `0.35` to `0.6` and enlarged `background-size` to `min(230px, 62%) auto`.
   - Removed `backdrop-filter: blur(4px)` from `.bubble-agent` and `.quick-prompt-btn` so the mascot artwork behind translucent cards (`0.8` and `0.7` white opacity) stays razor-sharp instead of being blurred.
   - Added subtle `rgba(247, 246, 240, 0.82)` chip backings and `var(--color-ink)` text color on `.msg-timestamp` and `.quick-prompts-label` to maintain strong WCAG AA+ legibility over the brighter watermark.

2. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Updated the watermark visibility assertion to check `opacity: 0.6;`.

## Date
2026-11-26

## File Location
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Boosted watermark opacity (`0.6`) and size, removed card blur, and added high-contrast label backing.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated watermark opacity test assertion.
- [CR-033 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified vivid, crisp Yoho background visibility in Playwright with 0 console errors/warnings.
