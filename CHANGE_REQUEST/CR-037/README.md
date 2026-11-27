# CR-037: Remove Yoho Header Profile Card

## Title
Remove unwanted Yoho header profile card component, styles, and header integration

## Description
Reverts the header hover profile card introduced in `CR-035` and `CR-036` per user decision so the chat header stays minimal:
1. Deleted `src/components/AIChat/YohoProfileCard.tsx` and `src/components/AIChat/YohoProfileCard.css`.
2. Restored the plain `.agent-avatar-wrap` avatar container and direct `Escape` key handler inside `src/components/AIChat/AIChat.tsx`.
3. Removed obsolete profile card tests and added a negative regression assertion in `tests/aichat-launcher.test.mjs`.

## Date
2026-11-26

## File Location
- `src/components/AIChat/AIChat.tsx`
- `src/components/AIChat/YohoProfileCard.tsx` (deleted)
- `src/components/AIChat/YohoProfileCard.css` (deleted)
- `tests/aichat-launcher.test.mjs`
