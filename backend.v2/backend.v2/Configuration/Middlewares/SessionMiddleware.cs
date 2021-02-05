using System;
using System.Threading.Tasks;
using backend.v2.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace backend.v2.Configuration.Middlewares
{
    public class SessionMiddleware
    {
        private readonly RequestDelegate next;

        public SessionMiddleware(
            RequestDelegate next
        ) {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context, ISessionService sessionService, IUserSession userSession, ILogger<SessionMiddleware> logger)
        {
            await next(context);

            await this.SaveSession(sessionService, userSession, logger);
        }

        private async Task SaveSession(ISessionService sessionService, IUserSession userSession, ILogger<SessionMiddleware> logger) {
            var session = userSession.Session;

            if (session == null){
                logger.LogDebug("Empty session");
                return;
            }

            try {
                await sessionService.UpdateState(session);
                logger.LogDebug("Session updated");
            } catch (Exception ex) {
                logger.LogError("Could not update session", ex.Message, ex);
            }
        }
    }
}