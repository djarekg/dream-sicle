import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TitleCasePipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { ProductType } from '@ds/contracts';

export type ProductTypeSelectType = ProductType | ProductType[] | null;

@Component({
  selector: 'app-product-type-select',
  imports: [MatSelectModule, TitleCasePipe],
  templateUrl: './product-type-select.html',
  styleUrl: './product-type-select.css',
})
export class ProductTypeSelect implements FormValueControl<ProductTypeSelectType> {
  readonly value = model<ProductTypeSelectType>(null);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly multiple = input(false, { transform: value => coerceBooleanProperty(value) });

  protected readonly productTypes = ProductType;

  onChange(value: ProductTypeSelectType) {
    this.value.set(value);
  }
}
