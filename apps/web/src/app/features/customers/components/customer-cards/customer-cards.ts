import { StateService } from '@/core/services/state.service.js';
import type { CustomerDto } from '@/features/customers/models/customer.model';
import { Component, computed, inject, input, resource } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

type CustomerCardItem = CustomerDto & {
  stateName: string;
};

@Component({
  selector: 'app-customer-cards',
  imports: [MatCardModule, MatChipsModule, RouterLink],
  templateUrl: './customer-cards.html',
  styleUrl: './customer-cards.css',
})
export class CustomerCards {
  readonly #stateService = inject(StateService);
  readonly #statesResource = resource({
    loader: () => this.#stateService.getStatesAsMap(),
  });

  readonly customers = input<CustomerDto[]>();

  protected readonly customerCards = computed<CustomerCardItem[]>(() => {
    const customers = this.customers() ?? [];
    const states = this.#statesResource.value() ?? new Map<string, string>();

    return customers.map(customer => ({
      ...customer,
      stateName: states.get(customer.stateId) ?? customer.stateId,
    }));
  });
}
