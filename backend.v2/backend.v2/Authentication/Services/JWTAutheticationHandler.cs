using System;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.v2.Authentication.Models;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Models.Authentication;
using backend.v2.Services;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationHandler : AuthenticationHandler<JWTAuthenticationOptions>
    {
        private readonly IJWTTokenService tokenService;
        private readonly IUserSession userSession;
        private readonly IUserService userService;
        private readonly ISessionService sessionService;
        private readonly ILogger<JWTAuthenticationService> logger;

        public JWTAuthenticationHandler(
            IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory loggerFactory,
            UrlEncoder encoder,
            ISystemClock clock,
            IUserSession userSession,
            IUserService userService,
            ISessionService sessionService,
            IJWTTokenService tokenService,
            ILogger<JWTAuthenticationService> logger
        ) : base(options, loggerFactory, encoder, clock)
        {
            this.userSession = userSession;
            this.userService = userService;
            this.tokenService = tokenService;
            this.sessionService = sessionService;
            this.logger = logger;
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
                var tokenData = this.tokenService.AuthenticateByTokens(token);

                await this.CheckSession(tokenData.SessionGuid);

                var ticket = await this.Authenticate(tokenData);

                return AuthenticateResult.Success(ticket);
            }
            catch (AuthenticationException e)
            {
                if (e.Message == "Token expired")
                {
                    return AuthenticateResult.Fail(e.Message);
                }
                if (e.Message == "Session expired")
                {
                    this.logger.LogInformation($"Session with guid: {e.SessionGuid.Value} was expired at {e.Token?.ValidityDate}");
                    await this.DeleteSession(e.SessionGuid.Value);
                    return AuthenticateResult.Fail(e.Message);
                }
            }
            catch (Exception e)
            {
                this.logger.LogError($"Could not work with token", e);
                return AuthenticateResult.Fail(new Exception("Token error", e));
            }

            return AuthenticateResult.NoResult();
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

        private async Task DeleteSession(Guid guid)
        {
            await this.sessionService.Delete(guid);
        }

        private async Task CheckSession(Guid guid)
        {
            var session = await this.sessionService.Get(guid);

            if (session == null)
            {
                this.logger.LogInformation($"Could not find session for guid: {guid}");
                throw new Exception("Could not find session");
            }

            this.userSession.Session = session;
        }
    }
}
