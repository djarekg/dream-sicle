using DreamSicle.Db.Models;

namespace DreamSicle.Api.Models;

public record UserCredentialCreateModel(
  string UserId,
  string Password,
  Role Role);

public record UserCredentialUpdateModel(
  string UserId,
  string Password,
  Role Role);

public record UserCredentialResponseModel(
  string Id,
  string UserId,
  Role Role);
