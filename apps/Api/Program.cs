using DreamSicle.Api.Configuration;
using DreamSicle.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var jwtConfiguration = new JwtConfigurationService(builder.Configuration);

// Add services to the container.
builder.Services.AddDatabaseConfiguration(builder.Configuration, builder.Environment);
builder.Services.AddSingleton<IJwtConfigurationService>(jwtConfiguration);
builder.Services.AddControllers();
builder.Services.AddCorsConfiguration(builder.Configuration);
builder.Services.AddJwtAuthenticationConfiguration(jwtConfiguration);

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

await app.InitializeDatabaseAsync();
app.UseApiHttpConfiguration();

app.MapControllers();

app.Run();
