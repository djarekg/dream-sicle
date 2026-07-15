namespace DreamSicle.Api.Models;

public record UserSalesTotalResponseModel(
  string UserId,
  string FirstName,
  string LastName,
  decimal TotalSales);
