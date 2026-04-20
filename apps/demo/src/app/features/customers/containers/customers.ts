import { ViewMode } from '@/core/constants';
import { CustomerCards, CustomerTable } from '@/features/customers/components';
import { CustomerService } from '@/features/customers/services/customer.service';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customers',
  imports: [CustomerCards, CustomerTable, MatButtonToggleModule, MatIconModule, MatTooltipModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export default class Customers {
  readonly #service = inject(CustomerService);
  protected readonly selectedViewMode = signal<ViewMode>(ViewMode.cards);

  readonly #resource = resource({
    loader: () => this.#service.getCustomers(),
  });

  protected customers = computed(() => {
    const value = this.#resource.value();
    return value ? value : [];
  });
}
