---
title: C#
description: Reference the generated Rails C# project in your solution and configure the client from the environment.
sidebar:
  order: 6
---

## Install

The SDK README documents consuming the generated source from the repository:

```bash
git clone git@github.com:railsinfra/rails-csharp.git
dotnet add reference rails-csharp/src/Rails
```

Adjust paths if you vendor the repo inside your monorepo layout.

## Requirements

**.NET Standard 2.0 or later** (per README).

## Client from the environment

`RailsClient` with no arguments is configured from **`RAILS_API_KEY`** and **`RAILS_BASE_URL`**, as described in the README’s configuration table.

See the **`examples`** directory in **`rails-sdks/rails-csharp/`** for runnable programs.

## API shapes and snippets

Use the **[API Reference](/api)** tab for HTTP details and examples that track the generated surface.

## Runnable sample

Follow **Path A** on the [Quick start overview](/guides/quick-start/) and use <a href="https://github.com/railsinfra/rails-sdk-samples/tree/main/csharp"><code>rails-sdk-samples/csharp/</code></a> when you want a sample server with OpenAPI first.
