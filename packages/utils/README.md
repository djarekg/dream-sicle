# @ds/utils

Shared utility functions and types for dream-sicle packages and applications.

This package centralizes common helpers for date/string/number formatting,
environment checks, object guards, and runtime assertions.

## Installation

```bash
pnpm add @ds/utils
```

## Exports

### Date

- `formatDate(date: Date): string`

### Environment

- `isBrowser`
- `isWebWorker`
- `isServer`

### Number

- `randomInRange(min: number, max: number): number`

### Object and Value Checks

- `isNullOrUndefined`
- `isNotNullOrUndefined`
- `isEmpty`
- `isNotEmpty`

### String

- `isNullOrEmpty`
- `format(template, ...args)`

### Types

- `PlainObject`
- `TypedEvent`

### Assertions

- `assertIsNotEmpty`
- `assertIsNotNull`

## Usage

```ts
import {
  formatDate,
  isEmpty,
  randomInRange,
  type PlainObject,
} from '@ds/utils';

const payload: PlainObject = { page: 1, q: 'users' };

if (!isEmpty(payload.q)) {
  console.log(formatDate(new Date()), randomInRange(1, 10));
}
```

## Scripts

- `pnpm --filter @ds/utils build`
- `pnpm --filter @ds/utils dev`
- `pnpm --filter @ds/utils test`
- `pnpm --filter @ds/utils check`
