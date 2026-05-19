export const DashboardWidgetId = {
  topUserSales: '6ec1ef1f-0ce1-4ad4-a54d-f2d689b8f4f5',
} as const;

export type DashboardWidgetId = (typeof DashboardWidgetId)[keyof typeof DashboardWidgetId];
