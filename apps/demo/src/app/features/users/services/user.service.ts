import { ApiService } from '@/core/api/api.service';
import type { UserFormModel } from '@/features/users/forms/user-form.model';
import { inject, Injectable } from '@angular/core';
import type { UserDto } from '@ds/contracts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserDto>(`/users/${id}`);
  getUsers = () => this.#api.get<UserDto[]>('/users');
  updateUser = (user: UserFormModel) => this.#api.post<UserFormModel>(`/users/${user.id}`, user);
  createUser = (user: UserFormModel) =>
    this.#api.put<UserFormModel, { id: string; }>('/users', user);
  deleteUser = (id: string) => this.#api.delete<UserDto>(`/users/${id}`);
}
