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
            this.sessionService = sessionService;
            this.userSession = userSession;
            this.authenticationService = authenticationService;
        }
        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            this.Logger.LogDebug($"Authenticate {this.CurrentUri}");

            try
            {
                if (!Context.Request.Cookies.ContainsKey(JWTDefaults.CookieName))
                {
                    return AuthenticateResult.NoResult();
                }

                var cookie = Context.Request.Cookies[JWTDefaults.CookieName];
                var session = await this.sessionService.ParseToken(cookie);

                if (session.RefreshExpired < DateTime.UtcNow)
                {
                    this.OnRefreshExpired();
                    return AuthenticateResult.NoResult();
                }
                else if (session.AccessExpired < DateTime.UtcNow)
                {
                    await this.OnAccessExpired(session);
                }

                var ticket = this.Authenticate(session);

                return AuthenticateResult.Success(ticket);
            }
            catch (CookieParseException e)
            {
                this.Logger.LogInformation(409, e.Message, e);

                Context.Response.StatusCode = 409;
                return AuthenticateResult.Fail("Cookies parse exception");
            }
            catch (Exception e)
            {
                this.Logger.LogInformation(401, e.Message, e);
                return AuthenticateResult.Fail("Cookies error");
            }
        }

        private void OnRefreshExpired()
        {
            this.Logger.LogDebug("Refresh time expired");
            this.DeleteCookies();
            this.Logger.LogDebug("Cookies deleted");
        }

        private async Task OnAccessExpired(Session session)
        {
            this.Logger.LogDebug("Accept time expired");
            var token = await sessionService.UpdateToken(session);
            this.RenewCookie(token);
            this.Logger.LogDebug("Cookies renewed");
        }

        private AuthenticationTicket Authenticate(Session session)
        {
            this.userSession.Session = session;

            var claims = new Claim[] {
                    new Claim(ClaimTypes.Name, session.Login),
                    new Claim(ClaimTypes.NameIdentifier, session.UserId.ToString()),
                };
            var identity = new ClaimsIdentity(claims, JWTDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, JWTDefaults.AuthenticationScheme);

            return ticket;
        }

        private void RenewCookie(string token)
        {
            this.DeleteCookies();
            this.AppendCookie(token);
        }

        private void DeleteCookies()
        {
            Context.Response.Cookies.Delete(".AspNetCore.History");
        }
        private void AppendCookie(string token)
        {
            var age = TimeSpan.FromSeconds(Config.Cookie.RefrashTimeSeconds);
            Context.Response.Cookies.Append(".AspNetCore.History", token, new CookieOptions
            {
                HttpOnly = true,
                MaxAge = age,
                SameSite = SameSiteMode.Strict,
            });
        }
    }
}
