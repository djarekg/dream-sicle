namespace DreamSicle.Db.Repositories;

public interface IProductRepository : IRepository<Product>
{
  Task<Product?> GetProductWithDetailsAsync(string id);
  Task<IEnumerable<Product>> GetProductsByTypeAsync(ProductType productType);
  Task<IEnumerable<Product>> GetActiveProductsAsync();
}
