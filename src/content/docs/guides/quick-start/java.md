---
title: Java
description: Add the Rails Java artifacts from Maven Central and build a client from the environment.
sidebar:
  order: 4
---

## Install

**Gradle** (from the SDK README):

```kotlin
implementation("com.rails.api:rails-java:0.0.1")
```

**Maven**:

```xml
<dependency>
  <groupId>com.rails.api</groupId>
  <artifactId>rails-java</artifactId>
  <version>0.0.1</version>
</dependency>
```

Bump the version when you align with a newer release; the README links Maven Central and Javadoc.

## Requirements

**Java 8 or later** (per README).

## Client from the environment

The README recommends **`RailsOkHttpClient.fromEnv()`**, which reads **`RAILS_API_KEY`**, **`RAILS_BASE_URL`**, and related system properties as documented in the README’s configuration table.

Pair that setup with the **[API Reference](/api)** tab for request builders and response types.

## Runnable sample

Follow **Path A** on the [Quick start overview](/guides/quick-start/) and use **`rails-sdk-samples/java/`** when you want a sample server before you integrate the library.
