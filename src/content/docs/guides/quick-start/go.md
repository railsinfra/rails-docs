---
title: Go
description: Add the Rails Go module and construct a client with functional options.
sidebar:
  order: 3
---

## Install

Import the module (imported as **`rails`** in the README examples):

```go
import (
	"github.com/railsinfra/rails-go" // imported as rails
)
```

To pin a version, the README uses:

```sh
go get -u 'github.com/railsinfra/rails-go@v0.1.0'
```

Replace the version with the tag you intend to ship; **`go 1.22+`** is required.

## Client

`rails.NewClient` with options from **`github.com/railsinfra/rails-go/option`** (for example `option.WithAPIKey`, `option.WithEnvironmentProduction`) matches the README’s main example.

Use the **[API Reference](/api)** tab for endpoint shapes and examples alongside this SDK.

## Runnable sample

For Swagger UI against your gateway, follow **Path A** on the [Quick start overview](/guides/quick-start/) and use <a href="https://github.com/railsinfra/rails-sdk-samples/tree/main/go"><code>rails-sdk-samples/go/</code></a> (default port **8083** per the overview).
