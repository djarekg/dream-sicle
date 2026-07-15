export const DashboardWidgetCategory = {
  accounting: 0,
  inventory: 1,
  sales: 2,
  userActivity: 3,
};

export type DashboardWidgetCategory =
  (typeof DashboardWidgetCategory)[keyof typeof DashboardWidgetCategory];
