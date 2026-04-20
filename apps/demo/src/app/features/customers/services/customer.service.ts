import { inject, Injectable } from '@angular/core';
import type { CustomerDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';
import type { CustomerUpdateModel } from '@/features/customers/models/customer-update';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomer = (id: string) => this.#api.get<CustomerDto>(`/customers/${id}`);
  getCustomers = () => this.#api.get<CustomerDto[]>('/customers');
  updateCustomer = (customer: CustomerUpdateModel) =>
    this.#api.post<CustomerUpdateModel, CustomerDto>(`/customers/${customer.id}`, customer);
  deleteCustomer = (id: string) => this.#api.delete<CustomerDto>(`/customers/${id}`);
}
