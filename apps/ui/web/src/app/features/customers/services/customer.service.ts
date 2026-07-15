import { inject, Service } from '@angular/core';

import { ApiService } from '@/core/api/api.service';
import type { CustomerUpdateModel } from '@/features/customers/models/customer-update';
import type { CustomerDto } from '@/features/customers/models/customer.model';

@Service()
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomer = (id: string) => this.#api.get<CustomerDto>(`/customers/${id}`);
  getCustomers = () => this.#api.get<CustomerDto[]>('/customers');
  createCustomer = (customer: CustomerUpdateModel) =>
    this.#api.post<CustomerUpdateModel, CustomerDto>('/customers', customer);
  updateCustomer = (customer: CustomerUpdateModel) =>
    this.#api.put<CustomerUpdateModel, CustomerDto>(`/customers/${customer.id}`, customer);
  deleteCustomer = (id: string) => this.#api.delete<CustomerDto>(`/customers/${id}`);
}
