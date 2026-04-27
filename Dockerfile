# Build Astro + Starlight (Stainless) static site, then serve with `serve` on $PORT.
# https://docs.railway.com/guides/dockerfiles#using-variables-at-build-time
# Astro 6 requires Node >= 22.12 (see local `pnpm run build` / package engines if added).
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
# Railway: add variable STAINLESS_API_KEY on the service; it is passed into `docker build` when
# this ARG name matches (see https://docs.railway.com/guides/dockerfiles#using-variables-at-build-time).
# Do not use `ENV STAINLESS_API_KEY=` when empty — that blocks Stainless from falling back to `stl` locally.
ARG STAINLESS_API_KEY
ARG PUBLIC_MARKETING_SITE_URL
ENV PUBLIC_MARKETING_SITE_URL=$PUBLIC_MARKETING_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN if [ -z "${STAINLESS_API_KEY:-}" ]; then \
      printf '%s\n' '' \
        'STAINLESS_API_KEY is not set for this Docker build.' \
        'Railway → rails-docs service → Variables → add STAINLESS_API_KEY (from https://app.stainless.com).' \
        'Use the same value as in rails-docs/.env locally. Railway injects it at build time because the Dockerfile declares ARG STAINLESS_API_KEY.' \
        '' >&2; \
      exit 1; \
    fi \
    && export STAINLESS_API_KEY \
    && pnpm run build

FROM base AS runner
ENV NODE_ENV=production
RUN npm install -g serve@14.2.4
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "serve dist -l \"tcp://0.0.0.0:${PORT:-3000}\""]
