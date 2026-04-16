import { Listbox, Option } from '@angular/aria/listbox';
import { Component, effect, type ElementRef, input, model, output, viewChild } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '@ds/core';
import type { CommandItem } from './command-item';

@Component({
  selector: 'ds-command-palette',
  imports: [Listbox, MatChipsModule, MatIconModule, Option, RouterLink, SafeHtmlPipe],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.css',
})
export class CommandPalette {
  readonly open = input.required<boolean>();
  readonly items = model<CommandItem[]>();
  readonly query = model('');
  readonly close = output();

  protected readonly input = viewChild<ElementRef<HTMLElement>>('search');
  protected readonly listbox = viewChild(Listbox);

  constructor() {
    effect(() => {
      if (this.open()) {
        queueMicrotask(() => {
          // Focus the input after the dialog has opened. The input element has an autofocus
          // attribute, but that doesn't work when the dialog is opened programmatically.
          // This ensures that the input is focused regardless of how the dialog is opened.
          this.input()?.nativeElement.focus();
        });
      } else {
        // If the dialog is closed programmatically, reset the state of the command palette.
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

  /**
   * Trap the escape key and manually close the dialog.
   *
   * Because we are using open state to control the visibility of the dialog, pressing the
   * escape key to close the dialog does not trigger the (close) event of the dialog. We
   * use the close event to reset the state of the command palette and emit the close output.
   */
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

  /**
   * Reset the state of the command palette.
   */
  #reset() {
    this.query.set('');
    this.items.set(undefined);
  }
}
