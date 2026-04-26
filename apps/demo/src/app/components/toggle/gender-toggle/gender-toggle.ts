import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Gender } from '@ds/contracts';

export type GenderFilter = Gender | 'ALL';

@Component({
  selector: 'app-gender-toggle',
  imports: [MatButtonToggleModule, MatTooltipModule],
  templateUrl: './gender-toggle.html',
  styleUrl: './gender-toggle.css',
})
export class GenderToggle implements FormValueControl<GenderFilter> {
  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly value = model<GenderFilter>('ALL');
}
