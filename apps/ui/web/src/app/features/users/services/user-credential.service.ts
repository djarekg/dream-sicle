import { ApiService } from '@/core/api/api.service';
import { inject, Service } from '@angular/core';

export interface UserCredentialDto {
  id: string;
  userId: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface UserCredentialCreateModel {
  userId: string;
  password: string;
  [key: string]: any;
}

export interface UserCredentialUpdateModel {
  id: string;
  userId: string;
  password: string;
  [key: string]: any;
}

@Service()
export class UserCredentialService {
  readonly #api = inject(ApiService);

  getCredential = (id: string) => this.#api.get<UserCredentialDto>(`/user-credentials/${id}`);
  getCredentials = () => this.#api.get<UserCredentialDto[]>('/user-credentials');
  createCredential = (credential: UserCredentialCreateModel) =>
    this.#api.post<UserCredentialCreateModel, UserCredentialDto>('/user-credentials', credential);
  updateCredential = (credential: UserCredentialUpdateModel) =>
    this.#api.put<UserCredentialUpdateModel, UserCredentialDto>(
      `/user-credentials/${credential.id}`,
      credential,
    );
  deleteCredential = (id: string) => this.#api.delete<void>(`/user-credentials/${id}`);
}
