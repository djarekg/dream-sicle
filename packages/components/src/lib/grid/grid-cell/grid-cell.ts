import { GridCellWidget } from '@angular/aria/grid';
import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ds-grid-cell',
  imports: [GridCellWidget, MatIconModule, MatTooltipModule],
  templateUrl: './grid-cell.html',
  styleUrl: './grid-cell.css',
})
export class GridCell {
  readonly field = input<string>('');
  readonly value = input<string>('');
  readonly edit = output<string>();

  protected readonly changedValue = signal<string>(this.value());
  protected readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  protected onClickEdit(widget: GridCellWidget) {
    if (widget.isActivated()) return;

    widget.activate();
    setTimeout(() => this.startInlineEdit(undefined));
  }

  protected onInputBlur(value: string, widget: GridCellWidget) {
    this.changedValue.set(value);
    widget.deactivate();
    this.completeInlineEdit(undefined);
  }

  protected startInlineEdit(e: KeyboardEvent | FocusEvent | undefined) {
    this.input()?.nativeElement.focus();

    if (!(e instanceof KeyboardEvent)) return;

    // // Start editing with an alphanumeric character.'
    // if (e.key.length === 1) {
    //   this.changedValue.set(e.key);
    // }
  }

  protected completeInlineEdit(e: Event | undefined) {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;

    this.edit.emit(this.changedValue());
  }
}
