# CR-030: Prevent Background Scroll When Chat Open & Boost Yoho Watermark Visibility

## Title
Prevent Background Scroll When Chat Open & Boost Yoho Watermark Visibility

## Description
Resolved background page scrolling while the Yoho AI chat window is open without mutating root `html`/`body` overflow, and increased the visual prominence of the Yoho background watermark inside the chat:

1. **Background Scroll Containment (`src/components/AIChat/AIChat.tsx` & `AIChat.css`)**:
   - Added `.ai-chat-backdrop` (`position: fixed; inset: 0; overflow: hidden; overscroll-behavior: contain; touch-action: none;`) behind `.ai-chat-window` when open, keeping root scrollbars intact with zero layout shift.
   - Added `overscroll-behavior: contain;` on `.ai-chat-window` and `.chat-messages-container`.
   - Added a scoped `wheel` and `touchmove` boundary listener when `isOpen` is true so scrolling outside the chat or at container boundaries never chains to the underlying portfolio page across Chromium, Firefox, and Safari.
   - Tightened `.chat-messages-container` initial padding/gap (`14px 16px`, `gap: 10px`) and `.quick-prompt-btn` padding (`7px 10px`) so the welcome view fits cleanly without an unnecessary scrollbar.

2. **Higher-Visibility Yoho Watermark (`src/components/AIChat/AIChat.css`)**:
   - Raised `.chat-messages-stage::before` opacity from `0.16` to `0.35` and scaled its size to `min(210px, 58%) auto`.
   - Added subtle frosted translucency on `.bubble-agent` (`rgba(255, 255, 255, 0.82)`, `backdrop-filter: blur(4px)`) and `.quick-prompt-btn` (`rgba(255, 255, 255, 0.72)`, `backdrop-filter: blur(4px)`) so the mascot reads clearly behind cards while keeping WCAG AA+ text contrast (`>= 5.26:1` on labels/timestamps and `>= 13.5:1` on card text).

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Added assertions verifying `.ai-chat-backdrop` scroll containment, `.chat-messages-container` `overscroll-behavior: contain`, `.chat-messages-stage::before` `opacity: 0.35`, and absence of `html`/`body` overflow mutation.

## Date
2026-11-26

## File Location
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Rendered `.ai-chat-backdrop` when open and added boundary-safe `wheel`/`touchmove` background scroll guard.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Styled `.ai-chat-backdrop`, added `overscroll-behavior: contain`, boosted `.chat-messages-stage::before` to `opacity: 0.35`, and tuned message/prompt translucency and label contrast.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated unit test assertions.
- [CR-030 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified background scroll lock under wheel gestures and visually inspected stronger Yoho watermark visibility in Playwright.
