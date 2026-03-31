import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'ds-nav-drawer',
  imports: [],
  templateUrl: './nav-drawer.component.html',
  styleUrl: './nav-drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavDrawer {
  readonly headline = input<string>();
  readonly opened = input.required<boolean>();
  readonly close = output<void>();

  protected onScrimClick() {
    this.close.emit();
  }
}
