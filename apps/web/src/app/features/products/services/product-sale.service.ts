import { ApiService } from '@/core/api/api.service';
import { inject, Service } from '@angular/core';

export interface ProductSaleDto {
  id: string;
  productId: string;
  customerId: string;
  userId: string;
  saleDate: string;
  quantity: number;
  amount: number;
  [key: string]: any;
}

export interface ProductSaleCreateModel {
  productId: string;
  customerId: string;
  userId: string;
  saleDate: string;
  quantity: number;
  amount: number;
  [key: string]: any;
}

export interface ProductSaleUpdateModel {
  id: string;
  productId: string;
  customerId: string;
  userId: string;
  saleDate: string;
  quantity: number;
  amount: number;
  [key: string]: any;
}

@Service()
export class ProductSaleService {
  readonly #api = inject(ApiService);

  getSale = (id: string) => this.#api.get<ProductSaleDto>(`/product-sales/${id}`);
  getSales = () => this.#api.get<ProductSaleDto[]>('/product-sales');
  createSale = (sale: ProductSaleCreateModel) =>
    this.#api.post<ProductSaleCreateModel, ProductSaleDto>('/product-sales', sale);
  updateSale = (sale: ProductSaleUpdateModel) =>
    this.#api.put<ProductSaleUpdateModel, ProductSaleDto>(`/product-sales/${sale.id}`, sale);
  deleteSale = (id: string) => this.#api.delete<void>(`/product-sales/${id}`);
}
