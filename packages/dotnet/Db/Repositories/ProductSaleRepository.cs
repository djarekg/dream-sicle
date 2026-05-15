namespace DreamSicle.Db.Repositories;

public interface IProductSaleRepository : IRepository<ProductSale>
{
  Task<IEnumerable<ProductSale>> GetByProductIdAsync(string productId);
  Task<IEnumerable<ProductSale>> GetByCustomerIdAsync(string customerId);
  Task<IEnumerable<ProductSale>> GetByUserIdAsync(string userId);
}

public class ProductSaleRepository(LuckyDayDbContext context) : Repository<ProductSale>(context), IProductSaleRepository
{
  public async Task<IEnumerable<ProductSale>> GetByProductIdAsync(string productId)
  {
    return await _dbSet.Where(ps => ps.ProductId == productId).ToListAsync();
  }

  public async Task<IEnumerable<ProductSale>> GetByCustomerIdAsync(string customerId)
  {
    return await _dbSet.Where(ps => ps.CustomerId == customerId).ToListAsync();
  }

  public async Task<IEnumerable<ProductSale>> GetByUserIdAsync(string userId)
  {
    return await _dbSet.Where(ps => ps.UserId == userId).ToListAsync();
  }
}
