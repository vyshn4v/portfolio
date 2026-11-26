# CR-034: Prevent Pre-Text Empty Chat Bubble, Duplicate Bot Icon, and Delayed Window Content

## Title
Eliminate pre-text empty chat bubble, duplicate bot avatar row during SSE fallback, and empty-box reveal delay on Yoho chat open

## Description
Fixes three visual synchronization issues observed in the Yoho AI chat widget:
1. Removed the duplicate `{isLoading && !messages.some((m) => m.isStreaming)}` fallback typing row and unused `.typing-bubble` / `.typing-dot` CSS so an SSE stream ending without content before calling `POST /api/chat` keeps the single placeholder bot avatar and status indicator instead of rendering a second Yoho avatar icon and empty dot bubble box.
2. Introduced shared `hasBubblePayload` and `sanitizeRestoredMessages` helpers so `.msg-bubble` and `.msg-timestamp` render only when non-whitespace text or a `uiAction` is present, whitespace-only SSE tokens do not clear pipeline status prematurely, empty `done` events preserve `isStreaming: true` for fallback resolution, and restored `sessionStorage` state strips stale streaming flags or empty placeholders.
3. Removed the `0.08s` reveal delay on `.ai-chat-window-content` so chat header and welcome content appear immediately as the dialog expands rather than briefly showing an empty box first.

## Date
2026-11-26

## File Location
- `src/components/AIChat/AIChat.tsx`
- `src/components/AIChat/AIChat.css`
- `tests/aichat-launcher.test.mjs`
