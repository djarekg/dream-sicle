namespace DreamSicle.Db.Repositories;

public interface ICustomerRepository : IRepository<Customer>
{
  Task<Customer?> GetCustomerWithContactsAsync(string id);
  Task<IEnumerable<Customer>> GetActiveCustomersAsync();
}
