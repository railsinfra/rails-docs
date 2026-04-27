---
title: Authentication
description: Server API keys, base URLs, and how official SDKs and samples read credentials.
sidebar:
  order: 3
---

Call the Rails APIs **from your server** (or local tooling) with an **API key**, and use the **base URL** you were given for that environment (staging vs production, and so on). Never put API keys in browser bundles or public repos.

## What you configure

| Variable | Used by | Purpose |
| --- | --- | --- |
| `RAILS_API_KEY` | Samples, most SDKs | Secret key for API calls—treat like a password. |
| `RAILS_BASE_URL` | Samples, JVM clients from env | Origin of the HTTP API you are calling. |

Copy **`.env.example`** to **`.env`** in a sample app and set placeholders to real values only on your machine or in a secret store. Never commit **`YOUR_API_KEY`** or production keys to git.

## SDKs (high level)

Configuration details differ by language; each README under **`rails-sdks/<language>/`** in this monorepo is authoritative. Patterns you will see:

- **TypeScript** — `RAILS_API_KEY` (default env name); constructor options for environment and API key (see `rails-sdks/rails-typescript/README.md`).
- **Go** — `option.WithAPIKey(...)`; default lookup **`RAILS_API_KEY`** (see `rails-sdks/rails-go/README.md`).
- **Java / Kotlin** — `RailsOkHttpClient.fromEnv()` reads **`RAILS_API_KEY`** and **`RAILS_BASE_URL`**, or system properties `rails.apiKey` / `rails.baseUrl` (see `rails-sdks/rails-java/README.md` and `rails-sdks/rails-kotlin/README.md`).
- **C#** — Default constructor uses **`RAILS_API_KEY`** and **`RAILS_BASE_URL`** from the environment (see `rails-sdks/rails-csharp/README.md`).

Some SDK examples also set an **environment** (for example staging vs production). Match that to the host you were given.

## Samples and dev TLS

The <a href="https://github.com/railsinfra/rails-sdk-samples"><code>rails-sdk-samples</code></a> apps are small servers that forward to the Rails API. If you hit **TLS or certificate errors** against a development host with a private CA, each sample README documents a **dev-only** insecure flag (for example the TypeScript sample may log when trust-all TLS is enabled). Use only in controlled dev setups.

## Further reading

- [Quick start](/guides/quick-start/) — Where to set env vars for samples vs rails-core.
- [SDK overview](/guides/sdk-overview/) — Languages and install entry points.
- **API Reference** tab — Security schemes and per-route requirements from OpenAPI.
