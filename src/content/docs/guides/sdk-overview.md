---
title: SDK overview
description: Official Stainless-generated clients in this monorepo and how they relate to the API Reference tab.
sidebar:
  order: 4
---

Official **Rails** API libraries in this monorepo live under **`rails-sdks/`**. They are **generated with [Stainless](https://www.stainless.com/)** from the same OpenAPI surface documented in the **API Reference** tab of this site—use that tab when you need request/response shapes, auth headers, and copy-pastable examples across languages.

## Languages in this repo

| Directory | Ecosystem | Install / import (see README in repo) |
| --- | --- | --- |
| `rails-sdks/rails-typescript/` | Node / TypeScript | `npm install railsinfra` and `import Rails from 'railsinfra'` — full detail in README; package name in `package.json` is `@railsinfra/rails`. |
| `rails-sdks/rails-go/` | Go | `go get github.com/railsinfra/rails-go` (see README for pinned version). |
| `rails-sdks/rails-java/` | Java | Gradle / Maven coordinates `com.rails.api:rails-java` (version in README). |
| `rails-sdks/rails-kotlin/` | Kotlin | Gradle / Maven coordinates `com.rails.api:rails-kotlin` (version in README). |
| `rails-sdks/rails-csharp/` | .NET | README documents `dotnet add reference` to the generated project layout. |

Always open the **README** in each folder for current versions, environment variable names, and examples.

## How this site is organized

- **Guides** (this tab) — Concepts, onboarding, architecture, auth.
- **API Reference** — Stainless-generated HTTP and SDK documentation for the `rails` Stainless project.

If generated docs and a README disagree, treat the **published package / repo** process your team uses as final—and file a fix against the spec or generator inputs.

## Try code without writing a full app

Use **`rails-sdk-samples/`**: each language is a tiny server with Swagger UI wired to **`RAILS_BASE_URL`** and **`RAILS_API_KEY`**. See [Quick start](/guides/quick-start/).
