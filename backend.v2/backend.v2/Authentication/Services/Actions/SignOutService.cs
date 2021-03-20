using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace backend.v2.Authentication.Services.Actions
{
    public interface ISignOutService
    {
        Task SignOutAsync(HttpContext context);
    }
    
    public class SignOutService: ISignOutService
    {
        protected readonly ISessionService sessionService;
        private readonly ILogger<SignOutService> logger;

        public SignOutService(ISessionService sessionService, ILogger<SignOutService> logger)
        {
            this.sessionService = sessionService;
            this.logger = logger;
        }
        
        public async Task SignOutAsync(HttpContext context)
        {
            try
            {
                await Task.Run(() => this.RemoveTokens(context));
                this.RemoveSession(context);

                this.logger.LogDebug("Signed Out");
            }
            catch (Exception ex)
            {
                this.logger.LogError("Sign Out Error", ex);
            }
        }

        public virtual void RemoveSession(HttpContext context) {
            var sId = context.User.FindFirstValue(ClaimTypes.Sid);

            if (sId != null) {
                var guid = new Guid(sId);

                _ = this.sessionService.Delete(guid);
            }
        }   

        public virtual void RemoveTokens(HttpContext context) {
            context.Response.Headers.Remove(JWTDefaults.AccessHeaderName);
            context.Response.Headers.Remove(JWTDefaults.RefreshHeaderName);
        }
    }
}