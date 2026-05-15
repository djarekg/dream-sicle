namespace DreamSicle.Db.Repositories;

public interface IProductColorRepository : IRepository<ProductColor>
{
  Task<IEnumerable<ProductColor>> GetByProductIdAsync(string productId);
}

public class ProductColorRepository(LuckyDayDbContext context) : Repository<ProductColor>(context), IProductColorRepository
{
  public async Task<IEnumerable<ProductColor>> GetByProductIdAsync(string productId)
  {
    return await _dbSet.Where(pc => pc.ProductId == productId).ToListAsync();
  }
}
