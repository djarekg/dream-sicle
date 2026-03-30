# @ds/contracts

Shared API request/response contract types for dream-sicle applications.

This package defines client-safe DTOs that can be imported by browser and server
projects without coupling clients to database or ORM implementation details.

## Installation

```bash
pnpm add @ds/contracts
```

## Exports

- `UserDto`
- `Gender`
- `Genders`
- `SearchResult`
- `SearchResultParams`
- `SearchResultType`
- `SearchResultTypes`

## Usage

```ts
import type { UserDto } from '@ds/contracts';

const renderUser = (user: UserDto) => `${user.firstName} ${user.lastName}`;
```

## Scripts

- `pnpm --filter @ds/contracts build`
- `pnpm --filter @ds/contracts dev`
- `pnpm --filter @ds/contracts test`
- `pnpm --filter @ds/contracts check`
