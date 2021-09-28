using System;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.v2.Authentication.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationHandler : AuthenticationHandler<JWTAuthenticationOptions>
    {
        private readonly IAuthenticationService authenticationService;
        private readonly IJWTTokenManager tokenManager;
        private readonly IUserSession userSession;
        private readonly IUserService userService;
        private readonly ISessionService sessionService;

        public JWTAuthenticationHandler(
            IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthenticationService authenticationService,
            IUserSession userSession,
            IUserService userService,
            ISessionService sessionService,
            IJWTTokenManager tokenManager,
            ILogger<JWTAuthenticationService> jwtLogger
        ) : base(options, logger, encoder, clock)
        {
            this.userSession = userSession;
            this.userService = userService;
            this.tokenManager = tokenManager;
            this.sessionService = sessionService;
            this.authenticationService = authenticationService;
        }
        
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            return await HandleAuthenticate();
        }

        public async Task<AuthenticateResult> HandleAuthenticate()
        {
            if (!Context.Request.Headers.ContainsKey(JWTDefaults.TokenHeaderName))
            {
                return AuthenticateResult.NoResult();
            }

            var token = Context.Request.Headers[JWTDefaults.TokenHeaderName];

            return await this.AuthenticateByTokens(token);
        }

        public async Task<AuthenticateResult> AuthenticateByTokens(string token)
        {
            try
            {
                var tokenData = this.tokenManager.DecodeToken(token);
                
                if (tokenData.Type == TokenType.Access && tokenData.ValidityDate < this.Clock.UtcNow)
                {
                    return AuthenticateResult.Fail("Token expired");
                } 
                
                if (tokenData.Type == TokenType.Refresh && tokenData.ValidityDate < this.Clock.UtcNow)
                {
                    await this.DeleteSession(tokenData.SessionGuid);
                    return AuthenticateResult.Fail("Token expired");
                }
                
                if (tokenData.Type == TokenType.Refresh && tokenData.ValidityDate >= this.Clock.UtcNow)
                {
                    var accessToken = this.GetAccessToken(tokenData);
                    var refreshToken = this.GetRefreshToken(tokenData);
                    
                    this.AppendTokens(accessToken, refreshToken);
                }

                await this.CheckSession(tokenData.SessionGuid);

                var ticket = await this.Authenticate(tokenData);

                return AuthenticateResult.Success(ticket);
            }
            catch (Exception e)
            {
                return AuthenticateResult.Fail(new Exception("Cookies error", e));
            }
        }
        
        public virtual string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.EncodeToken(data);
        }

        public virtual string GetRefreshToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefreshTime;

            return tokenManager.EncodeToken(data);
        }

        public virtual async Task<AuthenticationTicket> Authenticate(TokenData data)
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

        public virtual async Task DeleteSession(Guid guid)
        {
            await this.sessionService.Delete(guid);
        }
        
        public virtual void AppendTokens(string access, string refresh)
        {
            Context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            Context.Response.Headers[JWTDefaults.RefreshHeaderName] = refresh;
        }

        public virtual async Task CheckSession(Guid guid)
        {
            var session = await this.sessionService.Get(guid);

            if (session == null)
            {
                throw new Exception("Could not find session");
            }

            this.userSession.Session = session;
        }
    }
}
