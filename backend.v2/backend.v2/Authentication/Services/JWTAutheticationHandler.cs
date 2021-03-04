using System;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.v2.Authentication.Models;
using backend.v2.Services;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationHandler : AuthenticationHandler<JWTAuthenticationOptions>
    {
        private readonly IAuthenticationService authenticationService;
        private readonly IJWTTokenManager tokenManager;
        private readonly IUserSession userSession;
        private readonly IUserService userService;

        public JWTAuthenticationHandler(
            IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthenticationService authenticationService,
            IUserSession userSession,
            IUserService userService,
            IJWTTokenManager tokenManager,
            ILogger<JWTAuthenticationService> jwtLogger
        ) : base(options, logger, encoder, clock)
        {
            this.tokenManager = tokenManager;
            this.userSession = userSession;
            this.userService = userService;
            this.authenticationService = authenticationService;
        }
        
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            return await HandleAuthenticate();
        }

        public async Task<AuthenticateResult> HandleAuthenticate()
        {
            if (!Context.Request.Headers.ContainsKey(JWTDefaults.AccessHeaderName) ||
                !Context.Request.Headers.ContainsKey(JWTDefaults.RefreshHeaderName))
            {
                return AuthenticateResult.NoResult();
            }

            var accessToken = Context.Request.Headers[JWTDefaults.AccessHeaderName];
            var refreshToken = Context.Request.Headers[JWTDefaults.RefreshHeaderName];

            return await this.AuthenticateByTokens(accessToken, refreshToken);
        }

        public async Task<AuthenticateResult> AuthenticateByTokens(string accessToken, string refreshToken)
        {
            try
            {
                var refreshTokenData = this.tokenManager.DecodeToken(refreshToken);
                if (refreshTokenData.ValidityDate < this.Clock.UtcNow)
                {
                    this.OnRefreshExpired();
                    return AuthenticateResult.NoResult();
                }
                
                var accessTokenData = this.tokenManager.DecodeToken(accessToken);
                if (accessTokenData.ValidityDate < this.Clock.UtcNow)
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
                return AuthenticateResult.Fail("Cookies error");
            }
        }

        public virtual void OnRefreshExpired()
        {
            this.DeleteTokens();
        }

        public virtual void OnAccessExpired(TokenData data)
        {
            var accessToken = this.GetAccessToken(data);
            var refreshToken = this.GetRefreshToken(data);

            this.RenewTokens(accessToken, refreshToken);
        }
        
        public virtual string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.EncodeToken(data);
        }

        public virtual string GetRefreshToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefreshTime;

            return tokenManager.EncodeToken(data);
        }

        public async Task<AuthenticationTicket> Authenticate(TokenData data)
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

        public virtual void RenewTokens(string access, string refresh)
        {
            this.AppendTokens(access, refresh);
        }

        public virtual void CopyTokens() {
            this.Context.Response.Headers[JWTDefaults.AccessHeaderName] = this.Context.Request.Headers[JWTDefaults.AccessHeaderName];
            this.Context.Response.Headers[JWTDefaults.RefreshHeaderName] = this.Context.Request.Headers[JWTDefaults.RefreshHeaderName];
        }

        public virtual void DeleteTokens()
        {
            Context.Response.Headers.Remove(JWTDefaults.AccessHeaderName);
            Context.Response.Headers.Remove(JWTDefaults.RefreshHeaderName);
        }
        public virtual void AppendTokens(string access, string refresh)
        {
            Context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            Context.Response.Headers[JWTDefaults.RefreshHeaderName] = refresh;
        }
    }
}
