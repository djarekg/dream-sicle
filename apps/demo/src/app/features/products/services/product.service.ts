import { inject, Injectable } from '@angular/core';
import type { ProductDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly #api = inject(ApiService);

  getProduct = (id: string) => this.#api.get<ProductDto>(`/products/${id}`);
  getProducts = () => this.#api.get<ProductDto[]>('/products');
}
