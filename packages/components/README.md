# @ds/components

Shared Angular UI components for the dream-sicle workspace.

`@ds/components` contains reusable presentation components that can be consumed by workspace applications. The package currently exposes the command palette component used by the demo app's protected layout.

## What This Package Contains

- Public library entry points in `src/index.ts` and `src/public-api.ts`
- Reusable component implementations under `src/lib`
- Command palette component files under `src/lib/command-palette`

## Public API

- `CommandPalette`

## Features

- Shared Angular UI surface for workspace applications
- OnPush change detection by default for exported components
- Simple package boundary for growing shared UI outside the app codebase

## Example

```ts
import { Component } from '@angular/core';
import { CommandPalette } from '@ds/components';

@Component({
  selector: 'app-example',
  imports: [CommandPalette],
  template: `<ds-command-palette />`,
})
export class ExampleComponent {}
```

## Development

Run from the workspace root:

- `bun exec ng build @ds/components`
- `bun exec ng test @ds/components`

## Related Projects

- [workspace](../../README.md)
- [demo](../../apps/demo/README.md)
- [core](../core/README.md)
