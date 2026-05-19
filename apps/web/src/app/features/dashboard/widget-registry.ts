import { DashboardWidgetId } from '@/core/constants';
import { DashboardTopUserSales } from '@/features/dashboard/components/dashboard-top-user-sales/dashboard-top-user-sales';
import type { Type } from '@angular/core';

export const WIDGET_REGISTRY: Partial<Record<string, Type<unknown>>> = {
  [DashboardWidgetId.topUserSales]: DashboardTopUserSales,
};
