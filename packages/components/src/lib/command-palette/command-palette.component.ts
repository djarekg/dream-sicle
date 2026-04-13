import { Component, input, model, output, viewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

import { SafeHtmlPipe } from '../../../../core/src/lib/pipes/safe-html.pipe';
import type { CommandItem } from './command-item';

@Component({
  selector: 'ds-command-palette',
  imports: [MatIconModule, MatListModule, RouterLink, SafeHtmlPipe],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
})
export class CommandPalette {
  // #keyManager: FocusKeyManager

  readonly open = input.required<boolean>();
  readonly items = input.required<CommandItem[]>();
  readonly query = model('');
  readonly close = output();

  protected readonly listItems = viewChildren(MatListItem);

  // constructor() {
  //   afterNextRender(() => {

  //   });
  // }

  protected onInputKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
  }

  protected onInput(value: string) {
    this.query.set(value);
  }

  protected onClosed() {
    this.close.emit();
  }
}
