import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomerDto } from '@ds/contracts';

@Component({
  selector: 'app-customer-cards',
  imports: [MatCardModule],
  templateUrl: './customer-cards.html',
  styleUrl: './customer-cards.css',
})
export class CustomerCards {
  readonly customers = input<CustomerDto[]>();
}
