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
        Task SignInAsync(ClaimsPrincipal principal);
    }
    
    public class SignInService: ISignInService
    {

        private IJWTTokenService tokenService;
        private ISessionService sessionService;
        private IUserSession userSession;
        private ILogger<SignInService> logger;
        
        public SignInService(
            IJWTTokenService tokenService, 
            ISessionService sessionService, 
            IUserSession userSession, 
            ILogger<SignInService> logger
        ) {
            this.tokenService = tokenService;
            this.sessionService = sessionService;
            this.userSession = userSession;
            this.logger = logger;
        }
        
        public async Task SignInAsync(ClaimsPrincipal principal)
        {
            try
            {
                await Task.Run(() => this.SetTokens(principal));

                this.userSession.Session = await CreateSession(sessionService, principal);

                this.logger.LogDebug("Signed In");
            }
            catch (Exception ex)
            {
                this.logger.LogError("Sign In Error", ex);
            }
        }
        
        public virtual void SetTokens(ClaimsPrincipal principal) {
            var userId = long.Parse(principal.FindFirstValue(ClaimTypes.NameIdentifier));
            var sessionGuid = Guid.NewGuid();
            
            this.AppendClaim(principal, sessionGuid);

            var accessToken = this.tokenService.GetAccessToken(sessionGuid, userId);
            var refreshToken = this.tokenService.GetRefreshToken(sessionGuid, userId);

            this.tokenService.AppendTokens(accessToken, refreshToken);
        }
        
        private void AppendClaim(ClaimsPrincipal principal, Guid guid)
        {
            principal.AddIdentity(new ClaimsIdentity(new [] { new Claim(ClaimTypes.Sid, guid.ToString()) }));
        }
        
        public virtual async Task<Session> CreateSession(ISessionService sessionService, ClaimsPrincipal principal)
        {
            var sId = principal.FindFirstValue(ClaimTypes.Sid);
            
            var session = new Session()
            {
                Guid = new Guid(sId)
            };

            return await sessionService.Save(session);
        }
    }
}