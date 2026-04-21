import { TitleCasePipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  type WithOptionalFieldTree,
} from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { Gender } from '@ds/contracts';

type ValueType = Gender | undefined;

@Component({
  selector: 'app-gender-select',
  imports: [MatSelectModule, TitleCasePipe],
  templateUrl: './gender-select.html',
  styleUrl: './gender-select.css',
})
export class GenderSelect implements FormValueControl<ValueType> {
  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly value = model<ValueType>(undefined);

  protected readonly genders = Gender;

  onChange(value: Gender) {
    this.value.set(value);
  }
}
