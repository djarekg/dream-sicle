# @dream-sicle/contracts

Shared API request and response contracts for dream-sicle applications.

`@dream-sicle/contracts` defines client-safe types that can be imported by browser and server projects without exposing database model details or ORM-specific implementation choices.

## What This Package Contains

- Gender enum values and types in `src/gender.ts`
- Search request and response contracts in `src/search.ts`
- User DTO shape in `src/user.ts`
- Consolidated public entry point in `src/index.ts`

## Public API

- `Genders`
- `Gender`
- `SearchResultTypes`
- `SearchResultType`
- `SearchResultParams`
- `SearchResult`
- `UserDto`

## Features

- Keeps browser and server payloads aligned
- Prevents clients from depending on Prisma-generated model types
- Provides a small, focused surface for API-safe shared types
- Works in both the Angular app and the internal API

## Example

```ts
import {
  Genders,
  SearchResultTypes,
  type SearchResultParams,
  type UserDto,
} from '@dream-sicle/contracts';

const query: SearchResultParams = {
  query: 'john',
  highlightStartTag: '<mark>',
  highlightEndTag: '</mark>',
};

const renderUser = (user: UserDto) => {
  return `${user.firstName} ${user.lastName} (${user.gender ?? Genders.male})`;
};

console.log(SearchResultTypes.user, query, renderUser);
```

## Development

Run from the workspace root:

- `bun --filter @dream-sicle/contracts build`
- `bun --filter @dream-sicle/contracts dev`
- `bun --filter @dream-sicle/contracts test`
- `bun --filter @dream-sicle/contracts check`

## Related Projects

- [workspace](../../README.md)
- [api](../../apps/api/README.md)
- [demo](../../apps/web/README.md)
- [db](../db/README.md)
