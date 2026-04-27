# syntax=docker/dockerfile:1.4
# Build Astro + Starlight (Stainless) static site, then serve with `serve` on $PORT.
#
# The Stainless API key must be passed as a BuildKit secret (not ARG/ENV) so it is not
# persisted in image metadata or layers. See: https://docs.docker.com/build/building/secrets/
#
# Local / CI example:
#   export STAINLESS_API_KEY=stl_sk_...
#   docker buildx build --secret id=stainless_api_key,env=STAINLESS_API_KEY \
#     --build-arg PUBLIC_MARKETING_SITE_URL=https://your-marketing-site.example -t rails-docs:local .
#
# Railway: platform docs still describe build-time vars as ARG; the builder must supply this
# secret (equivalent to the CLI flag above). If builds fail with "secret not found", confirm
# Railway passes BuildKit secrets for service variables or build the image in CI and deploy a prebuilt image.
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
# Non-secret marketing site origin (optional); safe as build-arg.
ARG PUBLIC_MARKETING_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
# Whole-tree copy is safe only because `.dockerignore` strips secrets, env files, creds, VCS, CI, and caches from the build context (see that file — do not loosen without review).
COPY . .
RUN --mount=type=secret,id=stainless_api_key,env=STAINLESS_API_KEY \
    sh -c 'set -e; \
      if [ -z "${STAINLESS_API_KEY:-}" ]; then \
        echo "STAINLESS_API_KEY is not available for this build step." >&2; \
        echo "Pass a BuildKit secret, e.g.: docker buildx build --secret id=stainless_api_key,env=STAINLESS_API_KEY ." >&2; \
        exit 1; \
      fi; \
      export PUBLIC_MARKETING_SITE_URL="${PUBLIC_MARKETING_SITE_URL:-}"; \
      pnpm run build'

FROM base AS runner
ENV NODE_ENV=production
RUN npm install -g serve@14.2.4
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "serve dist -l \"tcp://0.0.0.0:${PORT:-3000}\""]
