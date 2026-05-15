namespace DreamSicle.Db.Repositories;

public interface IProductInventoryRepository : IRepository<ProductInventory>
{
  Task<IEnumerable<ProductInventory>> GetByProductIdAsync(string productId);
}

public class ProductInventoryRepository(LuckyDayDbContext context) : Repository<ProductInventory>(context), IProductInventoryRepository
{
  public async Task<IEnumerable<ProductInventory>> GetByProductIdAsync(string productId)
  {
    return await _dbSet.Where(pi => pi.ProductId == productId).ToListAsync();
  }
}
