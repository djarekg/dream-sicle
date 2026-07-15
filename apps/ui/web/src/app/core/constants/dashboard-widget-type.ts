export const DashboardWidgetType = {
  chart: 0,
  total: 1,
  totalList: 2,
} as const;

export type DashboardWidgetType = (typeof DashboardWidgetType)[keyof typeof DashboardWidgetType];
