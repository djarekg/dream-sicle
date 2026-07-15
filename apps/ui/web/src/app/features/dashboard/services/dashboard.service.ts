import { ApiService } from '@/core/api/api.service';
import { DashboardTotal } from '@/core/models/dashboard-total';
import type { UserDashboard } from '@/features/dashboard/models/user-dashboard';
import { inject, Service } from '@angular/core';

@Service()
export class DashboardService {
  readonly #api = inject(ApiService);

  getUserDashboardByUserId = (id: string) =>
    this.#api.get<UserDashboard[]>(`/user-dashboard/${id}`);
  getTopUserSales = (year: number, take: number) =>
    this.#api.get<DashboardTotal[]>('/dashboard/top-user-sales', { body: { year, take } });
}
