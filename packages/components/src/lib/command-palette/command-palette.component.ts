import { Component, input, model, output } from '@angular/core';

import type { CommandItem } from './command-item';

@Component({
  selector: 'ds-command-palette',
  imports: [],
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.css'],
})
export class CommandPalette {
  readonly open = input.required<boolean>();
  readonly items = input.required<CommandItem[]>();
  readonly query = model('');
  readonly close = output();

  protected onInput(value: string) {
    this.query.set(value);
  }

  protected onClosed() {
    this.close.emit();
  }
}
