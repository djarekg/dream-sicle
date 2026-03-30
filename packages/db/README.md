# @ds/db

Internal Prisma-powered data package for the dream-sicle workspace.

`@ds/db` is a private package used to define the database schema, generate Prisma types,
run migrations, and seed local test data. It exists to support data-related development in
other workspace projects, especially the API project planned for this repository.

## Purpose

- Keep the schema and generated Prisma client in one internal package
- Provide a repeatable local database workflow for testing data features
- Supply shared database enums and model types to other workspace packages
- Seed realistic local data so the future API project can be exercised quickly

This package is intended for internal workspace use only. It is marked `private` and is not
designed for external publishing.

## Database Stack

- Prisma ORM
- SQLite datasource for local development
- Generated Prisma client output in `src/generated/prisma`
- Seed scripts under `prisma/seed`

## Setup

Create a local environment file at `.env.local` in this package with a `DATABASE_URL` value.

Example:

```env
DATABASE_URL="file:./dev.db"
```

Then run the database workflow from this package directory:

```bash
pnpm run db
```

That command will:

1. Remove the local database and migrations output used for local iteration
2. Generate the Prisma client
3. Create and apply the initial migration
4. Seed the database with test data

## Scripts

- `pnpm run db:clean` - Removes `dev.db` and the local migrations folder
- `pnpm run db:generate` - Generates the Prisma client into `src/generated/prisma`
- `pnpm run db:migrate` - Runs `prisma migrate dev --name init`
- `pnpm run db:seed` - Executes the seed entry point with `.env.local`
- `pnpm run db` - Runs the full local reset, generate, migrate, and seed workflow

## Current Public Exports

The package currently exports:

- Generated Prisma enums
- Generated Prisma model types
- Shared search result constants and types used by the workspace

Current top-level entry point:

```ts
export * from './src/constants/index.ts';
export * from './src/generated/prisma/enums.ts';
export type * from './src/generated/prisma/models.ts';
export type * from './src/types/index.ts';
```

## Notes

- A local crypto helper exists in `src/crypto`, backed by `bcryptjs`, for credential-related
  internal usage.
- The current schema includes users, credentials, customers, contacts, products, inventory,
  sales, and supporting enums.
- As the API project is added, this package can remain the source of truth for schema,
  generated types, and seed data.
