import type { User } from '@/core/models';
import { computed, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Service()
export class ProfileService {
  readonly #route = inject(ActivatedRoute);
  readonly #data = toSignal(this.#route.data);
  readonly #user = computed(() => this.#data()?.user as User);

  get userId() {
    return this.#user()?.id;
  }

  get userEmail() {
    return this.#user()?.email;
  }

  get firstName() {
    return this.#user()?.firstName;
  }

  get lastName() {
    return this.#user()?.lastName;
  }

  get role() {
    return this.#user()?.role;
  }
}
