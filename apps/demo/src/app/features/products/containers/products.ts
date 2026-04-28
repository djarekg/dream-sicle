import { ProductTypeSelect } from '@/components/select';
import {
  ActiveStatusToggle,
  GenderToggle,
  ViewToggle,
  type ActiveFilter,
  type GenderFilter,
} from '@/components/toggle';
import { ViewMode } from '@/core/constants/view-mode';
import { ProductTable } from '@/features/products/components/product-table/product-table';
import { ProductService } from '@/features/products/services/product.service';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType, type ProductDto } from '@ds/contracts';
import { ProductCards } from '../components/product-cards/product-cards';

/** Parses the view mode from the query parameter. */
const parseViewMode = (view: string | null): ViewMode => {
  return view === ViewMode.table ? ViewMode.table : ViewMode.cards;
};

type ProductFilters = {
  selectedActive: ActiveFilter;
  selectedGender: GenderFilter;
  selectedTypes: ReadonlySet<ProductType> | null;
};

@Component({
  selector: 'app-products',
  imports: [
    ActiveStatusToggle,
    GenderToggle,
    ViewToggle,
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
  protected readonly selectedType = signal<ProductType | ProductType[] | null>(null);
  protected readonly selectedActive = signal<ActiveFilter>('ALL');
  protected readonly selectedGender = signal<GenderFilter>('ALL');

  protected readonly products = computed(() => {
    const filters = this.#getProductFilters();
    return this.#resource.value().filter(product => this.#matchesProductFilters(product, filters));
  });

  protected updateProduct(product: ProductDto) {
    this.#service.updateProduct(product);
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

  /** Builds the current filter state from signals. */
  #getProductFilters() {
    const selectedType = this.selectedType();
    const selectedTypes = !selectedType
      ? null
      : new Set(Array.isArray(selectedType) ? selectedType : [selectedType]);

    return {
      selectedActive: this.selectedActive(),
      selectedGender: this.selectedGender(),
      selectedTypes,
    } satisfies ProductFilters;
  }

  /** Returns true if the product passes all active/gender/type filters. */
  #matchesProductFilters(product: ProductDto, filters: ProductFilters) {
    const matchesActive =
      filters.selectedActive === 'ALL' ||
      (filters.selectedActive === 'ACTIVE' ? product.isActive : !product.isActive);

    const matchesGender =
      filters.selectedGender === 'ALL' || product.gender === filters.selectedGender;

    const matchesType = !filters.selectedTypes || filters.selectedTypes.has(product.productType);

    return matchesActive && matchesGender && matchesType;
  }
}
