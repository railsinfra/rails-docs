# Rails API docs (Stainless Docs Platform)

This site uses the [Stainless Docs Platform](https://www.stainless.com/docs/docs-platform/) (Astro + Starlight + `@stainless-api/docs`) against the **`rails`** Stainless project.

## Prerequisites

- Node **22.12+** (Astro 6) and `pnpm`
- A [Stainless API key](https://app.stainless.com) with access to the `rails` org/project (same key as the Stainless MCP / SDK tooling)

## Railway (hosting)

The **rails-infrastructure** project uses the included `Dockerfile` and `railway.toml`. There is **one service per environment** (Railway service names are unique across the project, so staging/production use distinct names):

| Environment | Service name | Example public URL |
|-------------|--------------|--------------------|
| **dev** | `rails-docs` | https://rails-docs-dev.up.railway.app |
| **staging** | `rails-docs-staging` | https://rails-docs-staging-staging.up.railway.app |
| **production** | `rails-docs-production` | https://rails-docs-production-production.up.railway.app |

*(Generated domains follow `{service}-{environment}.up.railway.app`; rename a service in Railway if you want a shorter hostname.)*

1. For **each** of the services above → **Variables**, add:
   - **`STAINLESS_API_KEY`** — **required** for the Docker image build (no `stl` login inside the container). Use the same `stl_sk_…` value as in local `.env`. The name must be exactly `STAINLESS_API_KEY` so it maps to `ARG STAINLESS_API_KEY` in the Dockerfile ([Railway build-time variables](https://docs.railway.com/guides/dockerfiles#using-variables-at-build-time)).
   - **`PUBLIC_MARKETING_SITE_URL`** (optional) — origin of the marketing app (`rails-web`) for that environment for the header **Website** link.
2. Deploy from this directory (link the env first, e.g. `railway environment staging`):
   - Dev: `railway up --service rails-docs --detach`
   - Staging: `railway up --service rails-docs-staging --detach`
   - Production: `railway up --service rails-docs-production --detach`  
   Or use `.github/workflows/deploy-*.yml` with `RAILWAY_TOKEN` (each workflow targets the matching service name).

CI runs `pnpm run typecheck` only; the full `astro build` runs on Railway so the Stainless key does not need to live in GitHub unless you add a build job that runs `pnpm run build` with secrets.

### Branch promotion (same as rails-web)

Long-lived branches: **`develop`** → **`staging`** → **`main`**. Feature work merges to `develop` (deploys dev). After a PR **into `develop`** is merged, workflow [`.github/workflows/create-pr-to-next-environment.yml`](.github/workflows/create-pr-to-next-environment.yml) opens a PR **`develop` → `staging`**. After a PR **into `staging`** is merged, it opens **`staging` → `main`**.

Add repository secret **`GH_PAT`**: a [fine-grained or classic PAT](https://github.com/settings/tokens) with **`repo`** scope so the workflow can create pull requests (same pattern as `rails-web`). Without it, the promotion jobs fail fast with a clear error.

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
