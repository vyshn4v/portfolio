# CR-029: Transparent Yoho Mascot Background Watermark in Chat

## Title
Transparent Yoho Mascot Background Watermark in Chat Window

## Description
Removed the dark-boxed `.yoho-mainframe-banner` from the scrollable message flow and converted the Yoho mascot into a stationary, transparent-background watermark behind the chat messages:

1. **Transparent Cutout Assets (`public/yoho-chat-bg.*`)**:
   - Processed `public/Cute Coding Ghost with Glowing Headphones.png` using an edge-connected flood fill and boundary alpha feathering in `sharp`, removing the `#0f1225` background while preserving all interior dark details (eyes, laptop, headphone rings).
   - Exported `1x` (`120w`) and `2x` (`167w`) variants in AVIF, WebP, and PNG (`public/yoho-chat-bg.{avif,webp,png}` and `public/yoho-chat-bg-2x.{avif,webp,png}`).

2. **Non-Scrolling Background Stage (`src/components/AIChat/AIChat.tsx` & `AIChat.css`)**:
   - Replaced `.yoho-mainframe-banner` and `YOHO_MAINFRAME_SRC` with a `.chat-messages-stage` wrapper around `.chat-messages-container`.
   - Placed the centered mascot watermark on `.chat-messages-stage::before` (`pointer-events: none`, `opacity: 0.16`, `background-size: min(190px, 52%) auto`) using a standard `url('/yoho-chat-bg.png')` fallback followed by `image-set()` across AVIF, WebP, and PNG at `1x`/`2x`.
   - Added a `@media (forced-colors: active)` safeguard to hide `.chat-messages-stage::before`, and tuned `.bubble-agent`, `.msg-timestamp`, and `.quick-prompts-label` for legibility over the watermark.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Verified removal of `.yoho-mainframe-banner` and presence of `.chat-messages-stage::before` with `url('/yoho-chat-bg.png')` fallback and `image-set()`.

## Date
2026-11-26

## File Location
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Replaced `.yoho-mainframe-banner` with `.chat-messages-stage` wrapper.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Added `.chat-messages-stage` / `::before` `image-set()` background watermark and forced-colors safeguard.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated tests verifying chat background watermark and image fallback.
- `public/yoho-chat-bg.{avif,webp,png}` & `public/yoho-chat-bg-2x.{avif,webp,png}` — Transparent cutout assets.
- [CR-029 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified the centered transparent Yoho watermark renders cleanly behind chat messages without scrolling off or obscuring text in Playwright.
