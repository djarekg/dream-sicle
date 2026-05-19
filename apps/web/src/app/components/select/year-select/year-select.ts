import { StateSelect } from '@/components/select/state-select/state-select';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, computed, input, model } from '@angular/core';
import type { ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const START_YEAR_DEFAULT = 2000;

@Component({
  selector: 'app-year-select',
  imports: [MatSelectModule],
  templateUrl: './year-select.html',
  providers: [{ provide: MatFormFieldControl, useExisting: StateSelect }],
})
export class YearSelect {
  readonly start = input(START_YEAR_DEFAULT);
  readonly end = input(new Date().getFullYear());

  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly multiple = input(false, { transform: value => coerceBooleanProperty(value) });
  readonly value = model<number | null>(null);

  protected readonly years = computed(() => {
    const years = [];
    for (let year = this.start(); year <= this.end(); year++) {
      years.push(year);
    }
    return years;
  });

  onChange(value: string) {
    this.value.set(Number(value));
  }
}
