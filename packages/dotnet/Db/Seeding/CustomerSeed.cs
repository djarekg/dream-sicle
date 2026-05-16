namespace DreamSicle.Db.Seeding;

public static class CustomerSeed
{
  public static async Task SeedCustomersAsync(LuckyDayDbContext context)
  {
    if (await context.Customers.AnyAsync())
    {
      return;
    }

    var faker = new Faker("en_US");
    var states = await context.States.Select(s => new { s.Id, s.Code }).ToListAsync();
    var customers = new List<Customer>();

    for (int i = 0; i < 120; i++)
    {
      var state = faker.PickRandom(states);

      customers.Add(new Customer
      {
        Id = Guid.NewGuid().ToString(),
        Name = faker.Company.CompanyName(),
        StreetAddress = faker.Address.StreetAddress(),
        StreetAddress2 = faker.Address.SecondaryAddress(),
        City = UsCitySeed.GetRandomCity(faker, state.Code),
        StateId = state.Id,
        Zip = faker.Address.ZipCode("#####"),
        Phone = faker.Phone.PhoneNumber("+1 (###) ###-####"),
        IsActive = faker.Random.Bool(0.8f)
      });
    }

    await context.Customers.AddRangeAsync(customers);
    await context.SaveChangesAsync();
  }
}
