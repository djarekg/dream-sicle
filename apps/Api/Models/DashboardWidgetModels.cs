using DreamSicle.Db.Enums;

namespace DreamSicle.Api.Models;

public record DashboardWidgetResponseModel(
  string Id,
  string Name,
  DashboardWidgetCategory Category,
  DashboardWidgetType Type);
