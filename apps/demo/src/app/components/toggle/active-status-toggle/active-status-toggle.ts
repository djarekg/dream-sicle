import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

export type ActiveFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

@Component({
  selector: 'app-active-status-toggle',
  imports: [MatButtonToggleModule, MatTooltipModule],
  templateUrl: './active-status-toggle.html',
  styleUrl: './active-status-toggle.css',
})
export class ActiveStatusToggle implements FormValueControl<ActiveFilter> {
  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly value = model<ActiveFilter>('ALL');
}
