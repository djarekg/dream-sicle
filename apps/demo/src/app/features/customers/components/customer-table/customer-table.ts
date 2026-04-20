import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, input } from '@angular/core';
import type { CustomerDto } from '@ds/contracts';

@Component({
  selector: 'app-customer-table',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css',
})
export class CustomerTable {
  readonly customers = input<CustomerDto[]>();
}
