---
applyTo: '**/*.html'
---

Use Angular built-in control flow syntax only.

Allowed template control flow:

- `@if`, `@else if`, `@else`
- `@for (...; track ... )`
- `@switch`, `@case`, `@default`
- `@defer` when appropriate

Do not suggest or generate legacy structural control flow:

- `*ngIf`
- `*ngFor`
- `*ngSwitch`, `*ngSwitchCase`, `*ngSwitchDefault`
- `ng-container` used as a structural-flow wrapper

When transforming existing templates, convert legacy structural flow to built-in control flow.

Examples:

Preferred:

```html
@if (commands().length) {
<ul>
  @for (cmd of commands(); track cmd.id) {
  <li>{{ cmd.label }}</li>
  }
</ul>
} @else {
<p>No commands found.</p>
}
```

Not allowed:

```html
<ul *ngIf="commands().length">
  <li *ngFor="let cmd of commands()">{{ cmd.label }}</li>
</ul>
```
