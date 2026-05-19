import { ProfileService } from '@/core/services';
import { DashboardService } from '@/features/dashboard/services/dashboard.service';
import { Component, inject, resource } from '@angular/core';

@Component({
  selector: 'app-dashboard-panel',
  imports: [],
  templateUrl: './dashboard-panel.html',
  styleUrl: './dashboard-panel.css',
})
export class DashboardPanel {
  readonly #service = inject(DashboardService);
  readonly #profile = inject(ProfileService);

  protected resource = resource({
    params: () => this.#profile.userId,
    loader: ({ params: userId }) => this.#service.getUserDashboardByUserId(userId),
  });
}
