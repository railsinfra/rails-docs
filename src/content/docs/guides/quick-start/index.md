---
title: Quick start
description: Run SDK sample servers against a host you have access to, or bring up the open-source rails-core stack locally.
sidebar:
  order: 1
---

You can integrate in two common ways: **reference sample apps** that proxy the public HTTP API, or the **rails-core** repository for a full local gateway and services.

## Official SDKs

For install commands and client setup straight from each generated library, open a language page below. Each page mirrors **`rails-sdks/<sdk>/README.md`** and points you to the **API Reference** tab for endpoints and snippets.

- [TypeScript](./typescript/) — `rails-sdks/rails-typescript/`
- [Go](./go/) — `rails-sdks/rails-go/`
- [Java](./java/) — `rails-sdks/rails-java/`
- [Kotlin](./kotlin/) — `rails-sdks/rails-kotlin/`
- [C#](./csharp/) — `rails-sdks/rails-csharp/`

## Path A — SDK samples (fastest “first request”)

Use this when you already have a **base URL** and **server API key** from your onboarding (not when you need to provision databases yourself).

1. In this monorepo, open **`rails-sdk-samples/`** (see that folder’s `README.md` for the full matrix).
2. Choose a language folder (`typescript/`, `go/`, `java/`, `kotlin/`, or `csharp/`), install dependencies, and copy **`.env.example`** to **`.env`**.
3. Set:
   - **`RAILS_BASE_URL`** — Use the value from `.env.example` unless you were given a different host.
   - **`RAILS_API_KEY`** — Your server API key (never commit real values).
4. Start the sample (for example, from `typescript/`: `npm run dev`). Open the sample’s Swagger UI (often `http://localhost:8081/`, or the port listed in the sample README; Go defaults to **8083**).

Samples ship **Swagger UI** and **`/openapi.json`** so you can exercise routes against your configured host. They do **not** run Postgres or core services for you.

## Path B — rails-core on your machine

Use this when you need the **gateway**, **users**, **accounts**, and **ledger** services together for development or contract testing.

1. Clone **`rails-core`** (see `rails-core/README.md` in this monorepo or the upstream repository).
2. Copy **`.env.example`** to **`.env`** and set database URLs (`NEON_API_KEY` for automated Neon setup, or `USERS_DATABASE_URL`, `ACCOUNTS_DATABASE_URL`, `LEDGER_DATABASE_URL`, and `AUDIT_DATABASE_URL` manually—details in `rails-core/docs/quickstart.md`).
3. Run:

   ```bash
   make dev
   ```

4. When healthy, the gateway listens on **`http://localhost:8080`**. Static docs are under **`/docs/`**; APIs are prefixed **`/users/`**, **`/accounts/`**, and **`/ledger/`**.

Optional checks with the stack up:

```bash
make health
make test
```

`make test` assumes `http://127.0.0.1:8080` unless you set **`GATEWAY_URL`**.

## What to read next

- [Architecture](/guides/architecture/) — Gateway layout and service boundaries.
- [Authentication](/guides/authentication/) — Keys, base URL, and client env vars.
- **[API Reference](/api)** tab — Endpoints and SDK-aligned examples.
