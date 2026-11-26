# CR-032: Crisp High-Resolution Transparent Yoho Background Watermark

## Title
Crisp High-Resolution Transparent Yoho Background Watermark

## Description
Replaced the hand-drawn SVG approximation (`public/yoho-chat-bg.svg`) with high-resolution transparent cutout assets derived directly from the original `1254x1254` master artwork (`25cafb6:public/Cute Coding Ghost with Glowing Headphones.png`, trimmed to `654x792`):

1. **High-Resolution Cutout Assets (`public/yoho-chat-bg.*`)**:
   - Performed tight edge-connected BFS flood fill (`colorDist <= 18`) and 1px edge anti-aliasing on the `1254x1254` master so all dark outlines, headphone arch shadows, eyes, and `</>` details remain 100% solid and identical to the original mascot.
   - Downsampled cleanly to `260w` (`1x`) and `520w` (`2x`) in AVIF, WebP, and PNG so every display DPI renders downscaled rather than upscaled (`260px` > `210px` CSS container width).
   - Removed the superseded hand-drawn `public/yoho-chat-bg.svg`.

2. **CSS Background Update (`src/components/AIChat/AIChat.css`)**:
   - Restored the `url('/yoho-chat-bg.png')` fallback followed by `image-set()` across AVIF, WebP, and PNG (`1x`/`2x`) on `.chat-messages-stage::before`.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Updated assertions to verify `url('/yoho-chat-bg.png')` fallback, `image-set()`, and `opacity: 0.35`.

## Date
2026-11-26

## File Location
- `public/yoho-chat-bg.{avif,webp,png}` & `public/yoho-chat-bg-2x.{avif,webp,png}` — High-resolution `260w`/`520w` transparent cutout assets.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — `image-set()` and PNG fallback on `.chat-messages-stage::before`.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated watermark assertions.
- [CR-032 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified crisp high-resolution rendering of the exact Yoho mascot inside the open chat window via Playwright.
