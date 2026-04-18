import { inject, Injectable } from '@angular/core';
import type { CustomerDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomer = (id: string) => this.#api.get<CustomerDto>(`/customers/${id}`);
  getCustomers = () => this.#api.get<CustomerDto[]>('/customers');
}
