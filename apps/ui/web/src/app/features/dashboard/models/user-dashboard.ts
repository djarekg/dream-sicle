import type { DashboardWidget } from '@/core/models';

export type UserDashboard = {
  id: string;
  userId: string;
  dashboardWidgetId: string;
  position: number;
  widget: DashboardWidget;
};
