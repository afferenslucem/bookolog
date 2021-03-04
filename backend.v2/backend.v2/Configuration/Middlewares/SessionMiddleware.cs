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
            await this.LoadSession(context, sessionService, userSession, logger);

            await next(context);

            _ = this.SaveSession(sessionService, userSession, logger);
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

        public virtual async Task LoadSession(HttpContext context, ISessionService sessionService, IUserSession userSession, ILogger<SessionMiddleware> logger)
        {
            try
            {
                var sId = context.User.FindFirst(ClaimTypes.Sid);
                
                if (sId == null) return;

                var sessionGuid = new Guid(sId.Value);

                var session = await this.GetSession(sessionService, sessionGuid) ??
                    await CreateSession(sessionService, sessionGuid);

                userSession.Session = session;
            }
            catch (Exception ex)
            {
                logger.LogError("Could not find session", ex.Message, ex);
            }
        }

        public virtual async Task<Session> GetSession(ISessionService sessionService, Guid guid) {
            return await sessionService.Get(guid);
        }

        public virtual async Task<Session> CreateSession(ISessionService sessionService, Guid guid)
        {
            var session = new Session()
            {
                Guid = guid,
                ValidityExpired = this.SessionLifeTime
            };

            return await sessionService.Save(session);
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