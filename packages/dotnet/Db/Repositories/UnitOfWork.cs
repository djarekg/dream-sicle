namespace DreamSicle.Db.Repositories;

public interface IUnitOfWork : IDisposable
{
  IUserRepository Users { get; }
  IProductRepository Products { get; }
  ICustomerRepository Customers { get; }
  IRepository<State> States { get; }
  IRepository<UserCredential> UserCredentials { get; }
  IRepository<CustomerContact> CustomerContacts { get; }
  IRepository<ProductColor> ProductColors { get; }
  IRepository<ProductInventory> ProductInventories { get; }
  IRepository<ProductSale> ProductSales { get; }

  Task<int> SaveChangesAsync();
  Task BeginTransactionAsync();
  Task CommitTransactionAsync();
  Task RollbackTransactionAsync();
}

public class UnitOfWork(LuckyDayDbContext context) : IUnitOfWork
{
  private readonly LuckyDayDbContext _context = context;
  private IUserRepository? _userRepository;
  private IProductRepository? _productRepository;
  private ICustomerRepository? _customerRepository;
  private IRepository<State>? _stateRepository;
  private IRepository<UserCredential>? _userCredentialRepository;
  private IRepository<CustomerContact>? _customerContactRepository;
  private IRepository<ProductColor>? _productColorRepository;
  private IRepository<ProductInventory>? _productInventoryRepository;
  private IRepository<ProductSale>? _productSaleRepository;

  public IUserRepository Users => _userRepository ??= new UserRepository(_context);
  public IProductRepository Products => _productRepository ??= new ProductRepository(_context);
  public ICustomerRepository Customers => _customerRepository ??= new CustomerRepository(_context);
  public IRepository<State> States => _stateRepository ??= new Repository<State>(_context);
  public IRepository<UserCredential> UserCredentials => _userCredentialRepository ??= new Repository<UserCredential>(_context);
  public IRepository<CustomerContact> CustomerContacts => _customerContactRepository ??= new Repository<CustomerContact>(_context);
  public IRepository<ProductColor> ProductColors => _productColorRepository ??= new Repository<ProductColor>(_context);
  public IRepository<ProductInventory> ProductInventories => _productInventoryRepository ??= new Repository<ProductInventory>(_context);
  public IRepository<ProductSale> ProductSales => _productSaleRepository ??= new Repository<ProductSale>(_context);

  public async Task<int> SaveChangesAsync()
  {
    return await _context.SaveChangesAsync();
  }

  public async Task BeginTransactionAsync()
  {
    await _context.Database.BeginTransactionAsync();
  }

  public async Task CommitTransactionAsync()
  {
    try
    {
      await _context.SaveChangesAsync();
      await _context.Database.CommitTransactionAsync();
    }
    catch
    {
      await RollbackTransactionAsync();
      throw;
    }
  }

  public async Task RollbackTransactionAsync()
  {
    try
    {
      await _context.Database.RollbackTransactionAsync();
    }
    catch
    {
      // Log the error if needed
    }
  }

  public void Dispose()
  {
    _context.Dispose();
  }
}
