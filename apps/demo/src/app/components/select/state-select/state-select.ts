import { Component, computed, inject, input, model, resource } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { StateService } from '@/core/services/state.service.js';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

type ValueType = string | null;

@Component({
  selector: 'app-state-select',
  imports: [MatSelectModule],
  templateUrl: './state-select.html',
  providers: [{ provide: MatFormFieldControl, useExisting: StateSelect }],
})
export class StateSelect implements FormValueControl<ValueType> {
  readonly #service = inject(StateService);
  readonly #resource = resource({
    loader: () => this.#service.getStates(),
  });

  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly multiple = input(false, { transform: value => coerceBooleanProperty(value) });
  readonly value = model<ValueType>(null);

  protected readonly states = computed(() => this.#resource.value());

  onChange(value: string) {
    this.value.set(value);
  }
}
