import type { CustomerDto } from '@/features/customers/models/customer.model';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-cards',
  imports: [MatCardModule],
  templateUrl: './customer-cards.html',
  styleUrl: './customer-cards.css',
})
export class CustomerCards {
  readonly customers = input<CustomerDto[]>();
}
