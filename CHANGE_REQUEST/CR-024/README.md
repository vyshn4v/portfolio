# CR-024: Change Chatbot Launcher Button to Square

## Title
Change Chatbot Launcher Button to Square

## Description
Updated the floating Yoho AI assistant launcher button from a circular pill (`border-radius: 50%`) to a crisp square silhouette that harmonizes with the portfolio's editorial card and button geometry (`border-radius: 4px`), while strengthening accessibility and CSS maintainability:

1. **Square Launcher Geometry & DRY Radius Token (`src/components/AIChat/AIChat.css`)**:
   - Replaced `border-radius: 50%` on `.ai-chat-launcher-btn`, `.launcher-yoho-wrap`, and `.yoho-chat-btn-img` with a shared `--launcher-radius: 4px` custom property.
   - Derived the inner container radius concentrically (`border-radius: max(0px, calc(var(--launcher-radius, 4px) - 2px))`) inside the `2px` orange border and inherited it on `.yoho-chat-btn-img` (`border-radius: inherit`) to avoid magic-number duplication.
   - Enforced `min-inline-size: 54px` and `min-block-size: 54px` alongside `width: 54px; height: 54px;` to exceed WCAG 2.5.5 (`44x44`) and WCAG 2.5.8 (`24x24`) target size requirements.
   - Repositioned `.launcher-status-dot` to `top: -4px; right: -4px;` so the online indicator sits cleanly on the top-right corner of the square button.
   - Added high-contrast `.ai-chat-launcher-btn:focus-visible` (`outline: 2px solid var(--color-ink); outline-offset: 3px;`, 14.8:1 against `#F7F6F0` and 4.81:1 against `#D7720C`) and `@media (forced-colors: active)` border preservation (`border-color: ButtonText`).

2. **Accessible Button Semantics (`src/components/AIChat/AIChat.tsx`)**:
   - Added explicit `type="button"` on the launcher `<motion.button>` element.
   - Marked the decorative inner icon image (`alt=""`, `aria-hidden="true"`) and status dot (`aria-hidden="true"`) so assistive technologies announce only the button's `aria-label="Open Yoho AI Chat"`.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Added Node built-in test assertions verifying square dimensions, non-circular radius inheritance, `:focus-visible` and `forced-colors` rules, and accessible button semantics.

## Date
2026-11-26

## File Location
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Square launcher styling, DRY `--launcher-radius` token, status dot corner alignment, `:focus-visible` and `forced-colors` rules.
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Explicit `type="button"` and decorative inner element accessibility attributes.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Unit tests verifying square geometry and accessibility requirements.
- [CR-024 README.md](./README.md) — Change request documentation.

## Verification
- Verified unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified rendered square chatbot launcher dimensions (`54x54`, `borderRadius: 4px`), corner dot alignment, and interactive chat opening across desktop and mobile viewports via Playwright.
