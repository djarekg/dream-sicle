import { ApiService } from '@/core/api/api.service';
import type { StateDto } from '@/core/models/state.model';
import { inject, Service } from '@angular/core';

export interface StateCreateModel {
  name: string;
  code: string;
  [key: string]: any;
}

export interface StateUpdateModel {
  id: string;
  name: string;
  code: string;
  [key: string]: any;
}

@Service()
export class StateService {
  readonly #api = inject(ApiService);

  getState = (id: string) => this.#api.get<StateDto>(`/states/${id}`);
  getStates = () => this.#api.get<StateDto[]>('/states');
  createState = (state: StateCreateModel) =>
    this.#api.post<StateCreateModel, StateDto>('/states', state);
  updateState = (state: StateUpdateModel) =>
    this.#api.put<StateUpdateModel, StateDto>(`/states/${state.id}`, state);
  deleteState = (id: string) => this.#api.delete<void>(`/states/${id}`);
  getStatesAsMap = async () => {
    const states = await this.getStates();
    return new Map(states.map(state => [state.id, state.name]));
  };
}
