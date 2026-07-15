import { ApiService } from '@/core/api/api.service';
import { inject, Service } from '@angular/core';

export interface CustomerContactDto {
  id: string;
  customerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: any;
}

export interface CustomerContactCreateModel {
  customerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: any;
}

export interface CustomerContactUpdateModel {
  id: string;
  customerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: any;
}

@Service()
export class CustomerContactService {
  readonly #api = inject(ApiService);

  getContact = (id: string) => this.#api.get<CustomerContactDto>(`/customer-contacts/${id}`);
  getContacts = () => this.#api.get<CustomerContactDto[]>('/customer-contacts');
  createContact = (contact: CustomerContactCreateModel) =>
    this.#api.post<CustomerContactCreateModel, CustomerContactDto>('/customer-contacts', contact);
  updateContact = (contact: CustomerContactUpdateModel) =>
    this.#api.put<CustomerContactUpdateModel, CustomerContactDto>(
      `/customer-contacts/${contact.id}`,
      contact,
    );
  deleteContact = (id: string) => this.#api.delete<void>(`/customer-contacts/${id}`);
}
