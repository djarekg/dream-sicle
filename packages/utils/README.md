# @ds/utils

Shared utility functions and lightweight types for dream-sicle packages and applications.

`@ds/utils` centralizes framework-agnostic helpers for cookies, formatting, environment checks, null and emptiness guards, URLs, validation, and common types.

## What This Package Contains

- Cookie helpers in `src/cookie.ts`
- Date, number, string, and formatting helpers in `src/date.ts`, `src/number.ts`, `src/string.ts`, and `src/format.ts`
- Environment guards in `src/environment.ts`
- Object and nullability guards in `src/object.ts`
- URL cleanup helpers in `src/url.ts`
- Debounce and validation helpers in `src/debounce.ts` and `src/validation`
- Shared types in `src/types`

## Public API

### Browser and Runtime Helpers

- `deleteCookie`
- `getCookie`
- `setCookie`
- `isBrowser`
- `isServer`
- `isWebWorker`

### Formatting and Value Helpers

- `formatDate`
- `formatPhoneNumber`
- `format`
- `randomInRange`
- `removeTrailingSlash`

### Guards and Validation

- `isEmpty`
- `isNotEmpty`
- `isNullOrUndefined`
- `isNotNullOrUndefined`
- `isNullOrEmpty`
- `assert`
- `debounce`

### Types

- `PlainObject`
- `TypedEvent`

## Features

- Keeps common logic out of app and API feature code
- Works across browser and server runtimes
- Small API surface with straightforward utility modules

## Example

```ts
import {
  formatDate,
  formatPhoneNumber,
  isEmpty,
  removeTrailingSlash,
  type PlainObject,
} from '@ds/utils';

const payload: PlainObject = { q: 'users', baseUrl: 'https://example.com/' };

if (!isEmpty(payload.q)) {
  console.log(formatDate(new Date()));
  console.log(formatPhoneNumber('5551234567'));
  console.log(removeTrailingSlash(String(payload.baseUrl)));
}
```

## Development

Run from the workspace root:

- `pnpm --filter @ds/utils build`
- `pnpm --filter @ds/utils dev`
- `pnpm --filter @ds/utils test`
- `pnpm --filter @ds/utils check`

## Related Projects

- [workspace](../../README.md)
- [api](../../apps/api/README.md)
- [demo](../../apps/demo/README.md)
