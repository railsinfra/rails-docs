---
title: TypeScript
description: Install the Rails TypeScript client from npm and wire it to your environment.
sidebar:
  order: 2
---

## Install

```sh
npm install @railsinfra/rails
```

The client is published on npm as **`@railsinfra/rails`** (current version: `0.2.2`).

## Configure and call the API

You typically construct a client with `apiKey` (defaults from `RAILS_API_KEY`) and `environment`, then call typed resources—for example `client.users.create(...)` as shown in the README. Request and response types are exported from the same module.

For every path, header, and body field, use the **[API Reference](/api)** tab in this site; examples there stay aligned with the generated client.

## Try a runnable sample first

If you want a small HTTP server with Swagger UI before you embed the library, follow **Path A** on the [Quick start overview](/guides/quick-start/) and use <a href="https://github.com/railsinfra/rails-sdk-samples/tree/main/typescript"><code>rails-sdk-samples/typescript/</code></a>.
