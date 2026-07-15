import { ProfileService } from '@/core/services';
import type { UserDashboard } from '@/features/dashboard/models/user-dashboard';
import { DashboardService } from '@/features/dashboard/services/dashboard.service';
import { WIDGET_REGISTRY } from '@/features/dashboard/widget-registry';
import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, resource } from '@angular/core';

@Component({
  selector: 'app-dashboard-panel',
  imports: [NgComponentOutlet],
  templateUrl: './dashboard-panel.html',
  styleUrl: './dashboard-panel.css',
})
export class DashboardPanel {
  readonly #service = inject(DashboardService);
  readonly #profile = inject(ProfileService);

  readonly #resource = resource({
    params: () => this.#profile.userId,
    loader: ({ params: userId }) => this.#service.getUserDashboardByUserId(userId),
  });

  protected readonly widgets = computed(() =>
    (this.#resource.value() ?? []).map((widget: UserDashboard) => ({
      widget,
      component: WIDGET_REGISTRY[widget.widget.id] ?? null,
    })),
  );
}
