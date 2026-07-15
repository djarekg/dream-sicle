import { ApiService } from '@/core/api/api.service';
import type { User } from '@/core/models';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #api = inject(ApiService);

  getUserByEmail(email: string) {
    return this.#api.get<User>(`/users/${email}`);
  }
}
