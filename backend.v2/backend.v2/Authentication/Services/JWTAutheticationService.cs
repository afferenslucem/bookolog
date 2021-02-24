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
        private readonly IJWTTokenManager tokenManager;

        public JWTAuthenticationService(
            IAuthenticationSchemeProvider schemes,
            IAuthenticationHandlerProvider handlers,
            IClaimsTransformation transform,
            IOptions<AuthenticationOptions> options,
            IJWTTokenManager tokenManager,
            ISessionService sessionService,
            ILogger<JWTAuthenticationService> logger
            ): base(schemes, handlers, transform, options)
        {
            this.tokenManager = tokenManager;
            this.sessionService = sessionService;
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
            await Task.Run(() => this.SetTokens(context, principal));
            this.logger.LogDebug("Logged in successful");
        }

        public override async Task SignOutAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            await Task.Run(() => this.RemoveTokens(context));
            this.RemoveSession(context);
            this.logger.LogDebug("Logged out successful");
        }

        private void RemoveSession(HttpContext context) {
            var sId = context.User.FindFirstValue(ClaimTypes.Sid);

            if (sId != null) {
                var guid = new Guid(sId);

                _ = this.sessionService.Delete(guid);
            }
        }

        private void SetTokens(HttpContext context, ClaimsPrincipal principal) {
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            var sessionGuid = Guid.NewGuid();

            var tokenData = this.GetTokenData(sessionGuid, long.Parse(userId));

            var accessToken = this.GetAccessToken(tokenData);
            var refrashToken = this.GetRefrashToken(tokenData);

            this.AppendTokens(context, accessToken, refrashToken);
        }

        private TokenData GetTokenData(Guid sessionGuid, long userId) {
            return new TokenData() {
                UserId = userId,
                SessionGuid = sessionGuid,
            };
        }

        private string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.GenerateToken(data);
        }

        private string GetRefrashToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefrashTime;

            return tokenManager.GenerateToken(data);
        }

        private void AppendTokens(HttpContext context, string access, string refrash) {
            context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            context.Response.Headers[JWTDefaults.RefrashHeaderName] = refrash;
        }
        private void RemoveTokens(HttpContext context) {
            context.Response.Headers.Remove(JWTDefaults.AccessHeaderName);
            context.Response.Headers.Remove(JWTDefaults.RefrashHeaderName);
        }
    }
}