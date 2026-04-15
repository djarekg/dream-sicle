import { Listbox, Option } from '@angular/aria/listbox';
import { Component, effect, type ElementRef, input, model, output, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '@ds/core';
import type { CommandItem } from './command-item';

@Component({
  selector: 'ds-command-palette',
  imports: [Listbox, MatIconModule, Option, RouterLink, SafeHtmlPipe],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.css',
})
export class CommandPalette {
  readonly open = input.required<boolean>();
  // readonly items = input<CommandItem[]>();
  readonly items = model<CommandItem[]>();
  readonly query = model('');
  readonly close = output();

  protected readonly input = viewChild<ElementRef<HTMLElement>>('search');
  protected readonly listbox = viewChild(Listbox);

  constructor() {
    effect(() => {
      if (this.open()) {
        queueMicrotask(() => {
          this.input()?.nativeElement.focus();
        });
      } else {
        this.#reset();
      }
    });
  }

  protected onInputKeydown(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      // TODO: This is not ideal. The first time is active by default and what this does is
      // set focus to that first item no matter what navigation key is pressed.
      // Ideally, we would want to navigate according to the key pressed, but the current
      // implementation of the listbox does not allow for that. Need to explore options
      // for improving the listbox to support this behavior.
      this.listbox()?.gotoFirst();
    }
  }

  protected onInput(value: string) {
    this.query.set(value);
  }

  protected trapEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this.closeDialog();
    }
  }

  protected closeDialog() {
    this.close.emit();
    this.#reset();
  }

  #reset() {
    this.query.set('');
    this.items.set(undefined);
  }
}
