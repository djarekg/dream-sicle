using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;

namespace DreamSicle.Api.Auth;

/// <summary>
/// Helper utilities for JWT token operations including extraction, hashing, and expiration handling.
/// </summary>
public static class JwtTokenHelper
{
  /// <summary>
  /// Extracts the JWT bearer token from the HTTP Authorization header.
  /// </summary>
  /// <param name="context">The HTTP context containing the Authorization header.</param>
  /// <returns>The JWT token string, or null if no valid bearer token is present.</returns>
  public static string? ExtractTokenFromContext(HttpContext context)
  {
    var authHeader = context.Request.Headers.Authorization.ToString();
    if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
    {
      return authHeader["Bearer ".Length..];
    }

    return null;
  }

  /// <summary>
  /// Creates a SHA256 hash of a JWT token for secure storage in the revocation list.
  /// </summary>
  /// <param name="token">The JWT token to hash.</param>
  /// <returns>The Base64-encoded SHA256 hash of the token.</returns>
  public static string HashToken(string token)
  {
    using var sha256 = SHA256.Create();
    var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
    return Convert.ToBase64String(hashedBytes);
  }

  /// <summary>
  /// Extracts the expiration time from a JWT token by parsing its claims.
  /// </summary>
  /// <param name="token">The JWT token to parse.</param>
  /// <returns>The token's expiration time in UTC, or one hour from now if parsing fails.</returns>
  public static DateTime GetTokenExpirationTime(string token)
  {
    try
    {
      var handler = new JwtSecurityTokenHandler();
      var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
      return jwtToken?.ValidTo ?? DateTime.UtcNow.AddHours(1);
    }
    catch
    {
      return DateTime.UtcNow.AddHours(1);
    }
  }
}
