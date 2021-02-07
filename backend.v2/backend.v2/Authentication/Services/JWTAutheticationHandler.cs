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
        private readonly IJWTTokenManager tokenManager;
        private readonly IUserSession userSession;
        private readonly IUserService userService;

        public JWTAuthenticationHandler(IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthenticationService authenticationService,
            IUserSession userSession,
            IUserService userService,
            IJWTTokenManager tokenManager,
            ILogger<JWTAuthenticationService> jwtLogger
            )
            : base(options, logger, encoder, clock)
        {
            this.tokenManager = tokenManager;
            this.userSession = userSession;
            this.userService = userService;
            this.authenticationService = authenticationService;
        }
        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            this.Logger.LogDebug($"Authenticate {this.CurrentUri}");

            try
            {
                if (!Context.Request.Headers.ContainsKey(JWTDefaults.AccessHeaderName) ||
                    !Context.Request.Headers.ContainsKey(JWTDefaults.RefrashHeaderName))
                {
                    return AuthenticateResult.NoResult();
                }

                var accessToken = Context.Request.Headers[JWTDefaults.AccessHeaderName];
                var refrashToken = Context.Request.Headers[JWTDefaults.RefrashHeaderName];

                var accessTokenData = this.tokenManager.ReadToken(accessToken);
                var refrashTokenData = this.tokenManager.ReadToken(refrashToken);

                if (refrashTokenData.ValidityDate < DateTime.UtcNow)
                {
                    this.OnRefreshExpired();
                    return AuthenticateResult.NoResult();
                }
                else if (accessTokenData.ValidityDate < DateTime.UtcNow)
                {
                    this.OnAccessExpired(accessTokenData);
                }
                else {
                    this.CopyTokens();
                }

                var ticket = await this.Authenticate(accessTokenData);

                return AuthenticateResult.Success(ticket);
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
            this.DeleteTokens();
            this.Logger.LogDebug("Cookies deleted");
        }

        private void OnAccessExpired(TokenData data)
        {
            this.Logger.LogDebug("Accept time expired");

            var accessToken = this.GetAccessToken(data);
            var refrashToken = this.GetRefrashToken(data);

            this.RenewTokens(accessToken, refrashToken);
            this.Logger.LogDebug("Cookies renewed");
        }
        
        private string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.GenerateToken(data);
        }

        private string GetRefrashToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefrashTime;

            return tokenManager.GenerateToken(data);
        }

        private async Task<AuthenticationTicket> Authenticate(TokenData data)
        {
            var user = await this.userService.GetById(data.UserId);
            this.userSession.User = user;

            var claims = new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, data.UserId.ToString()),
                    new Claim(ClaimTypes.Sid, data.SessionGuid.ToString()),
                };
            var identity = new ClaimsIdentity(claims, JWTDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, JWTDefaults.AuthenticationScheme);

            return ticket;
        }

        private void RenewTokens(string access, string refrash)
        {
            this.AppendTokens(access, refrash);
        }

        private void CopyTokens() {
            this.Context.Response.Headers[JWTDefaults.AccessHeaderName] = this.Context.Request.Headers[JWTDefaults.AccessHeaderName];
            this.Context.Response.Headers[JWTDefaults.RefrashHeaderName] = this.Context.Request.Headers[JWTDefaults.RefrashHeaderName];
        }

        private void DeleteTokens()
        {
            Context.Response.Headers.Remove(JWTDefaults.AccessHeaderName);
            Context.Response.Headers.Remove(JWTDefaults.RefrashHeaderName);
        }
        private void AppendTokens(string access, string refrash)
        {
            Context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            Context.Response.Headers[JWTDefaults.RefrashHeaderName] = refrash;
        }
    }
}
