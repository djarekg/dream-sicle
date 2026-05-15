import type { CustomerDto } from '@/features/customers/models/customer.model';
import { Grid, GridCell, GridRow } from '@angular/aria/grid';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-customer-table',
  imports: [Grid, GridRow, GridCell],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css',
})
export class CustomerTable {
  readonly customers = input<CustomerDto[]>();
}
