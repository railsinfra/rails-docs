# rails-web ↔ rails-docs parity map

**Canonical product UI:** `rails-web` (`theme.css`, `lib/marketingTheme.ts`, marketing components).  
**Docs mirror:** `rails-docs/theme.css` + Starlight/Stainless layout.  
**Constraint:** Keep `rails-web` unchanged; evolve docs via this map and `theme.css`.

Theme mode: rails-web uses a `.dark` class on the root in places; docs use Starlight / Stainless `document.documentElement.dataset.theme` (`light` | `dark`). Tokens in docs use CSS `light-dark()` where one declaration must cover both.

---

## Typography

| rails-docs | rails-web reference | Notes |
|------------|---------------------|--------|
| Body: `Inter` via `--stl-typography-font` / `--sl-font` | `rails-web/theme.css` (`body { font-family: 'Inter' }`), `rails-web/lib/marketingTheme.ts` (`theme.typography`) | Same stack intent as marketing. |
| Headings: `Space Grotesk` | `rails-web/theme.css` (`h1…`, `.font-heading`) | Same as marketing. |
| Mono / labels: `Noto Sans Mono` | `rails-web/theme.css` (`.font-mono`, `.label-micro`), `marketingTheme.ts` (`label-micro`) | `.label-micro` in docs maps to `--rails-text-muted` + mono stack in `theme.css`. |
| Material Symbols Sharp | `rails-web/theme.css` (`.material-symbols-sharp`) | Docs extend usage for sidebar, search, breadcrumbs per `theme.css` comments. |

---

## Layout geometry

| rails-docs | rails-web reference | Notes |
|------------|---------------------|--------|
| `--sl-button-border-radius: 0`, Stainless radius vars → `0` | Marketing “sharp” cards / controls (Tailwind default squares in v2 layouts) | Docs square Mintlify/Stainless chrome to match. |
| Grid marketing background (`.grid-background`, `.grid-background-docs`) | `rails-web/theme.css` `.grid-background` (`#e4e4e7` / `#27272a` dots) | Docs use `--rails-grid-dot` (same hex intent as web). |

---

## Neutrals (zinc scale) — `--rails-*`

These tokens centralize **zinc-family** neutrals for docs chrome (header, intro, sidebar toggle, arch diagram, API overview cards). They align with **Tailwind zinc** as used across `rails-web` marketing components (e.g. `text-zinc-600`, `border-zinc-200`, `dark:bg-[#050505]`), and with **structural** borders from `rails-web/theme.css` where noted.

| Token | Light / dark (docs) | rails-web anchor |
|-------|---------------------|------------------|
| `--rails-border` | `#e4e4e7` / `#27272a` | Near `structural-border` light `#e5e5e5` / dark `#1f1f1f`; also Tailwind **zinc-200 / zinc-800** grid lines. |
| `--rails-border-strong` | `#d4d4d8` / `#3f3f46` | Tailwind zinc-300 / zinc-700 family (borders in `DashboardOverviewV2`, etc.). |
| `--rails-border-decorative` | `#a1a1aa` / `#52525b` | Muted dividers / chevrons. |
| `--rails-surface` | `#ffffff` / `#0a0a0a` | Marketing white / near-black panels (`SiteLayout`, tiles). |
| `--rails-surface-hover` | `#fafafa` / `#09090b` | Hover strips aligned to zinc-50 / zinc-950-style surfaces. |
| `--rails-surface-muted` | `#f4f4f5` / `#18181b` | `marketingTheme` secondary backgrounds (`bg-zinc-100` / dark elevated). |
| `--rails-surface-sunken` | `#fafafa` / `#050505` | Light sunken + `dark:bg-[#050505]`-class patterns in web cards. |
| `--rails-text-primary` | `#18181b` / `#fafafa` | Near `text-black` / `text-white` marketing headings. |
| `--rails-text-secondary` | `#3f3f46` / `#a1a1aa` | `text-zinc-600` / `text-zinc-400` family. |
| `--rails-text-tertiary` | `#52525b` / `#a1a1aa` | Supporting body / card copy. |
| `--rails-text-muted` | `#71717a` / `#a1a1aa` | `label-micro` / `text-zinc-500` lane. |
| `--rails-text-breadcrumb` | `#a1a1aa` / `#52525b` | Muted crumb line. |
| `--rails-chrome-logo` | `#000000` / `#ffffff` | Header wordmark contrast (matches inverted logo treatment in docs `theme.css`). |
| `--rails-panel-elevated` | `#f4f4f5` / `#111111` | Elevated panels / gateway nodes (zinc-100 / deep neutral). |
| `--rails-label-chip` | `#f4f4f5` / `#27272a` | Small API/diagram labels. |
| `--rails-pill-surface` | `#f4f4f5` / `#09090b` | Install snippet strip in Libraries overview. |
| `--rails-focus-ring` | `#18181b` / `#fafafa` | Square focus / active tab indicator. |
| `--rails-icon-same` | `#71717a` ×2 | Labels that stay muted in both themes. |

---

## Brand green (emerald)

| rails-docs | rails-web reference | Notes |
|------------|---------------------|--------|
| `--stl-color-accent` | Marketing Tailwind **emerald-600** `#059669`, darker emerald in dark UI | Docs comment: see `MarketingHome`, `ArchitectureDiagram`, etc. Dark docs use `#047857` for WCAG on solid accent. |
| `--rails-emerald-*`, `--rails-link*` | `text-emerald-600`, `dark:text-emerald-400`, borders `emerald-500` / `#10b981` in diagrams | Docs-specific **semantic** names for intro exec strip, tiles, and in-body links; hues stay on the same emerald ramp as web. |

Starlight `--sl-color-accent-*` HSL block in `theme.css` stays aligned for link chrome inside Starlight surfaces.

---

## Components / behaviors (docs-only, parity-minded)

| Item | Location | rails-web parallel |
|------|----------|---------------------|
| Collapsible docs sidebar | `SidebarNoSdkSelect.astro`, `astro.config.ts` head script, `theme.css` `html.rails-sidebar-collapsed` | No equivalent control; geometry and borders still use `--rails-*` / marketing neutrals. |
| Simple theme toggle | `ThemeToggleSimple.astro` | Conceptually matches rails-web light/dark **transitions**; storage key is Starlight’s `starlight-theme`. |
| Header / secondary tabs overrides | `theme.css` | Stacked header + tab row visually aligned to marketing chrome. |

---

## When rails-web changes

1. Update **this map** and, if needed, **hex / `light-dark()` values** in `rails-docs/theme.css`.
2. **Do not** rely on editing `rails-web` from the docs repo; open a separate product PR there if marketing should lead.
