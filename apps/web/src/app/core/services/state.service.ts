import { ApiService } from '@/core/api/api.service.js';
import type { StateDto } from '@/core/models/state.model';
import { inject, Service } from '@angular/core';

@Service()
export class StateService {
  readonly #api = inject(ApiService);

  getStates = () => this.#api.get<StateDto[]>('/states');
  getStatesAsMap = async () => {
    const states = await this.getStates();
    return new Map(states.map(state => [state.id, state.name]));
  };
}
