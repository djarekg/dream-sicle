namespace DreamSicle.Db.Repositories;

public interface IStateRepository : IRepository<State>
{
  Task<State?> GetByCodeAsync(string code);
}

public class StateRepository(LuckyDayDbContext context) : Repository<State>(context), IStateRepository
{
  public async Task<State?> GetByCodeAsync(string code)
  {
    return await _dbSet.FirstOrDefaultAsync(s => s.Code == code);
  }
}
