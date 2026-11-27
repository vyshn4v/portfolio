# CR-036: Redesign Yoho Profile Name Card into Expressive Editorial Bento Identity Pass

## Title
Upgrade Yoho header profile card with atmospheric ghost character spotlight, icon-badged Bento trait tiles, and clickable capability actions

## Description
Replaces the plain flat table inside `YohoProfileCard` with a cohesive editorial Bento character card matching vyshnavpc.com:
1. Upgraded the card banner into an atmospheric dark-ink spotlight featuring radial warm-orange/emerald glows, dot-matrix texture, `AGENT // YOHO-01` serial tag, `24/7 Online` badge, friendly intro copy, and the transparent `/yoho-chat-bg.{avif,webp,png}` ghost mascot showcase (`filter: drop-shadow(...)`), removing the duplicate circular avatar.
2. Redesigned **Work**, **Availability**, and **Nature** (`Friendly, witty & straight-to-the-point engineering clarity`) into icon-badged Bento tiles (`Briefcase`, `Zap`, `Smile`, `Sparkles`) styled with `color-mix(in oklab, ...)` surface tints and `>= 4.5:1` accessible text contrast.
3. Turned **Actions** (`Knowledge`, `Scheduling`, `Architecture`, `Tech Stack`) into clickable starter buttons wired to `onSelectAction` (`handleSend` in `AIChat.tsx`), switching card semantics to `role="region"` so keyboard users can tab cleanly into each capability shortcut.

## Date
2026-11-26

## File Location
- `src/components/AIChat/YohoProfileCard.tsx`
- `src/components/AIChat/YohoProfileCard.css`
- `src/components/AIChat/AIChat.tsx`
- `tests/aichat-launcher.test.mjs`
