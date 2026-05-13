import { ApiService } from '@/core/api/api.service.js';
import { inject, Service } from '@angular/core';
import type { StateDto } from '@dream-sicle/contracts';

@Service()
export class StateService {
  readonly #api = inject(ApiService);

  getStates = () => this.#api.get<StateDto[]>('/states');
}
