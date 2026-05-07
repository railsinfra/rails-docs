# syntax=docker/dockerfile:1.4
# Build Astro + Starlight (Stainless) static site, then serve with `serve` on $PORT.
#
# Security (runner): static `dist/` is copied as root, then chmod clears write bits and
# special mode bits for u/g/o so the non-root process cannot mutate site content (immutable
# payload). Runtime user is not the owner of `dist/`, so it cannot chmod its way to writes.
#
# Railway's Docker builder currently rejects non-cache `RUN --mount=...` forms. For Stainless
# docs builds, Railway provides build-time variables via ARG declarations in the builder stage.
#
# Local / CI example:
#   docker buildx build \
#     --build-arg STAINLESS_API_KEY=stl_sk_... \
#     --build-arg PUBLIC_MARKETING_SITE_URL=https://your-marketing-site.example \
#     --build-arg PUBLIC_GET_STARTED_URL=https://app.example.com/signup \
#     --build-arg PUBLIC_GET_STARTED_ENABLED=true \
#     -t rails-docs:local .
#
# Railway BuildKit cache requires a service-specific cache ID tied to the target path and does
# not support ARG/env interpolation for that ID. A wrong value causes build failures (e.g.
# "Cache mount ID is not prefixed with cache key"). This Dockerfile omits cache mounts so one image
# builds on Railway, GitHub Actions, and local Docker; for per-service Railway cache, use a forked
# Dockerfile with your service id or set RAILWAY_DOCKERFILE_PATH to such a file. See:
# https://docs.railway.com/guides/dockerfiles#cache-mounts
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
# Header "Get started" CTA controls (optional, non-secret).
# PUBLIC_GET_STARTED_URL: where the button links to.
# PUBLIC_GET_STARTED_ENABLED: feature flag (true|1|yes|on); empty = default (enabled).
ARG PUBLIC_GET_STARTED_URL
ARG PUBLIC_GET_STARTED_ENABLED
ARG STAINLESS_API_KEY
COPY --from=deps /app/node_modules ./node_modules
# Copy only paths required for `pnpm run build` (avoids blind recursive `COPY . .`); `.dockerignore`
# still trims the client context for local builds — keep it aligned with these paths.
COPY astro.config.ts middleware.stainless.tsx package.json pnpm-lock.yaml pnpm-workspace.yaml theme.css tsconfig.json stainless-virtual-modules.d.ts ./
COPY public ./public
COPY scripts ./scripts
COPY src ./src
RUN sh -c 'set -e; \
      if [ -z "${STAINLESS_API_KEY:-}" ]; then \
        echo "STAINLESS_API_KEY is not available for this build step." >&2; \
        echo "Set STAINLESS_API_KEY as a Railway service variable (build-time) or pass --build-arg STAINLESS_API_KEY=... locally." >&2; \
        exit 1; \
      fi; \
      export STAINLESS_API_KEY; \
      export PUBLIC_MARKETING_SITE_URL="${PUBLIC_MARKETING_SITE_URL:-}"; \
      export PUBLIC_GET_STARTED_URL="${PUBLIC_GET_STARTED_URL:-}"; \
      export PUBLIC_GET_STARTED_ENABLED="${PUBLIC_GET_STARTED_ENABLED:-}"; \
      pnpm run build'

FROM base AS runner
ENV NODE_ENV=production
# Install serve as root, then drop privileges: static file server does not need root at runtime.
RUN npm install -g --ignore-scripts --omit=dev serve@14.2.4 \
  && groupadd --system railsdocs \
  && useradd --system --gid railsdocs --no-create-home --home-dir /nonexistent --shell /usr/sbin/nologin railsdocs
WORKDIR /app
# Explicit root ownership on copy (default) documents intent; runtime user must not own dist.
# Strip write and special mode bits after copy so the tree stays immutable at runtime.
COPY --from=builder --chown=root:root /app/dist ./dist
RUN set -eu \
  && chown -R root:root /app/dist \
  && chmod -R a-st,a-w,a+rX /app/dist
USER railsdocs
EXPOSE 3000
# HTTP probe uses Node already in the image (no extra packages); honors $PORT from the orchestrator.
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/',(r)=>{r.resume();process.exit(r.statusCode<500?0:1)}).on('error',()=>process.exit(1))"
STOPSIGNAL SIGTERM
CMD ["sh", "-c", "exec serve dist -l \"tcp://0.0.0.0:${PORT:-3000}\""]
