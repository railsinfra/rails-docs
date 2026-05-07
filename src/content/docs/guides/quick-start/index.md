---
title: Local
description: If you want more control you can run the core engine on your localhost for deeper development or contract testing against your own stack.
sidebar:
  order: 1
---


1. Clone **`rails-core`**

   ```bash
   git clone https://github.com/railsinfra/rails-core.git
   cd rails-core
   ```

2. Copy **`.env.example`** to **`.env`**.

   ```bash
   cp .env.example .env
   ```

3. Run:

   ```bash
   make dev
   ```

   When healthy, the gateway listens on **`http://localhost:8080`**.

## What to read next

- [README](https://github.com/railsinfra/rails-core/blob/main/README.md) — Project overview, setup context, and core commands.
- [Architecture](/guides/architecture/) — Gateway layout and service boundaries.
- [Authentication](/guides/authentication/) — Keys, base URL, and client env vars.
- **[API Reference](/api)** tab — Endpoints and SDK-aligned examples.
