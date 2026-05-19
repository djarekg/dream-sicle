namespace DreamSicle.Db.Repositories;

public class UserRepository(LuckyDayDbContext context) : Repository<User>(context), IUserRepository
{
  public async Task<User?> GetUserWithCredentialAsync(string id)
  {
    return await _dbSet.Include(u => u.UserCredential).FirstOrDefaultAsync(u => u.Id == id);
  }
}
