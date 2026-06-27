namespace DreamSicle.Db.Repositories;

public interface IUserRepository : IRepository<User>
{
  Task<User?> GetUserWithCredentialAsync(string id);
}
