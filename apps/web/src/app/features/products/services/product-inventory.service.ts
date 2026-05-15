import { ApiService } from '@/core/api/api.service';
import { inject, Service } from '@angular/core';

export interface ProductInventoryDto {
  id: string;
  productId: string;
  quantity: number;
  [key: string]: any;
}

export interface ProductInventoryCreateModel {
  productId: string;
  quantity: number;
  [key: string]: any;
}

export interface ProductInventoryUpdateModel {
  id: string;
  productId: string;
  quantity: number;
  [key: string]: any;
}

@Service()
export class ProductInventoryService {
  readonly #api = inject(ApiService);

  getInventory = (id: string) => this.#api.get<ProductInventoryDto>(`/product-inventories/${id}`);
  getInventories = () => this.#api.get<ProductInventoryDto[]>('/product-inventories');
  createInventory = (inventory: ProductInventoryCreateModel) =>
    this.#api.post<ProductInventoryCreateModel, ProductInventoryDto>(
      '/product-inventories',
      inventory,
    );
  updateInventory = (inventory: ProductInventoryUpdateModel) =>
    this.#api.put<ProductInventoryUpdateModel, ProductInventoryDto>(
      `/product-inventories/${inventory.id}`,
      inventory,
    );
  deleteInventory = (id: string) => this.#api.delete<void>(`/product-inventories/${id}`);
}
