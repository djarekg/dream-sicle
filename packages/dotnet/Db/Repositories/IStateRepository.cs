namespace DreamSicle.Db.Repositories;

public interface IStateRepository : IRepository<State>
{
  Task<State?> GetByCodeAsync(string code);
}
