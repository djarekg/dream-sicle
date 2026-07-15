# @dream-sicle/core

Shared Angular runtime helpers for the dream-sicle workspace.

`@dream-sicle/core` is a small Angular library that holds cross-cutting framework helpers which do not belong in a specific feature package. It currently focuses on platform detection utilities used by SSR-aware components and layouts.

## What This Package Contains

- Public library entry points in `src/index.ts` and `src/public-api.ts`
- Shared utilities under `src/lib/utils`
- Platform detection helpers in `src/lib/utils/platform.ts`

## Public API

- `isBrowser()`
- `isServer()`

## Features

- Central place for Angular-specific runtime helpers
- Works with browser and server rendering contexts
- Keeps app and component packages from reimplementing platform checks

## Example

Use the helpers inside an Angular injection context:

```ts
import { Component, signal } from '@angular/core';
import { isBrowser } from '@dream-sicle/core';

@Component({
  selector: 'app-example',
  template: `
    @if (runningInBrowser()) {
      <p>Browser only</p>
    }
  `,
})
export class ExampleComponent {
  protected readonly runningInBrowser = signal(isBrowser());
}
```

## Development

Run from the workspace root:

- `bun exec ng build @dream-sicle/core`
- `bun exec ng test @dream-sicle/core`

## Related Projects

- [workspace](../../README.md)
- [demo](../../../apps/ui/web/README.md)
- [components](../components/README.md)
