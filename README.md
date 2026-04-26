# Rails API docs (Stainless Docs Platform)

This site uses the [Stainless Docs Platform](https://www.stainless.com/docs/docs-platform/) (Astro + Starlight + `@stainless-api/docs`) against the **`rails`** Stainless project.

## Prerequisites

- Node 20+ and `pnpm`
- A [Stainless API key](https://app.stainless.com) with access to the `rails` org/project (same key as the Stainless MCP / SDK tooling)

## Setup

```bash
cp .env.example .env
# Set STAINLESS_API_KEY=stl_sk_...
pnpm install
```

Optional: point the header **Website** link at your marketing app (defaults to `http://localhost:3000`):

```bash
echo 'PUBLIC_MARKETING_SITE_URL=https://your-production-domain' >> .env
```

## Commands

| Command       | Purpose                          |
| ------------- | -------------------------------- |
| `pnpm dev`    | Local dev server (default :4321) |
| `pnpm build`  | Static production build → `dist` |
| `pnpm preview`| Serve the built `dist` folder    |

## Theme

`theme.css` mirrors `rails-web/theme.css` utilities (`structural-border`, `label-micro`, `grid-background`, `font-mono`, `material-symbols-sharp`, `glow-effect`, scrollbar helpers) and uses Starlight’s `data-theme="light"|"dark"` on the document for dark-mode variants. `astro.config.ts` loads Inter, Space Grotesk, and Noto Sans Mono to match marketing.

**Theme — icons:** Repo-owned UI uses **Material Symbols Sharp** (Google font in `astro.config.ts` + `.material-symbols-sharp` in `theme.css`). `theme.css` also maps common **upstream Lucide / inline SVG** chrome (sidebar expanders, breadcrumbs, snippet copy states, callouts, pagination, heading anchors, header search trigger, property toggles, resource title chevrons, Libraries action buttons) to the same font. **Unchanged on purpose:** SDK language logos in library cards (`.stldocs-language-block-content-icon`), `middleware.stainless.tsx` snippet-language `SDKIcon`s, `rails-logo.svg`, and **Pagefind** UI assets inside its iframe/shadow UI.

Corners are **square** for Stainless/Starlight UI: `--sl-button-border-radius` and `--stl-ui-layout-border-radius*` are set to `0` in `theme.css`, with Mintlify-compat cards forced to `0` as well. (`--stl-ui-layout-border-radius-max` stays large for circular controls.)

## Guides (this repo)

Authoritative prose lives under `src/content/docs/`:

- **Introduction** — `index.mdx` (landing under the Guides tab).
- **Guides** — `src/content/docs/guides/` (Quick start, Architecture, Authentication, SDK overview).

The Guides sidebar is configured in `astro.config.ts` (`autogenerate` for `guides/`). Set **`PUBLIC_MARKETING_SITE_URL`** in `.env` if the header **Website** link should not default to `http://localhost:3000`.

## Further reading

- [Stainless Docs Platform overview](https://www.stainless.com/docs/docs-platform/)
- [Starlight](https://starlight.astro.build/)
