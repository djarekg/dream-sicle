import { ApiService } from "@/core/api/api.service.js";
import { inject, Injectable } from "@angular/core";
import type { StateDto } from "@ds/contracts";

@Injectable({
  providedIn: "root",
})
export class StateService {
  readonly #api = inject(ApiService);

  getStates = () => this.#api.get<StateDto[]>("/states");
}
