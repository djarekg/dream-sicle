import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DashboardTotal } from '@/core/models/dashboard-total';

@Component({
  selector: 'app-dashboard-total-list',
  imports: [CommonModule],
  templateUrl: './dashboard-total-list.html',
})
export class DashboardTotalList {
  readonly label = input.required<string>();
  readonly data = input.required<DashboardTotal[]>();
}
