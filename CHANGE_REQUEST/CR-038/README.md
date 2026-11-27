# CR-038: Use Single SSE Endpoint Without Secondary REST Fallback Call

## Title
Send only the single SSE streaming request (`POST /api/chat/stream`) from Yoho AI chat

## Description
Removed the secondary `POST /api/chat` REST fallback call inside `handleSend` in `src/components/AIChat/AIChat.tsx` so every user prompt makes strictly one HTTP request to `.../api/chat/stream`:
1. Removed the inner `try/catch` and `fallbackResponse = await fetch(API_ENDPOINT, ...)` block.
2. Enforced explicit checks on `!streamResponse.ok` and `!streamResponse.body` so streaming errors enter the standard error state immediately.
3. Extracted DRY `updateBotMessage` and `processSseLine` helpers (supporting `status`, `token`, `ui_action`, `error`, and `done`), flushed trailing decoded SSE lines on EOF, and ensured streams finalize cleanly (`isStreaming: false`, `'No response received.'` when no tokens or `uiAction` arrive).
4. Added unit test assertions in `tests/aichat-launcher.test.mjs` verifying a single `fetch(streamUrl, ...)` call.

## Date
2026-11-26

## File Location
- `src/components/AIChat/AIChat.tsx`
- `tests/aichat-launcher.test.mjs`
