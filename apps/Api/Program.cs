using DreamSicle.Api.Configuration;
using DreamSicle.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var jwtConfiguration = new JwtConfigurationService(builder.Configuration);

// Add services to the container.
builder.Services.AddDatabaseConfiguration(builder.Configuration, builder.Environment);
builder.Services.AddSingleton<IJwtConfigurationService>(jwtConfiguration);
builder.Services.AddControllers().AddJsonOptions(options =>
{
  options.JsonSerializerOptions.Converters.Add(
    new System.Text.Json.Serialization.JsonStringEnumConverter(
      new UpperInvariantJsonNamingPolicy()));
});
builder.Services.ConfigureHttpJsonOptions(options =>
{
  options.SerializerOptions.Converters.Add(
    new System.Text.Json.Serialization.JsonStringEnumConverter(
      new UpperInvariantJsonNamingPolicy()));
});
builder.Services.AddCorsConfiguration(builder.Configuration);
builder.Services.AddJwtAuthenticationConfiguration(jwtConfiguration);

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<StateService>();
builder.Services.AddScoped<CustomerContactService>();
builder.Services.AddScoped<UserCredentialService>();
builder.Services.AddScoped<ProductColorService>();
builder.Services.AddScoped<ProductInventoryService>();
builder.Services.AddScoped<ProductSaleService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<SearchService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

await app.InitializeDatabaseAsync();
app.UseApiHttpConfiguration();

app.MapControllers();

app.Run();
