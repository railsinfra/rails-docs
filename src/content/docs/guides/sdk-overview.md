---
title: SDK overview
description: Official Stainless-generated clients in this monorepo and how they relate to the API Reference tab.
sidebar:
  order: 4
---

Official **Rails** client libraries in this monorepo live under **`rails-sdks/`**. They are **generated with [Stainless](https://www.stainless.com/)** from the same HTTP API documented in the **API Reference** tab—open that tab when you need exact paths, headers, bodies, and copy-paste examples in each language.

## Languages in this repo

| Directory | Ecosystem | Install / import (see README in repo) |
| --- | --- | --- |
| `rails-sdks/rails-typescript/` | Node / TypeScript | `npm install @railsinfra/rails-typescript` and `import Rails from '@railsinfra/rails-typescript'` — see README in repo for versions and advanced usage. |
| `rails-sdks/rails-go/` | Go | `go get github.com/railsinfra/rails-go` (see README for pinned version). |
| `rails-sdks/rails-java/` | Java | Gradle / Maven coordinates `com.rails.api:rails-java` (version in README). |
| `rails-sdks/rails-kotlin/` | Kotlin | Gradle / Maven coordinates `com.rails.api:rails-kotlin` (version in README). |
| `rails-sdks/rails-csharp/` | .NET | README documents `dotnet add reference` to the generated project layout. |

Always open the **README** in each folder for current versions, environment variable names, and examples.

## How this site is organized

- **Guides** (this tab) — Concepts, onboarding, architecture, and authentication.
- **API Reference** — Generated HTTP reference and SDK snippets for the Rails API (same source as the client libraries).

If this site and a README disagree, trust the **package your team actually publishes** as the source of truth, then open an issue on the spec or generator so everything can be aligned.

## Try code without writing a full app

Use <a href="https://github.com/railsinfra/rails-sdk-samples"><code>rails-sdk-samples/</code></a>: each folder is a small server with Swagger UI. Set **`RAILS_BASE_URL`** and **`RAILS_API_KEY`** in `.env`, then follow [Quick start](/guides/quick-start/) for ports and run commands.
