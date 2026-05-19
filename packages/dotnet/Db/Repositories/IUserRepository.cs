namespace DreamSicle.Db.Repositories;

public interface IUserRepository : IRepository<User>
{
  Task<User?> GetByEmailAsync(string email);
  Task<User?> GetUserWithCredentialAsync(string id);
}
