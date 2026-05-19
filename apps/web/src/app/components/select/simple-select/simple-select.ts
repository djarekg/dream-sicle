import { StateSelect } from '@/components/select/state-select/state-select';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, input, model } from '@angular/core';
import { type ValidationError, type WithOptionalFieldTree } from '@angular/forms/signals';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

type ValueType = unknown;

@Component({
  selector: 'app-simple-select',
  imports: [MatSelectModule],
  templateUrl: './simple-select.html',
  providers: [{ provide: MatFormFieldControl, useExisting: StateSelect }],
})
export class SimpleSelect {
  readonly label = input<string | undefined>();
  readonly data = input.required<ReadonlyArray<ValueType>>();

  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly multiple = input(false, { transform: value => coerceBooleanProperty(value) });
  readonly value = model<unknown | null>(null);

  onChange(value: string) {
    this.value.set(value);
  }
}
