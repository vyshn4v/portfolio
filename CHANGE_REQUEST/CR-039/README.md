# CR-039: Allow Zoom Gestures and Check Ancestor Scroll Containers in Chat Scroll Lock

## Title
Preserve `ctrl+wheel` zoom gestures and inspect scrollable chat ancestors before blocking wheel/touch scroll

## Description
Addressed both PR review comments on background scroll containment inside `src/components/AIChat/AIChat.tsx`:
1. Added an early `if (e.ctrlKey) return;` guard in `handleWheel` (and multi-touch `e.touches.length > 1` guard in `handleTouchMove`) so browser zoom / trackpad pinch-to-zoom gestures are never prevented.
2. Extracted shared `hasScrollableChatAncestor` and `canScrollInDirection` helpers (paired with `touchstart` / `touchmove` vertical delta tracking) so both `handleWheel` and `handleTouchMove` inspect matching chat scroll ancestors (`textarea` -> `.chat-messages-container`) before calling `preventDefault()`, preventing scrolling from locking when an inner `.schedule-field-textarea` is non-scrollable or at its boundary while keeping background page scroll blocked.
3. Added regression assertions in `tests/aichat-launcher.test.mjs`.

## Date
2026-11-27

## File Location
- `src/components/AIChat/AIChat.tsx`
- `tests/aichat-launcher.test.mjs`
