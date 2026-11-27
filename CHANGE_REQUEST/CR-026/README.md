# CR-026: Button-to-Window Shared Expansion Animation for Yoho AI Chat

## Title
Button-to-Window Shared Expansion Animation for Yoho AI Chat

## Description
Replaced the disjoint two-step exit-wait-then-open transition (`AnimatePresence mode="wait"`) with a seamless shared-element expansion directly from the **Meet Yoho** button into the chat window—and smooth collapse back into the button on close:

1. **Direct Shared-Layout Morph (`src/components/AIChat/AIChat.tsx`)**:
   - Replaced `AnimatePresence mode="wait"` around the launcher/window toggle with `<LayoutGroup id="yoho-chat-morph">` and a shared `layoutId="yoho-chat-surface"` on both `.ai-chat-launcher-btn` and `.ai-chat-window`.
   - Scoped layout projection with `layoutDependency={isOpen}` so pointer dragging, edge/corner resizing, and maximize/restore never trigger unintended layout animations.
   - Wrapped window internals in `.ai-chat-window-content` with a gentle `opacity` reveal (`delay: 0.08`, `duration: 0.18`) so text and widgets do not appear squashed during expansion.
   - Integrated `useReducedMotion()` to disable spatial morph scaling when `prefers-reduced-motion: reduce` is enabled.
   - Added `Escape` key dismissal when the chat dialog is open and restored focus back to `launcherBtnRef` on close.

2. **Compositor & Layout CSS Updates (`src/components/AIChat/AIChat.css`)**:
   - Removed static `transform: translateZ(0)` on `.ai-chat-launcher-btn` and `.ai-chat-window` so Framer Motion's layout projection owns transforms cleanly without override conflicts.
   - Added `.ai-chat-launcher-inner` and `.ai-chat-window-content` flex wrappers so button and window contents fade cleanly inside the morphing shell.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Added assertions verifying removal of `AnimatePresence mode="wait"`, shared `layoutId` across button and window, `layoutDependency={isOpen}`, `useReducedMotion()`, and `Escape` dismissal.

## Date
2026-11-26

## File Location
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) — Shared `layoutId` morph, `layoutDependency`, `useReducedMotion`, `Escape` dismissal, and focus return.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Morph-compatible transform rules and `.ai-chat-window-content` / `.ai-chat-launcher-inner` wrappers.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated unit tests covering expansion morph and keyboard/motion rules.
- [CR-026 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 4 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified smooth open morph, close collapse, focus return, `Escape` key dismissal, and console cleanliness in Playwright.
