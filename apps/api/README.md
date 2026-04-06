# @ds/api

Internal API application for the dream-sicle workspace.

`@ds/api` serves the workspace's auth, users, and search endpoints. It is a Node-compatible application that composes route handlers, controllers, shared contracts, database access, and CORS middleware.

## What This Project Contains

- Server bootstrap and request handling in `src/server.ts` and `src/index.ts`
- Route maps in `src/routes`
- Endpoint controllers in `src/controllers`
- Shared Prisma client wiring in `src/db.ts`
- Middleware, request parsing utilities, and API-specific types in `src/middleware`, `src/utils`, and `src/types`

## Features

- JWT-based sign-in and authentication checks
- User listing and user detail endpoints
- Search endpoint backed by database full-text search tables
- Shared DTOs and search contracts via `@ds/contracts`
- Shared runtime helpers via `@ds/utils`
- Shared data access and enums via `@ds/db`

## Environment

The app expects values from two local env files:

- `../../packages/db/.env.local` for `DATABASE_URL`
- `apps/api/.env.local` for API-specific configuration

Key variables:

- `ACCESS_TOKEN_SECRET` - JWT signing secret
- `PORT` - API port, defaults to `4000`
- `NODE_ENV` - runtime mode
- `CORS_ORIGIN` - optional CORS allowlist origin

## Endpoints

### Auth

- `POST /auth/signin`
- `POST /auth/signout`
- `GET /auth/authenticated`

### Users

- `GET /users`
- `GET /users/:id`

### Search

- `POST /search`

If no route matches, the server returns a `404` JSON response and still applies CORS headers.

## Development

Run from the workspace root:

```bash
bun --filter @ds/api dev
```

Useful scripts:

- `bun --filter @ds/api typecheck`
- `bun --filter @ds/api build`
- `bun --filter @ds/api preview`

## Example Requests

Sign in:

```bash
curl -X POST http://localhost:4000/auth/signin \
  -H "content-type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'
```

Run a search:

```bash
curl -X POST http://localhost:4000/search \
  -H "content-type: application/json" \
  -d '{"query":"john","highlightStartTag":"<mark>","highlightEndTag":"</mark>"}'
```

## Related Projects

- [workspace](../../README.md)
- [contracts](../../packages/contracts/README.md)
- [db](../../packages/db/README.md)
- [utils](../../packages/utils/README.md)
- [demo](../demo/README.md)
