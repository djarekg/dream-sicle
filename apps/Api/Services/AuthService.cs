using DreamSicle.Api.Auth;
using DreamSicle.Api.Configuration;
using DreamSicle.Api.Models;
using DreamSicle.Db.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DreamSicle.Api.Services;

public class AuthService(IJwtConfigurationService jwtConfiguration, TokenRevocationRepository tokenRevocationRepository)
{
  /// <summary>
  /// Validates the provided credentials and returns a signed JWT access token when valid.
  /// </summary>
  /// <param name="email">The user email used as the token subject.</param>
  /// <param name="password">The user password to validate.</param>
  /// <returns>
  /// A token result containing the access token and its expiration timestamp, or <see langword="null"/> when credentials are invalid.
  /// </returns>
  public AuthTokenResult? Signin(string email, string password)
  {
    if (!AuthCredentialRules.IsValidCredential(email, password))
    {
      return null;
    }

    var role = AuthRoleResolver.ResolveRole(email);
    var expiresAtUtc = DateTime.UtcNow.AddMinutes(jwtConfiguration.TokenExpirationMinutes);
    var token = JwtTokenFactory.GenerateJwtToken(jwtConfiguration, email, role, expiresAtUtc);

    return new AuthTokenResult(token, expiresAtUtc);
  }

  /// <summary>
  /// Verifies an authenticated principal and extracts supported auth claims.
  /// </summary>
  /// <param name="principal">The authenticated principal from the current request context.</param>
  /// <returns>The normalized authentication status payload.</returns>
  public AuthStatusResult Verify(ClaimsPrincipal principal)
  {
    var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email)
        ?? principal.FindFirstValue(ClaimTypes.Email)
        ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
    var role = principal.FindFirstValue(ClaimTypes.Role);

    return new AuthStatusResult(true, email, role);
  }

  /// <summary>
  /// Performs server-side sign-out handling by revoking the access token.
  /// </summary>
  /// <param name="context">The HTTP context containing the Authorization header.</param>
  /// <param name="principal">The authenticated principal with token claims.</param>
  /// <returns>A success response for client cleanup.</returns>
  public async Task<object> SignoutAsync(HttpContext context, ClaimsPrincipal principal)
  {
    var token = JwtTokenHelper.ExtractTokenFromContext(context);
    if (!string.IsNullOrEmpty(token))
    {
      var tokenHash = JwtTokenHelper.HashToken(token);
      var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email)
          ?? principal.FindFirstValue(ClaimTypes.Email)
          ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub)
          ?? "unknown";
      var expiresAtUtc = JwtTokenHelper.GetTokenExpirationTime(token);

      await tokenRevocationRepository.RevokeTokenAsync(tokenHash, email, expiresAtUtc);
    }

    return new { success = true };
  }
}

