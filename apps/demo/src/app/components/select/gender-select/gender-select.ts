import { TitleCasePipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  type WithOptionalFieldTree,
} from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { Gender } from '@ds/contracts';

@Component({
  selector: 'app-gender-select',
  imports: [MatSelectModule, TitleCasePipe],
  templateUrl: './gender-select.html',
  styleUrl: './gender-select.css',
})
export class GenderSelect implements FormValueControl<Gender | undefined> {
  readonly value = model<Gender | undefined>(undefined);
  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  protected readonly genders = Object.keys(Gender).map(key => {
    return {
      key,
      value: key,
    };
  });

  onChange(value: Gender) {
    this.value.set(value);
  }
}
