# @ds/demo

Angular demo application for the dream-sicle workspace.

`@ds/demo` is the main UI app in the repository. It uses Angular with SSR support and composes shared workspace packages to exercise authentication, layout, routing, and user-facing flows.

## What This Project Contains

- App shell entry point in `src/app/app.component.ts`
- Protected and unprotected route trees in `src/app/routes.ts` and `src/app/routes-unprotected.ts`
- Feature areas for auth, home, layout, and users under `src/app/features`
- Reusable app-level layout components under `src/app/components`
- SSR entry points in `src/main.server.ts` and `src/server.ts`

## Features

- Angular application with server-side rendering support
- Route-level separation between public auth pages and protected application pages
- Lazy-loaded users feature routes
- Shared command palette integration through `@ds/components`
- Shared browser/server platform helpers through `@ds/core`
- Shared contract and utility packages for API-safe typing and common helpers

## Current Routes

### Protected

- `/` - home page
- `/users` - users list
- `/users/:id` - user details

### Unprotected

- `/signin` - sign-in page
- `/signup` - sign-up page

## Development

Run from the workspace root:

```bash
bun --filter @ds/demo start
```

Useful scripts:

- `bun --filter @ds/demo build`
- `bun --filter @ds/demo watch`
- `bun --filter @ds/demo test`
- `bun --filter @ds/demo serve:ssr:demo`

## Example Workflow

Start the app locally and open the users area:

```bash
bun --filter @ds/demo start
```

Then navigate to `http://localhost:4200/users` to exercise the routed users feature.

## Related Projects

- [workspace](../../README.md)
- [api](../api/README.md)
- [components](../../packages/components/README.md)
- [core](../../packages/core/README.md)
- [contracts](../../packages/contracts/README.md)
- [utils](../../packages/utils/README.md)
