using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Exceptions.AuthenticationExceptions;
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

        public override async Task ChallengeAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            if (context.Response.StatusCode == 409) return;

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
            var age = TimeSpan.FromSeconds(Config.Cookie.RefrashTimeSeconds);
            context.Response.Cookies.Append(".AspNetCore.History", token, new CookieOptions
            {
                HttpOnly = true,
                MaxAge = age,
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
