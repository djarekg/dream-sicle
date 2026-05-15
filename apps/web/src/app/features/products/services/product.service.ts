import { inject, Service } from '@angular/core';

import { ApiService } from '@/core/api/api.service';
import type { ProductDto } from '@/features/products/models/product.model';

@Service()
export class ProductService {
  readonly #api = inject(ApiService);

  getProduct = (id: string) => this.#api.get<ProductDto>(`/products/${id}`);
  getProducts = () => this.#api.get<ProductDto[]>('/products');
  createProduct = (product: ProductDto) =>
    this.#api.post<ProductDto, ProductDto>('/products', product);
  updateProduct = (product: ProductDto) =>
    this.#api.put<ProductDto, ProductDto>(`/products/${product.id}`, product);
  deleteProduct = (id: string) => this.#api.delete<ProductDto>(`/products/${id}`);
}
