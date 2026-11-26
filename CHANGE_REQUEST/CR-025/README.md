# CR-025: Unified Rounded-Corner Chatbot Launcher Button

## Title
Unified Rounded-Corner Chatbot Launcher Button ("Meet Yoho" + Icon)

## Description
Consolidated the separate `"Meet Yoho"` hint pill and launcher icon trigger into a single unified button with rounded corners (`border-radius: 12px`, enhanced with `corner-shape: squircle`), improving visual cohesion, click area, and WCAG 2.5.3 Label-in-Name compliance:

1. **Single Interactive Trigger (`src/components/AIChat/AIChat.tsx`)**:
   - Removed the detached `.ai-chat-launcher-hint` badge and moved `<span className="ai-chat-launcher-label">Meet Yoho</span>` directly inside `<motion.button className="ai-chat-launcher-btn">` alongside `.launcher-avatar-box`.
   - Updated `aria-label` to `"Meet Yoho — Open AI Chat"` so the accessible name begins with the exact visible text `"Meet Yoho"` (WCAG 2.5.3).
   - Marked decorative avatar/image/dot elements with `aria-hidden="true"` and `alt=""`.

2. **Rounded-Corner Button & Responsive Layout (`src/components/AIChat/AIChat.css`)**:
   - Styled `.ai-chat-launcher-btn` as an inline-flex horizontal button with `--launcher-radius: 12px`, `corner-shape: squircle` progressive enhancement, `min-inline-size: 48px`, `min-block-size: 48px`, `background: var(--color-ink)`, `color: var(--color-bg)`, and `border: 2px solid var(--color-orange)`.
   - Framed the Yoho icon inside `.launcher-avatar-box` (`36x36` desktop, `32x32` on mobile `<= 640px`) with the `.launcher-status-dot` anchored at its top-right corner.
   - Kept both `"Meet Yoho"` and the icon visible on mobile viewports (`<= 640px`) with compact padding (`5px 7px 5px 12px`) and `min-block-size: 46px`.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Updated tests to verify the unified button contains both `"Meet Yoho"` and the Yoho icon, uses rounded corners (`--launcher-radius: 12px` + `corner-shape: squircle`), and satisfies accessible naming and target size rules.

## Date
2026-11-26

## File Location
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Unified `"Meet Yoho"` label and icon inside `.ai-chat-launcher-btn`.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Rounded-corner unified button styling and mobile responsiveness.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated unit test suite.
- [CR-025 README.md](./README.md) — Change request documentation.

## Verification
- Verified unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified desktop and mobile unified button rendering, rounded corners (`12px`), and interactive chat opening via Playwright.
