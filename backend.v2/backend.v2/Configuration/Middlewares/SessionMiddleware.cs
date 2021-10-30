using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
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

        public async Task InvokeAsync(
            HttpContext context,
            ISessionService sessionService,
            IUserSession userSession,
            IJWTTokenManager manager,
            ILogger<SessionMiddleware> logger
        )
        {
            await next(context);

            await this.SaveSession(context, sessionService, userSession, manager, logger);
        }

        public virtual async Task SaveSession(
            HttpContext context,
            ISessionService sessionService,
            IUserSession userSession,
            IJWTTokenManager tokenManager,
            ILogger<SessionMiddleware> logger)
        {
            var session = userSession.Session;

            if (session == null)
            {
                logger.LogDebug("Empty session");
                return;
            }

            if (context.Response.Headers.ContainsKey(JWTDefaults.RefreshHeaderName))
            {
                session.ValidityExpired = tokenManager.NextRefreshTime;

                await sessionService.Update(session);

                logger.LogDebug("Session updated");
            }
        }
    }
}