using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationService : AuthenticationService, IAuthenticationService
    {
        private readonly ILogger<JWTAuthenticationService> logger;
        private readonly ISessionService sessionService;        
        private readonly IUserSession userSession;

        public JWTAuthenticationService(
            IAuthenticationSchemeProvider schemes,
            IAuthenticationHandlerProvider handlers,
            IClaimsTransformation transform,
            IOptions<AuthenticationOptions> options,
            ISessionService sessionService,
            IUserSession userSession,
            ILogger<JWTAuthenticationService> logger
            ): base(schemes, handlers, transform, options)
        {
            this.sessionService = sessionService;
            this.userSession = userSession;
            this.logger = logger;
        }

        public override async Task<AuthenticateResult> AuthenticateAsync(HttpContext context, string scheme)
        {
            try
            {
                if (!context.Request.Cookies.ContainsKey(JWTDefaults.CookieName))
                {
                    return AuthenticateResult.NoResult();
                }

                var cookie = context.Request.Cookies[JWTDefaults.CookieName];
                var session = await this.sessionService.ParseToken(cookie);

                if (session.RefreshExpired < DateTime.UtcNow)
                {                    
                    this.logger.LogDebug("Refresh time expired");
                    return AuthenticateResult.NoResult();
                }
                else if (session.AccessExpired < DateTime.UtcNow)
                {
                    var token = await sessionService.UpdateToken(session);
                    this.AppendCookie(context, token);
                    
                    this.logger.LogDebug("Accept time expired");
                }

                this.userSession.SetSession(session);

                var claims = new Claim[] {
                    new Claim(ClaimTypes.Name, session.Login),
                    new Claim(ClaimTypes.NameIdentifier, session.UserId.ToString()),
                };
                var identity = new ClaimsIdentity(claims, scheme);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, scheme);

                this.logger.LogDebug("Authenticated");

                return AuthenticateResult.Success(ticket);
            }
            catch (Exception e)
            {
                this.logger.LogInformation(401, e.Message, e);
                return AuthenticateResult.Fail("Cookies error");
            }
        }

        public override async Task ChallengeAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            this.logger.LogDebug("Challenged");
            await base.ChallengeAsync(context, scheme, properties);
        }

        public override Task ForbidAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            this.logger.LogDebug("Forbidden");
            
            context.Response.StatusCode = 403;
            return Task.CompletedTask;
        }

        public override async Task SignInAsync(HttpContext context, string scheme, ClaimsPrincipal principal, AuthenticationProperties properties)
        {
            var login = principal.FindFirstValue(ClaimTypes.Name);
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            var token = await this.sessionService.GetToken(long.Parse(userId), login, principal);

            this.AppendCookie(context, token);
            this.logger.LogDebug("Logged in successful");
        }

        private void AppendCookie(HttpContext context, string token)
        {
            context.Response.Cookies.Append(".AspNetCore.History", token, new CookieOptions
            {
                HttpOnly = true,
                MaxAge = TimeSpan.FromHours(sessionService.RefrashHours),
                SameSite = SameSiteMode.Strict,
            });
        }

        public override async Task SignOutAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            await this.RemoveCookie(context);
            this.logger.LogDebug("Logged out successful");
        }
        private async Task RemoveCookie(HttpContext context)
        {
            if (!context.Request.Cookies.ContainsKey(JWTDefaults.CookieName))
            {
                return;
            }

            try
            {
                var cookie = context.Request.Cookies[JWTDefaults.CookieName];
                var session = await this.sessionService.ParseToken(cookie);

                await this.sessionService.Delete(session.Guid.Value);
            }
            catch (Exception e)
            {
                this.logger.LogWarning("Could not delete cookies from DB", e);
            }
            finally {
                context.Response.Cookies.Delete(".AspNetCore.History");
            }
        }

    }
}
