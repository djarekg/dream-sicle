import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNotEmpty } from '@ds/utils';

import { Spinner } from '@/components/spinner/spinner.component';
import { ProductDetail } from '@/features/products/components/product-detail/product-detail.component';
import { ProductService } from '@/features/products/services/product.service';

@Component({
  selector: 'app-product',
  imports: [Spinner, ProductDetail],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export default class Product {
  readonly #route = inject(ActivatedRoute);
  readonly #service = inject(ProductService);
  readonly #productId = signal<string | null>(null);

  protected readonly resource = resource({
    params: () => this.#productId(),
    loader: ({ params: id }) => {
      if (isNotEmpty(id)) {
        return this.#service.getProduct(id);
      }
      return Promise.resolve(null);
    },
  });

  constructor() {
    this.#route.paramMap.subscribe(params => {
      this.#productId.set(params.get('id'));
    });
  }
}
