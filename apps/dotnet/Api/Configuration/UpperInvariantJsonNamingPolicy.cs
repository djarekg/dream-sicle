using System.Text.Json;

namespace DreamSicle.Api.Configuration;

public sealed class UpperInvariantJsonNamingPolicy : JsonNamingPolicy
{
  public override string ConvertName(string name) => name.ToUpperInvariant();
}
