namespace DreamSicle.Db.Repositories;

public interface ICustomerContactRepository : IRepository<CustomerContact>
{
  Task<IEnumerable<CustomerContact>> GetByCustomerIdAsync(string customerId);
  Task<IEnumerable<CustomerContact>> GetActiveByCustomerIdAsync(string customerId);
}

public class CustomerContactRepository(LuckyDayDbContext context) : Repository<CustomerContact>(context), ICustomerContactRepository
{
  public async Task<IEnumerable<CustomerContact>> GetByCustomerIdAsync(string customerId)
  {
    return await _dbSet.Where(cc => cc.CustomerId == customerId).ToListAsync();
  }

  public async Task<IEnumerable<CustomerContact>> GetActiveByCustomerIdAsync(string customerId)
  {
    return await _dbSet.Where(cc => cc.CustomerId == customerId && cc.IsActive).ToListAsync();
  }
}
