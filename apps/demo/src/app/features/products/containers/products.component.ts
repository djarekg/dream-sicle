import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Gender, ProductType } from '@ds/contracts';

import { ProductTypeSelect } from '@/components/select';
import { ProductList } from '@/features/products/components/product-list/product-list.component';
import { ProductService } from '@/features/products/services/product.service';

@Component({
  selector: 'app-products',
  imports: [MatButtonToggleModule, MatToolbarModule, ProductTypeSelect, ProductList],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly #service = inject(ProductService);
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getProducts(),
  });

  protected readonly selectedType = signal<ProductType | null>(null);
  protected readonly selectedActive = signal<'ACTIVE' | 'INACTIVE' | 'ALL'>('ALL');
  protected readonly selectedGender = signal<Gender | 'ALL'>('ALL');

  protected readonly products = computed(() => {
    const value = this.#resource.value();

    const selectedActive = this.selectedActive();
    const activeFiltered = value.filter(product => {
      if (selectedActive === 'ALL') return true;
      return selectedActive === 'ACTIVE' ? product.isActive : !product.isActive;
    });

    const selectedGender = this.selectedGender();
    const genderFiltered =
      selectedGender === 'ALL'
        ? activeFiltered
        : activeFiltered.filter(product => product.gender === selectedGender);

    const type = this.selectedType();
    if (!type) return genderFiltered;
    return genderFiltered.filter(product => product.productType === type);
  });

  protected get isLoading() {
    return this.#resource.isLoading;
  }

  protected onTypeChange(value: ProductType | ProductType[] | null) {
    this.selectedType.set(Array.isArray(value) ? null : value);
  }
}
