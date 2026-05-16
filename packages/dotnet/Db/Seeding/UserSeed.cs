namespace DreamSicle.Db.Seeding;

public static class UserSeed
{
  public static async Task SeedUsersAsync(LuckyDayDbContext context)
  {
    if (await context.Users.AnyAsync())
    {
      return;
    }

    var faker = new Faker("en_US");
    var states = await context.States.Select(s => new { s.Id, s.Code }).ToListAsync();
    var users = new List<User>();
    var adminState = states.FirstOrDefault(s => s.Code == "FL") ?? faker.PickRandom(states);

    // Create admin user
    users.Add(new User
    {
      Id = Guid.NewGuid().ToString(),
      FirstName = "Admin",
      LastName = "User",
      Gender = Gender.Male,
      Email = "admin@fu.com",
      StreetAddress = "123 Admin St",
      City = "St. Augustine",
      StateId = adminState.Id,
      Zip = "32084",
      Phone = "123-456-7890",
      JobTitle = "Administrator",
      ImageId = 0,
      IsActive = true
    });

    // Create regular users
    for (int i = 0; i < 10; i++)
    {
      var state = faker.PickRandom(states);

      users.Add(new User
      {
        Id = Guid.NewGuid().ToString(),
        FirstName = faker.Name.FirstName(),
        LastName = faker.Name.LastName(),
        Gender = faker.PickRandom<Gender>(),
        Email = faker.Internet.Email(),
        StreetAddress = faker.Address.StreetAddress(),
        StreetAddress2 = faker.Address.SecondaryAddress(),
        City = UsCitySeed.GetRandomCity(faker, state.Code),
        StateId = state.Id,
        Zip = faker.Address.ZipCode("#####"),
        Phone = faker.Phone.PhoneNumber("+1 (###) ###-####"),
        JobTitle = faker.Name.JobTitle(),
        ImageId = faker.Random.Int(1, 99),
        IsActive = faker.Random.Bool(0.8f)
      });
    }

    // Create sales users
    for (int i = 0; i < 10; i++)
    {
      var state = faker.PickRandom(states);

      users.Add(new User
      {
        Id = Guid.NewGuid().ToString(),
        FirstName = faker.Name.FirstName(),
        LastName = faker.Name.LastName(),
        Gender = faker.PickRandom<Gender>(),
        Email = faker.Internet.Email(),
        StreetAddress = faker.Address.StreetAddress(),
        StreetAddress2 = faker.Address.SecondaryAddress(),
        City = UsCitySeed.GetRandomCity(faker, state.Code),
        StateId = state.Id,
        Zip = faker.Address.ZipCode("#####"),
        Phone = faker.Phone.PhoneNumber("+1 (###) ###-####"),
        JobTitle = faker.Name.JobTitle(),
        ImageId = faker.Random.Int(1, 99),
        IsActive = faker.Random.Bool(0.8f)
      });
    }

    // Create accounting users
    for (int i = 0; i < 5; i++)
    {
      var state = faker.PickRandom(states);

      users.Add(new User
      {
        Id = Guid.NewGuid().ToString(),
        FirstName = faker.Name.FirstName(),
        LastName = faker.Name.LastName(),
        Gender = faker.PickRandom<Gender>(),
        Email = faker.Internet.Email(),
        StreetAddress = faker.Address.StreetAddress(),
        StreetAddress2 = faker.Address.SecondaryAddress(),
        City = UsCitySeed.GetRandomCity(faker, state.Code),
        StateId = state.Id,
        Zip = faker.Address.ZipCode("#####"),
        Phone = faker.Phone.PhoneNumber("+1 (###) ###-####"),
        JobTitle = faker.Name.JobTitle(),
        ImageId = faker.Random.Int(1, 99),
        IsActive = faker.Random.Bool(0.8f)
      });
    }

    await context.Users.AddRangeAsync(users);
    await context.SaveChangesAsync();
  }
}
