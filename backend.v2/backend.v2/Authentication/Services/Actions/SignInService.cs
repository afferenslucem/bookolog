using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace backend.v2.Authentication.Services.Actions
{
    public interface ISignInService
    {
        Task SignInAsync(HttpContext context, ClaimsPrincipal principal);
    }
    
    public class SignInService: ISignInService
    {
        public virtual DateTime SessionLifeTime
        {
            get
            {
                return DateTime.Now.AddSeconds(Config.Cookie.RefrashTimeSeconds);
            }
        }
        
        private IJWTTokenManager tokenManager;
        private ISessionService sessionService;
        private IUserSession userSession;
        private ILogger<SignInService> logger;
        
        public SignInService(
            IJWTTokenManager tokenManager, 
            ISessionService sessionService, 
            IUserSession userSession, 
            ILogger<SignInService> logger
        ) {
            this.tokenManager = tokenManager;
            this.sessionService = sessionService;
            this.userSession = userSession;
            this.logger = logger;
        }
        
        public async Task SignInAsync(HttpContext context, ClaimsPrincipal principal)
        {
            try
            {
                await Task.Run(() => this.SetTokens(context, principal));

                this.userSession.Session = await CreateSession(sessionService, principal);

                this.logger.LogDebug("Signed In");
            }
            catch (Exception ex)
            {
                this.logger.LogError("Sign In Error", ex);
            }
        }
        
        public virtual void SetTokens(HttpContext context, ClaimsPrincipal principal) {
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            var sessionGuid = Guid.NewGuid();
            
            this.AppendClaim(principal, sessionGuid);

            var tokenData = this.GetTokenData(sessionGuid, long.Parse(userId));

            var accessToken = this.GetAccessToken(tokenData);
            var refreshToken = this.GetRefreshToken(tokenData);

            this.AppendTokens(context, accessToken, refreshToken);
        }
        
        private void AppendClaim(ClaimsPrincipal principal, Guid guid)
        {
            principal.AddIdentity(new ClaimsIdentity(new [] { new Claim(ClaimTypes.Sid, guid.ToString()) }));
        }
        
        public string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.EncodeToken(data);
        }

        public string GetRefreshToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefreshTime;

            return tokenManager.EncodeToken(data);
        }
        
        private TokenData GetTokenData(Guid sessionGuid, long userId) {
            return new TokenData() {
                UserId = userId,
                SessionGuid = sessionGuid,
            };
        }
        
        private void AppendTokens(HttpContext context, string access, string refresh) {
            context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            context.Response.Headers[JWTDefaults.RefreshHeaderName] = refresh;
        }
        
        public virtual async Task<Session> CreateSession(ISessionService sessionService, ClaimsPrincipal principal)
        {
            var sId = principal.FindFirstValue(ClaimTypes.Sid);
            
            var session = new Session()
            {
                Guid = new Guid(sId),
                ValidityExpired = this.SessionLifeTime
            };

            return await sessionService.Save(session);
        }
    }
}