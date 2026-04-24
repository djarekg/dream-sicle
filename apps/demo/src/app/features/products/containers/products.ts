import { ProductTypeSelect } from '@/components/select';
import { ViewMode } from '@/core/constants/view-mode';
import { ProductTable } from '@/features/products/components/product-table/product-table';
import { ProductService } from '@/features/products/services/product.service';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Gender, ProductType } from '@ds/contracts';
import { ProductCards } from '../components/product-cards/product-cards';

@Component({
  selector: 'app-products',
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    ProductTypeSelect,
    ProductCards,
    ProductTable,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export default class Products {
  readonly #service = inject(ProductService);
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getProducts(),
  });

  protected readonly selectedViewMode = signal<ViewMode>(ViewMode.cards);
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
