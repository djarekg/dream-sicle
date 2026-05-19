namespace DreamSicle.Db.Repositories;

public interface IUnitOfWork : IDisposable
{
  IUserRepository Users { get; }
  IProductRepository Products { get; }
  ICustomerRepository Customers { get; }
  IStateRepository States { get; }
  IUserCredentialRepository UserCredentials { get; }
  ICustomerContactRepository CustomerContacts { get; }
  IProductColorRepository ProductColors { get; }
  IProductInventoryRepository ProductInventories { get; }
  IProductSaleRepository ProductSales { get; }
  ITokenRevocationRepository TokenRevocations { get; }
  ISearchRepository Search { get; }
  IDashboardWidgetRepository DashboardWidgets { get; }
  IUserDashboardRepository UserDashboards { get; }

  Task<int> SaveChangesAsync();
  Task BeginTransactionAsync();
  Task CommitTransactionAsync();
  Task RollbackTransactionAsync();
}
