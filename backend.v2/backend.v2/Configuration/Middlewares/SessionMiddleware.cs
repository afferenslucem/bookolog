using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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

        public async Task InvokeAsync(
            HttpContext context,
            IUserSession userSession,
            IUserService userService,
            ILogger<SessionMiddleware> logger
        )
        {
            await this.SaveSession(context, userSession, userService, logger);
            
            await next(context);
        }

        public virtual async Task SaveSession(
            HttpContext context,
            IUserSession userSession,
            IUserService userService,
            ILogger<SessionMiddleware> logger)
        {

            var idClaim = context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;

            var id = 0;

            if (int.TryParse(idClaim, out id))
            {
                userSession.User = await userService.GetById(id);
            }
        }
    }
}