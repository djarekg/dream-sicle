import type { SortableColumn, SortState } from '@/core/types';
import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, input, linkedSignal, signal } from '@angular/core';
import { ProductDto } from '@ds/contracts';

@Component({
  selector: 'app-product-table',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
})
export class ProductTable {
  readonly #defaultSortState: SortState = {
    direction: null,
    column: null,
  };

  readonly products = input<ProductDto[]>([]);
  readonly #sortState = signal<SortState>(this.#defaultSortState);

  protected readonly productsSorted = linkedSignal<ProductDto[]>(() =>
    this.#sortProducts(this.products(), this.#sortState()),
  );

  protected sortByName() {
    this.#updateSortState('name');
  }

  protected sortByDescription() {
    this.#updateSortState('description');
  }

  protected sortByType() {
    this.#updateSortState('productType');
  }

  protected sortByPrice() {
    this.#updateSortState('price');
  }

  protected sortByGender() {
    this.#updateSortState('gender');
  }

  /**
   * Updates the sort state based on the selected column. If the same column is
   * selected again, it toggles the sort direction.
   *
   * @param column The column to sort by.
   */
  #updateSortState(column: SortableColumn) {
    this.#sortState.update(state => {
      if (state.column !== column) {
        return {
          direction: 'asc',
          column,
        };
      }

      return {
        direction: state.direction === 'asc' ? 'desc' : 'asc',
        column,
      };
    });
  }

  /**
   * Sorts the products based on the current sort state. If no sorting is applied,
   * it returns the products in their original order.
   *
   * @param products The list of products to sort.
   * @param state The current sort state.
   * @returns The sorted list of products.
   */
  #sortProducts(products: ProductDto[], state: SortState) {
    if (state.direction === null || state.column === null) return [...products];

    const { direction, column } = state;

    return [...products].sort((left, right) => {
      const leftValue = left[column];
      const rightValue = right[column];
      const comparison = leftValue.localeCompare(rightValue);
      return direction === 'asc' ? comparison : -comparison;
    });
  }
}
