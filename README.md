# dream-sicle

dream-sicle is a pnpm workspace that groups the demo Angular application, the internal API, and a small set of shared libraries used across the stack.

The workspace is organized so UI, API, database, and shared contracts can evolve together without duplicating types or utility code.

## Workspace Projects

### Applications

- [demo](apps/demo/README.md) - Angular demo application with SSR support, authentication flows, users pages, and shared layout infrastructure.
- [api](apps/api/README.md) - Internal Node-based API serving auth, users, and search endpoints.

### Shared Packages

- [contracts](packages/contracts/README.md) - Shared DTO and request/response contract types.
- [core](packages/core/README.md) - Angular runtime helpers used by application and component code.
- [components](packages/components/README.md) - Shared Angular UI components.
- [db](packages/db/README.md) - Prisma schema, generated client, seed workflow, and database-facing types.
- [utils](packages/utils/README.md) - Shared framework-agnostic utility functions and lightweight runtime helpers.

## Workspace Layout

- `apps/` - runnable applications.
- `packages/` - reusable libraries shared by multiple applications.
- `docs/` - supporting documentation.
- `.vscode/` - local editor tasks, launch configs, and MCP settings.

## Getting Started

### Requirements

- Node.js `>=22.12.0`
- `pnpm@10.32.1`

### Install Dependencies

```bash
pnpm install
```

### Start the Demo App

```bash
pnpm run dev
```

This runs the `@ds/demo` application in development mode.

## Common Workspace Commands

- `pnpm run dev` - start the demo application.
- `pnpm run lint` - run workspace standards checks.
- `pnpm run ready` - run formatting, linting, tests, and builds across the workspace.
- `pnpm run standards:check` - run repository standards validation only.

## How the Projects Fit Together

- `@ds/demo` consumes `@ds/components`, `@ds/core`, `@ds/contracts`, and `@ds/utils`.
- `@ds/api` consumes `@ds/contracts`, `@ds/db`, and `@ds/utils`.
- `@ds/db` is the source of truth for schema, generated Prisma types, and seed data.
- `@ds/contracts` keeps the browser and API aligned on payload shapes without exposing database internals.

## Project Documentation

Each application and package keeps its own README with purpose, contents, public API or feature list, development commands, and examples where that adds value. Use the project links above for implementation-specific details.
