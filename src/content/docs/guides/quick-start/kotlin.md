---
title: Kotlin
description: Add the Rails Kotlin artifacts and use the same OkHttp entrypoints as the Java SDK.
sidebar:
  order: 5
---

## Install

**Gradle** (from the SDK README):

```kotlin
implementation("com.rails.api:rails-kotlin:0.0.1")
```

**Maven**:

```xml
<dependency>
  <groupId>com.rails.api</groupId>
  <artifactId>rails-kotlin</artifactId>
  <version>0.0.1</version>
</dependency>
```

Confirm the version in the README when you upgrade.

## Requirements

**Java 8 or later** (per README).

## Client from the environment

Use **`RailsOkHttpClient.fromEnv()`** as in the README; it honors **`RAILS_API_KEY`**, **`RAILS_BASE_URL`**, and the same system-property overrides described there.

Use the **[API Reference](/api)** tab for endpoint-level detail and cross-language snippets.

## Runnable sample

Follow **Path A** on the [Quick start overview](/guides/quick-start/) and use **`rails-sdk-samples/kotlin/`** for a hosted Swagger UI workflow.
