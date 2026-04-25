import { ProductTypeSelect } from '@/components/select';
import { ViewMode } from '@/core/constants/view-mode';
import { ProductTable } from '@/features/products/components/product-table/product-table';
import { ProductService } from '@/features/products/services/product.service';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender, ProductType } from '@ds/contracts';
import { ProductCards } from '../components/product-cards/product-cards';

/** Parses the view mode from the query parameter. */
const parseViewMode = (view: string | null): ViewMode => {
  return view === ViewMode.table ? ViewMode.table : ViewMode.cards;
};

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
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #service = inject(ProductService);
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getProducts(),
  });

  protected readonly selectedViewMode = signal<ViewMode>(
    parseViewMode(this.#route.snapshot.queryParamMap.get('view')),
  );
  protected readonly selectedType = signal<ProductType | null>(null);
  protected readonly selectedActive = signal<'ACTIVE' | 'INACTIVE' | 'ALL'>('ALL');
  protected readonly selectedGender = signal<Gender | 'ALL'>('ALL');

  protected readonly products = computed(() => {
    const value = this.#resource.value();

    // Filter by active status
    const selectedActive = this.selectedActive();
    const activeFiltered = value.filter(product => {
      if (selectedActive === 'ALL') return true;
      return selectedActive === 'ACTIVE' ? product.isActive : !product.isActive;
    });

    // Filter by gender
    const selectedGender = this.selectedGender();
    const genderFiltered =
      selectedGender === 'ALL'
        ? activeFiltered
        : activeFiltered.filter(product => product.gender === selectedGender);

    // Filter by product type
    const type = this.selectedType();
    if (!type) return genderFiltered;
    return genderFiltered.filter(product => product.productType === type);
  });

  protected onTypeChange(value: ProductType | ProductType[] | null) {
    this.selectedType.set(Array.isArray(value) ? null : value);
  }

  protected onViewModeChange(view: ViewMode) {
    if (view === this.selectedViewMode()) {
      return;
    }

    this.selectedViewMode.set(view);

    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams: { view },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
