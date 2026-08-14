# Design tokens & motion reference

Referenced by every phase in `SKILL.md`. Write these into
`src/styles/variables.css` in Phase 0 and reuse everywhere — no ad hoc hex
values or timing numbers in component code.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F5F4ED` | Page background |
| `--color-ink` | `#0D2322` | Primary text / dark panels |
| `--color-orange` | `#D7720C` | Primary accent |
| `--color-orange-warm` | `#E6A54D` | Secondary accent |
| `--color-beige` | `#C6BEA5` | Rules / soft surfaces |
| `--color-green` | `#738F8A` | Secondary text / accents |
| `--color-rust` | `#AE4818` | Organic shape / emphasis |

## Typography

- Display: Space Grotesk / Satoshi / Geist
- Body: Inter / Geist
- Desktop hero title: `clamp(72px, 10vw, 160px)`, line-height ~0.85,
  letter-spacing -0.06em
- Mobile hero title: `clamp(56px, 14vw, 96px)`
- Surface grain overlay: ~2.5% opacity

## Hero entrance sequence

| Element | Time |
|---|---|
| Preloader | 0–1000ms |
| Navigation | 1200ms |
| Eyebrow | 1300ms |
| Title | 1450ms |
| Support line | 1600ms |
| Splash | 1800ms |
| Scroll indicator | 2000ms |

## Animation system

| Element | Motion | Timing / rule |
|---|---|---|
| Hero title | opacity 0→1, y 80→0 | 900ms easeOut + 100ms line stagger |
| Splash reveal | scale 0.7→1, opacity 0→1, rotate -8°→0 | 1200ms easeOut |
| Section headings | clip-path `inset(100% 0 0 0)` → `inset(0)` | 700ms, 80ms stagger |
| Project entrances | x/y offset → 0, opacity 0→1 | 700–900ms, alternating direction per project |
| Marquee | continuous `translateX` | 35–50s linear, duplicated content |
| Micro hover (arrows etc.) | `translateX` / rotate | 100–300ms `cubic-bezier(0.22,1,0.36,1)` |
| Blob idle | small translate/rotate/scale drift | 6–10s infinite, low amplitude |

Only animate `transform`, `opacity`, and `clip-path`. Under
`prefers-reduced-motion`, collapse all of the above to near-zero amplitude
and near-instant timing while keeping every element visible.
