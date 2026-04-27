# rails-docs design system (extracted, docs-local)

This folder is the **contract for how rails-docs mirrors rails-web**. It is not a shared npm package and **does not require any changes under `rails-web/`**.

## Rules

1. **rails-web is the visual source of truth** for marketing parity (emerald accent, zinc neutrals, square chrome, Inter / Space Grotesk / Noto Sans Mono, Material Symbols Sharp where used).
2. **Do not edit `rails-web`** to satisfy docs work. If docs and marketing diverge, **adjust `rails-docs/theme.css` (and related docs-only assets)** or update this map after rails-web ships its own change.
3. **Implementation lives in** `rails-docs/theme.css`, `rails-docs/astro.config.ts` (fonts/head), and small Astro overrides under `rails-docs/src/components/`.

## Contents

| File | Purpose |
|------|--------|
| [rails-web-parity-map.md](./rails-web-parity-map.md) | Token and pattern mapping: `--rails-*` / Stainless overrides → rails-web files and Tailwind / hex references |

When adding new docs-only chrome, extend `theme.css` with **semantic `--rails-*` tokens** first, then document the mapping in `rails-web-parity-map.md`.
