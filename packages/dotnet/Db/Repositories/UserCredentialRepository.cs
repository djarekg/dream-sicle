namespace DreamSicle.Db.Repositories;

public interface IUserCredentialRepository : IRepository<UserCredential>
{
  Task<UserCredential?> GetByUserIdAsync(string userId);
}

public class UserCredentialRepository(LuckyDayDbContext context) : Repository<UserCredential>(context), IUserCredentialRepository
{
  public async Task<UserCredential?> GetByUserIdAsync(string userId)
  {
    return await _dbSet.FirstOrDefaultAsync(uc => uc.UserId == userId);
  }
}
