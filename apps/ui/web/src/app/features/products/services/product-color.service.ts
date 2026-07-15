import { ApiService } from '@/core/api/api.service';
import { inject, Service } from '@angular/core';

export interface ProductColorDto {
  id: string;
  productId: string;
  color: string;
  [key: string]: any;
}

export interface ProductColorCreateModel {
  productId: string;
  color: string;
  [key: string]: any;
}

export interface ProductColorUpdateModel {
  id: string;
  productId: string;
  color: string;
  [key: string]: any;
}

@Service()
export class ProductColorService {
  readonly #api = inject(ApiService);

  getColor = (id: string) => this.#api.get<ProductColorDto>(`/product-colors/${id}`);
  getColors = () => this.#api.get<ProductColorDto[]>('/product-colors');
  createColor = (color: ProductColorCreateModel) =>
    this.#api.post<ProductColorCreateModel, ProductColorDto>('/product-colors', color);
  updateColor = (color: ProductColorUpdateModel) =>
    this.#api.put<ProductColorUpdateModel, ProductColorDto>(`/product-colors/${color.id}`, color);
  deleteColor = (id: string) => this.#api.delete<void>(`/product-colors/${id}`);
}
