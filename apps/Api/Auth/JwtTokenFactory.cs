using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DreamSicle.Api.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DreamSicle.Api.Auth;

internal static class JwtTokenFactory
{
  /// <summary>
  /// Generates a signed JWT access token for the specified user identity and role.
  /// </summary>
  /// <param name="jwtConfiguration">The JWT configuration service containing token settings.</param>
  /// <param name="email">The user email to include in token claims.</param>
  /// <param name="role">The role claim value to include in the token.</param>
  /// <param name="expiresAtUtc">The UTC expiration timestamp for the token.</param>
  /// <returns>The serialized JWT bearer token string.</returns>
  public static string GenerateJwtToken(IJwtConfigurationService jwtConfiguration, string email, string role, DateTime expiresAtUtc)
  {
    var jwtIssuer = jwtConfiguration.Issuer;
    var jwtAudience = jwtConfiguration.Audience;
    var jwtKey = jwtConfiguration.Key;

    var claims = new List<Claim>
    {
      new(JwtRegisteredClaimNames.Sub, email),
      new(JwtRegisteredClaimNames.Email, email),
      new(ClaimTypes.Role, role)
    };

    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
    var tokenDescriptor = new JwtSecurityToken(
      issuer: jwtIssuer,
      audience: jwtAudience,
      claims: claims,
      expires: expiresAtUtc,
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }
}
