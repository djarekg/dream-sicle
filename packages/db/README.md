# @ds/db

Internal Prisma-powered data package for the dream-sicle workspace.

`@ds/db` is the workspace source of truth for schema, generated Prisma types, database client creation, and seed data. It is a private internal package used mainly by the API and other data-aware workspace code.

## What This Package Contains

- Prisma schema and migrations under `prisma/`
- Seed scripts under `prisma/seed`
- Prisma client factory in `src/client`
- Generated Prisma client, enums, and model types in `src/generated/prisma`
- Search constants and shared DB-facing types in `src/constants` and `src/types`
- Internal hash helpers in `src/crypto`

## Features

- Local SQLite-backed development workflow
- Generated Prisma client and model types checked into the package boundary
- Shared database enums and search-related types
- Repeatable seed process for local development and testing

## Public API

- `createPrismaClient(options?)`
- `PrismaClientFactoryOptions`
- `compareHash()`
- `generateHash()`
- `SearchResultTypes`
- `SearchResultType`
- Generated Prisma enums such as `Role`, `Gender`, `Color`, `ProductType`, and `Size`
- Generated Prisma model types and search-related types from `src/types`

## Setup

Create `.env.local` in this package with a `DATABASE_URL` value.

Example:

```env
DATABASE_URL="file:./dev.db"
```

Then run the full database workflow from `packages/db`:

```bash
bun run db
```

That workflow will:

1. Remove the local database and migrations output used for fast iteration.
2. Generate the Prisma client.
3. Create and apply the initial migration.
4. Seed the database with test data.

## Scripts

- `bun run db:clean` - remove `dev.db` and local migrations
- `bun run db:generate` - generate Prisma client code
- `bun run db:migrate` - run `prisma migrate dev --name init`
- `bun run db:seed` - run the seed entry point with `.env.local`
- `bun run db` - run the full local reset, generate, migrate, and seed flow

## Example

```ts
import { createPrismaClient } from '@ds/db';

const prisma = createPrismaClient({
  url: 'file:./dev.db',
});

const users = await prisma.user.findMany();
console.log(users.length);
```

## Notes

- This package is internal to the workspace and is not intended for external publishing.
- The current schema includes users, credentials, customers, contacts, products, inventory, sales, and supporting enums.

## Related Projects

- [workspace](../../README.md)
- [api](../../apps/api/README.md)
- [contracts](../contracts/README.md)
