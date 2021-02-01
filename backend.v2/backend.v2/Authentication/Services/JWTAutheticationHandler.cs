using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.Models.Authentication;
using backend.v2.Utils;
using backend.v2.Authentication.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using backend.v2.Services;
using backend.Exceptions.AuthenticationExceptions;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationHandler : AuthenticationHandler<JWTAuthenticationOptions>
    {
        private readonly ILogger<JWTAuthenticationService> jwtLogger;
        private readonly IAuthenticationService authenticationService;
        private readonly ISessionService sessionService;
        private readonly IUserSession userSession;

        public JWTAuthenticationHandler(IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthenticationService authenticationService,
            ISessionService sessionService,
            IUserSession userSession,
            ILogger<JWTAuthenticationService> jwtLogger
            )
            : base(options, logger, encoder, clock)
        {
            this.jwtLogger = jwtLogger;
            this.sessionService = sessionService;
            this.userSession = userSession;
            this.authenticationService = authenticationService;
        }
        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var context = Request.HttpContext;
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
                    this.jwtLogger.LogDebug("Refresh time expired");
                    return AuthenticateResult.NoResult();
                }
                else if (session.AccessExpired < DateTime.UtcNow)
                {
                    var token = await sessionService.UpdateToken(session);
                    this.RenewCookie(context, token);

                    this.jwtLogger.LogDebug("Accept time expired");
                }

                this.userSession.SetSession(session);

                var claims = new Claim[] {
                    new Claim(ClaimTypes.Name, session.Login),
                    new Claim(ClaimTypes.NameIdentifier, session.UserId.ToString()),
                };
                var identity = new ClaimsIdentity(claims, JWTDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, JWTDefaults.AuthenticationScheme);

                this.jwtLogger.LogDebug("Authenticated");

                return AuthenticateResult.Success(ticket);
            }
            catch (CookieParseException e)
            {
                this.jwtLogger.LogInformation(409, e.Message, e);

                context.Response.StatusCode = 409;
                return AuthenticateResult.Fail("Cookies parse exception");
            }
            catch (Exception e)
            {
                this.jwtLogger.LogInformation(401, e.Message, e);
                return AuthenticateResult.Fail("Cookies error");
            }
        }

        private void RenewCookie(HttpContext context, string token)
        {
            context.Response.Cookies.Delete(".AspNetCore.History");
            this.AppendCookie(context, token);
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
    }
}
