# CR-028: Unified Button-Matched Header Colors & Reduced Inner Component Radii

## Title
Unified Button-Matched Header Colors & Reduced Inner Component Radii

## Description
Extended the `12px` launcher button visual language to the chat window header, window frame, and all inner chat components so the launcher morphs seamlessly into a consistent UI surface:

1. **Header & Frame Color Harmony (`src/components/AIChat/AIChat.css`)**:
   - Defined shared `--chat-accent-border: 2px solid var(--color-orange)` on `.ai-chat-root` and applied it across `.ai-chat-launcher-btn`, `.ai-chat-window`, and `.chat-header` (`border-bottom`), matching the button's dark ink (`#0F2524`) + orange accent (`#D7720C`) palette.
   - Updated `.agent-avatar-wrap` in `.chat-header` from a light-blue ring to `1.5px solid var(--color-orange)` for visual consistency.
   - Extended `@media (forced-colors: active)` border rules to `.ai-chat-window` and `.chat-header`.

2. **Reduced Inner Component Corner Radii (`AIChat.css`, `OtpWidget.css`, `ScheduleFormWidget.css`)**:
   - Defined `--chat-inner-radius: 10px` and `--chat-control-radius: 8px` on `.ai-chat-root`.
   - Reduced `.yoho-mainframe-aspect` (`24px` &rarr; `var(--chat-inner-radius)` with `corner-shape: squircle`), `.msg-bubble` (`14px` &rarr; `var(--chat-inner-radius)`), `.chat-input-box` (`16px` &rarr; `var(--chat-inner-radius)`), `.chat-send-btn` (`50%` &rarr; `var(--chat-control-radius)`), `.quick-prompt-btn` (`var(--chat-control-radius)`), and `.chat-badge` (`999px` &rarr; `6px`).
   - Reduced `.otp-widget-card` and `.schedule-form-card` (`14px` &rarr; `var(--chat-inner-radius, 10px)`), widget icon/field inputs (`var(--chat-control-radius, 8px)`), and submitted status badges (`999px` &rarr; `6px`).

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Added assertions verifying the shared accent border and inner radius tokens across `AIChat.css`, `OtpWidget.css`, and `ScheduleFormWidget.css`.

## Date
2026-11-26

## File Location
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Shared accent border, inner radius tokens, header & inner component updates.
- [OtpWidget.css](../../src/components/AIChat/OtpWidget.css) — Tightened OTP card, input, and badge corner radii.
- [ScheduleFormWidget.css](../../src/components/AIChat/ScheduleFormWidget.css) — Tightened schedule card, input, and badge corner radii.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated unit tests covering header accent borders and inner component radii.
- [CR-028 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified open chat window header, orange border harmony, and reduced inner component corners visually in Playwright.
