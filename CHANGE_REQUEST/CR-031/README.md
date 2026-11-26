# CR-031: Crisp Vector SVG Yoho Background Watermark

## Title
Crisp Vector SVG Yoho Background Watermark

## Description
Replaced the `167x201` raster cutout PNG/WebP/AVIF chat background assets—which softened when scaled up to `210px`—with a resolution-independent vector SVG (`public/yoho-chat-bg.svg`) of the Yoho Coding Ghost mascot:

1. **Vector Mascot Artwork (`public/yoho-chat-bg.svg`)**:
   - Authored a clean, self-contained `<svg>` (`viewBox="0 0 240 280"`) depicting the Yoho ghost, arched headphone band, glowing `</>` earcup, `</>` laptop, yellow excitement sparks, facial expressions, and floor shadow with zero embedded scripts or raster `<image>` fallbacks.

2. **CSS Watermark & Asset Cleanup (`src/components/AIChat/AIChat.css` & `public/`)**:
   - Updated `.chat-messages-stage::before` `background-image` to `url('/yoho-chat-bg.svg')`.
   - Removed the superseded raster `public/yoho-chat-bg.{avif,webp,png}` and `public/yoho-chat-bg-2x.{avif,webp,png}` files.

3. **Unit Tests (`tests/aichat-launcher.test.mjs`)**:
   - Updated assertions to check `background-image: url('/yoho-chat-bg.svg')` and validate that `public/yoho-chat-bg.svg` is pure vector SVG with no `<script>`, `<image>`, or `foreignObject` elements.

## Date
2026-11-26

## File Location
- `public/yoho-chat-bg.svg` — Resolution-independent vector Yoho Coding Ghost SVG.
- [AIChat.css](../../src/components/AIChat/AIChat.css) — Switched `.chat-messages-stage::before` to `url('/yoho-chat-bg.svg')`.
- [aichat-launcher.test.mjs](../../tests/aichat-launcher.test.mjs) — Updated SVG watermark assertions.
- [CR-031 README.md](./README.md) — Change request documentation.

## Verification
- Verified all 5 unit tests pass (`node --test tests/aichat-launcher.test.mjs`).
- Verified zero linter warnings or errors (`npm run lint`).
- Verified TypeScript compilation and production Vite build (`npm run build`).
- Verified crisp SVG rendering in Playwright at `1280x800` with zero console errors or warnings.
