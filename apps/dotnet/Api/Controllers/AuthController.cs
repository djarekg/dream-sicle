using DreamSicle.Api.Models;
using DreamSicle.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DreamSicle.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController(AuthService authService) : ControllerBase
{
    /// <summary>
    /// Validates the provided credentials and returns a signed access token when successful.
    /// </summary>
    /// <param name="request">The sign-in request payload.</param>
    /// <returns>An access token when credentials are valid; otherwise an error response.</returns>
    [AllowAnonymous]
    [HttpPost("signin")]
    public IActionResult Signin([FromBody] AuthModel request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Email and password are required.");
        }

        var token = authService.Signin(request.Email, request.Password);
        if (token is null)
        {
            return Unauthorized("Invalid credentials.");
        }

        // Response.Cookies.Append("session", token.AccessToken, new CookieOptions
        // {
        //     HttpOnly = true,
        //     Secure = HttpContext.Request.IsHttps,
        //     SameSite = SameSiteMode.Lax,
        //     Expires = new DateTimeOffset(token.ExpiresAtUtc)
        // });

        return Ok(token);
    }

    /// <summary>
    /// Verifies that the current request is authenticated by a valid access token.
    /// </summary>
    /// <returns>The authenticated state and available identity claims for the current user.</returns>
    [Authorize]
    [HttpGet("is-authenticated")]
    [ProducesResponseType<AuthStatusResult>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult<AuthStatusResult> IsAuthenticated()
    {
        return Ok(authService.Verify(User));
    }

    /// <summary>
    /// Signs out the current authenticated user session on the server by revoking the access token.
    /// </summary>
    /// <returns>A success payload for client-side auth cleanup.</returns>
    [Authorize]
    [HttpPost("signout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SignoutAsync()
    {
        var result = await authService.SignoutAsync(HttpContext, User);
        return Ok(result);
    }
}
