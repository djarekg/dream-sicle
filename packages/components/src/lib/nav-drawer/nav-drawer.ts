import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ds-nav-drawer',
  imports: [],
  templateUrl: './nav-drawer.html',
  styleUrl: './nav-drawer.css',
})
export class NavDrawer {
  readonly headline = input<string>();
  readonly opened = input.required<boolean>();
  readonly close = output<void>();

  protected onScrimClick() {
    this.close.emit();
  }
}
