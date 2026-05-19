namespace DreamSicle.Db.Seeding;

public static class DashboardWidgetSeed
{
  public static async Task SeedDashboardWidgetsAsync(LuckyDayDbContext context)
  {
    if (await context.Set<DashboardWidget>().AnyAsync())
    {
      return;
    }

    var widgets = new List<DashboardWidget>
    {
      new()
      {
        Id = Guid.NewGuid().ToString(),
        Name = "Sales Total List",
        Category = DashboardWidgetCategory.Sales,
        Type = DashboardWidgetType.TotalList
      }
    };

    await context.Set<DashboardWidget>().AddRangeAsync(widgets);
    await context.SaveChangesAsync();
  }
}
