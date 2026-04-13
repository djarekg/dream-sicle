import { FocusMonitor } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  resource,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_FORM_FIELD, MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';

import { StateService } from '@/core/services/state.service.js';

type ValueType = string | null;

@Component({
  selector: 'app-state-select',
  imports: [FormsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './state-select.html',
  providers: [{ provide: MatFormFieldControl, useExisting: StateSelect }],
})
export class StateSelect
  implements ControlValueAccessor, MatFormFieldControl<ValueType>, OnDestroy
{
  static nextId = 0;
  readonly #stateService = inject(StateService);
  readonly stateIdSelect = viewChild.required(MatSelect);
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly parts = new FormGroup({
    stateId: new FormControl<ValueType>(null),
  });
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'app-state-select';
  readonly id = `app-state-select-${StateSelect.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<ValueType>(null, { alias: 'value' });

  onChange: (_: ValueType) => void = () => {};
  onTouched = () => {};

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  protected readonly statesResource = resource({
    loader: () => this.#stateService.getStates(),
  });

  readonly #focused = signal(false);
  readonly #disabledByCva = signal(false);
  readonly #disabled = computed(() => this._disabledByInput() || this.#disabledByCva());
  readonly #focusMonitor = inject(FocusMonitor);
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this.#focused();
  }

  get empty() {
    const { value: { stateId = null } = {} } = this.parts!;
    return !stateId;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }
  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this.#disabled();
  }

  get value(): ValueType {
    return this._value();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched();
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this.#disabled();
      this.#focused();
      // Propagate state changes.
      untracked(() => this.stateChanges.next());
    });

    effect(() => {
      if (this.#disabled()) {
        untracked(() => this.parts.disable({ emitEvent: false }));
      } else {
        untracked(() => this.parts.enable({ emitEvent: false }));
      }
    });

    effect(() => {
      const value = this._value();
      untracked(() => this.parts.setValue({ stateId: value }));
    });

    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      // const value = this.parts.valid
      //   ? this.parts.value.stateId || null
      //   : null;
      const value = this.parts.controls.stateId.value;
      this.#updateValue(value);
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.#focusMonitor.stopMonitoring(this.#elementRef);
  }

  onFocusIn() {
    if (!this.#focused()) {
      this.#focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this.#elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched.set(true);
      this.#focused.set(false);
      this.onTouched();
    }
  }

  onContainerClick() {
    this.#focusMonitor.focusVia(this.stateIdSelect()._elementRef, 'program');
  }

  writeValue(value: ValueType): void {
    this.#updateValue(value);
  }

  registerOnChange(fn: (value: ValueType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDescribedByIds(ids: string[]) {
    if (ids.length) {
      this.#elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this.#elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabledByCva.set(isDisabled);
  }

  protected handleSelectionChange({ value }: MatSelectChange): void {
    this.onChange(value);
  }

  #updateValue(value: ValueType) {
    const current = this._value();

    if (current === value) {
      return;
    }

    this._value.set(value);
  }
}
