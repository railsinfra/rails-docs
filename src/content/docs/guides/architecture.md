---
title: Architecture
description: Gateway, domain services, and contracts in the rails-core stack.
sidebar:
  order: 2
---

This page summarizes the **rails-core** layout from **`rails-core/docs/architecture.md`**. It describes the open-source multi-service stack behind the HTTP API—not your own product frontends.

## System diagram

<div class="rails-arch-diagram">
  <div class="rails-arch-node rails-arch-node--dashed">
    <strong>SDK</strong>
    <span>Official backend clients</span>
  </div>

  <div class="rails-arch-connector">
    <div class="rails-arch-line"></div>
    <div class="rails-arch-dot"></div>
    <div class="rails-arch-line"></div>
    <span>REST / GraphQL</span>
  </div>

  <div class="rails-arch-node rails-arch-node--gateway">NGINX Gateway</div>

  <div class="rails-arch-connector">
    <div class="rails-arch-line"></div>
    <div class="rails-arch-dot"></div>
    <div class="rails-arch-line"></div>
  </div>

  <div class="rails-arch-api">
    <div class="rails-arch-api-label">Rails API</div>
    <div class="rails-arch-api-grid">
      <div class="rails-arch-node rails-arch-node--service">
        <span>Rust</span>
        <strong>Users</strong>
      </div>
      <div class="rails-arch-node rails-arch-node--service">
        <span>Rust</span>
        <strong>Accounts</strong>
      </div>
      <div class="rails-arch-node rails-arch-node--ledger">
        <span>Rails</span>
        <strong>Ledger Engine</strong>
      </div>
    </div>
    <div class="rails-arch-mesh">gRPC Mesh</div>
  </div>

  <div class="rails-arch-connector">
    <div class="rails-arch-line"></div>
    <div class="rails-arch-dot"></div>
    <div class="rails-arch-line"></div>
  </div>

  <div class="rails-arch-node rails-arch-node--dashed">
    <strong>Database</strong>
    <span>Neon, Supabase, or your own Postgres</span>
  </div>
</div>

## Mental model

Traffic hits a single **nginx gateway** on port **8080**. The gateway forwards path prefixes to three domain services; each service has its **own Postgres** (no shared database, no cross-import of internal code). Services integrate over **HTTP** through the gateway and over **gRPC/proto** contracts for machine-to-machine shapes.

## Request path

A typical financial command flows **client → gateway → accounts → ledger → response**: accounts validates and persists its bounded context, then invokes the ledger when a fact must be final; the ledger applies double-entry rules. Exact HTTP routes live in each service’s router; prefixes are stable at the gateway.

## Gateway prefixes

| Prefix | Service | Role (high level) |
| --- | --- | --- |
| `/users/` | users-service (Rust) | Identity, auth edges, tenant context |
| `/accounts/` | accounts-service (Rust) | Accounts, balances, orchestration toward ledger |
| `/ledger/` | ledger-service (Rails) | Immutable ledger, postings, financial finality |
| `/docs/` | Static files | Developer docs served through the gateway |

## Contracts

Versioned **proto** files under **`proto/`** define RPC surfaces (for example `users.proto`, `accounts.proto`, `ledger.proto`). Add or change RPCs in proto **before** implementing cross-service calls; version bumps follow your team’s policy (new package version or new file).

## Why it is split

- **Blast radius** — A defect in a peripheral layer must not corrupt ledger data.
- **Data isolation** — Each service owns its database URL; no cross-DB joins.
- **Velocity** — Shared contracts stabilize integration while internals stay private.

For commands, env variables, and health checks, use **`rails-core/docs/quickstart.md`** alongside **`rails-core/README.md`**.
