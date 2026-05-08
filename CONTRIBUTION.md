# Contribution Guide

This repository powers the Rails API docs site using the Stainless Docs Platform on top of Astro and Starlight.

## Project at a Glance

- Framework: `astro` with `@astrojs/react`
- Docs shell: `@astrojs/starlight`
- API docs integration: `@stainless-api/docs` and `@stainless-api/docs-ui`
- Language: TypeScript
- Package manager: `pnpm`
- Hosting/deploy target: Railway

The site is a mix of authored docs content and generated API reference pages:

- Guides and landing pages live in `src/content/docs/`
- Site configuration and navigation live in `astro.config.ts`
- Repo-owned visual overrides live in `theme.css`
- Small UI customizations live in `src/components/`

## Architecture Notes

There are two main user-facing areas in the site:

1. The `Guides` tab for authored documentation and onboarding content
2. The `API Reference` tab for Stainless-backed reference pages

A few implementation details are worth knowing before you make changes:

- The header, sidebar behavior, and tab structure are configured in `astro.config.ts`
- The custom sidebar component removes the default SDK selector and relies on route-based SDK pages instead
- Sidebar icons are mostly controlled in `theme.css`, including route-targeted SDK icons
- The docs site reads `STAINLESS_API_KEY` for builds that need Stainless project access

When you change navigation, routes, or icon behavior, check both `astro.config.ts` and `theme.css`. They intentionally work together.

## Local Setup

Prerequisites:

- Node `22.12+`
- `pnpm`
- A valid `STAINLESS_API_KEY`

Setup:

```bash
cp .env.example .env
pnpm install
```

Then add your Stainless key to `.env`:

```bash
STAINLESS_API_KEY=stl_sk_...
```

Useful commands:

```bash
pnpm dev
pnpm typecheck
pnpm format
pnpm test:nav-layout
pnpm build
```

## Contribution Workflow

For most changes:

1. Branch from `develop`
2. Make the smallest change that solves the problem
3. Run the relevant local checks
4. Open a pull request back into `develop`

Long-lived branch flow in this repo is:

- `develop` for active feature work
- `staging` for pre-production promotion
- `main` for production promotion

After merges, GitHub workflows handle promotion PRs between those long-lived branches.

## Pull Request Guide

Open PRs against `develop` unless the change is explicitly part of an environment promotion.

### PR title

Use a short, descriptive title. Examples:

- `fix(docs): restore SDK sidebar icons for API routes`
- `refactor: simplify guides sidebar structure`
- `docs: clarify local setup steps`

### PR description

A good PR body should include:

- What changed
- Why it changed
- Any user-visible impact
- How you tested it

Suggested format:

```md
## Summary
- explain the main change
- call out any navigation, styling, or content impact

## Testing
- `pnpm typecheck`
- `pnpm test:nav-layout`
- manual check in local docs app
```

### What reviewers will care about here

- Does the change preserve docs navigation and route behavior?
- Does it accidentally break generated API reference pages?
- If UI or theme code changed, does it still work in both light and dark mode?
- If link structure changed, do the sidebar icons, labels, and active states still line up?
- Are secrets and environment-specific values kept out of the repo?

## Change Guidelines

### Content changes

- Keep docs task-oriented and specific
- Prefer updating existing guides over adding overlapping pages
- Use consistent terminology with the rest of the product and API

### Navigation changes

- Keep the Guides and API Reference tabs coherent
- If you change sidebar routes, verify any route-based CSS selectors still match
- Be careful with explicit `link` values in `astro.config.ts`; they are used to avoid Starlight resolution issues in a few places

### Styling changes

- Reuse the established visual language in `theme.css`
- Prefer small, targeted overrides over broad global resets
- Keep the docs experience usable on desktop and mobile

## Before You Open a PR

Please check the following when relevant:

- The site runs locally with `pnpm dev`
- Type checks pass with `pnpm typecheck`
- Formatting is clean with `pnpm format`
- Navigation changes still pass `pnpm test:nav-layout`
- Build-sensitive changes were sanity-checked with `pnpm build`

## Security and Secrets

- Never commit API keys or production secrets
- Keep `STAINLESS_API_KEY` in local environment files or deployment secrets only
- Treat any Railway or GitHub credentials as sensitive

## Need Context First?

Start with these files:

- `README.md` for setup, deployment, and branch promotion notes
- `astro.config.ts` for site structure and Stainless integration
- `theme.css` for repo-owned UI behavior and icon mapping
- `src/content/docs/` for authored documentation content
