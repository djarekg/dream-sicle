import { ApiService } from '@/core/api/api.service';
import type { UserFormModel } from '@/features/users/forms/user-form.model';
import type { UserDto } from '@/features/users/models/user.model';
import { inject, Service } from '@angular/core';

@Service()
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserDto>(`/users/${id}`);
  getUsers = () => this.#api.get<UserDto[]>('/users');
  createUser = (user: UserFormModel) => this.#api.post<UserFormModel, UserDto>('/users', user);
  updateUser = (user: UserFormModel) =>
    this.#api.put<UserFormModel, UserDto>(`/users/${user.id}`, user);
  deleteUser = (id: string) => this.#api.delete<UserDto>(`/users/${id}`);
}
