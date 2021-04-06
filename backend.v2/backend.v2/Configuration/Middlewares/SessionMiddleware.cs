using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace backend.v2.Configuration.Middlewares
{
    public class SessionMiddleware
    {
        private readonly RequestDelegate next;

        public SessionMiddleware(
            RequestDelegate next
        )
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context, ISessionService sessionService, IUserSession userSession, ILogger<SessionMiddleware> logger)
        {
            await next(context);

            await this.SaveSession(sessionService, userSession, logger);
        }

        public virtual async Task SaveSession(ISessionService sessionService, IUserSession userSession, ILogger<SessionMiddleware> logger)
        {
            var session = userSession.Session;

            if (session == null)
            {
                logger.LogDebug("Empty session");
                return;
            }

            try
            {
                session.ValidityExpired = this.SessionLifeTime;
                await sessionService.Update(session);
                logger.LogDebug("Session updated");
            }
            catch (Exception ex)
            {
                logger.LogError("Could not update session", ex.Message, ex);
            }
        }

        public virtual DateTime SessionLifeTime
        {
            get
            {
                return DateTime.Now.AddSeconds(Config.Cookie.RefrashTimeSeconds);
            }
        }
    }
}