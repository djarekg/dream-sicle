namespace DreamSicle.Db.Repositories;

public class CustomerRepository(LuckyDayDbContext context) : Repository<Customer>(context), ICustomerRepository
{
  public async Task<Customer?> GetCustomerWithContactsAsync(string id)
  {
    return await _dbSet
        .Include(c => c.CustomerContacts)
        .FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task<IEnumerable<Customer>> GetActiveCustomersAsync()
  {
    return await _dbSet.Where(c => c.IsActive).ToListAsync();
  }
}
