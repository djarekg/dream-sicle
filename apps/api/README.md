# @ds/api

Internal API application for the dream-sicle workspace.

This app serves authentication, user, and search endpoints backed by the
workspace database package. It runs on Node and composes route handlers with CORS
middleware.

## What This Project Contains

- Node-compatible request handler and server entry point in `src/server.ts`
- Route definitions in `src/routes`
- Business logic controllers in `src/controllers`
- Shared DB client wiring via `@ds/db`

## Environment

The runtime expects environment values from:

- `../../packages/db/.env.local` for `DATABASE_URL`
- `apps/api/.env.local` for API-specific variables

Key variables used by this app:

- `ACCESS_TOKEN_SECRET` - JWT signing secret
- `PORT` - server port (defaults to `4000`)
- `NODE_ENV` - runtime mode (`development` or `production`)
- `CORS_ORIGIN` - optional CORS origin value

## Development

Run from the workspace root:

```bash
pnpm --filter @ds/api dev
```

This command runs Vite+ (`vp dev`) with API middleware that serves `/auth`,
`/users`, and `/search` endpoints directly from your route handlers.

Additional scripts:

- `pnpm --filter @ds/api typecheck`
- `pnpm --filter @ds/api build`

## Routes

Current route groups:

- Auth
  - `/auth/signin`
  - `/auth/signout`
  - `/auth/authenticated`
- Users
  - `/users`
  - `/users/:id`
- Search
  - `/search`

If no route matches, the server returns `404` JSON and still applies CORS headers.

## Related Docs

- [packages/db/README.md](../../packages/db/README.md)
- [packages/http/README.md](../../packages/http/README.md)
- [packages/utils/README.md](../../packages/utils/README.md)
