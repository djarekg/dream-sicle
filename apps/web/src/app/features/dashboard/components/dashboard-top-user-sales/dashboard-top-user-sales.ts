import { DashboardTotalList } from '@/components/dashboard/dashboard-total-list/dashboard-total-list';
import { SimpleSelect, YearSelect } from '@/components/select';
import { DashboardService } from '@/features/dashboard/services/dashboard.service';
import { Component, inject, resource, signal } from '@angular/core';

const SET_SIZES = [5, 10, 15, 20] as const;
type SetSizeType = (typeof SET_SIZES)[number];

@Component({
  selector: 'app-dashboard-top-user-sales',
  imports: [DashboardTotalList, SimpleSelect, YearSelect],
  templateUrl: './dashboard-top-user-sales.html',
  styleUrl: './dashboard-top-user-sales.css',
})
export class DashboardTopUserSales {
  readonly #service = inject(DashboardService);

  protected readonly sizes = SET_SIZES;
  protected readonly take = signal<SetSizeType>(5);
  protected readonly year = signal(new Date().getFullYear());

  protected readonly resource = resource({
    defaultValue: [],
    params: () => {
      const year = this.year();
      const take = this.take();
      return { year, take };
    },
    loader: async ({ params: { year, take } }) => this.#service.getTopUserSales(year, take),
  });
}
