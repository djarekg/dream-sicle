import { inject, Service } from '@angular/core';
import type { ProductDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';

@Service()
export class ProductService {
  readonly #api = inject(ApiService);

  getProduct = (id: string) => this.#api.get<ProductDto>(`/products/${id}`);
  getProducts = () => this.#api.get<ProductDto[]>('/products');
  updateProduct = (product: ProductDto) =>
    this.#api.post<ProductDto, ProductDto>(`/products/${product.id}`, product);
}
