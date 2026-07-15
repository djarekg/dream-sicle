import type { DashboardWidgetCategory, DashboardWidgetType } from '@/core/constants';

export type DashboardWidget = {
  id: string;
  name: string;
  type: DashboardWidgetType;
  category: DashboardWidgetCategory;
};
