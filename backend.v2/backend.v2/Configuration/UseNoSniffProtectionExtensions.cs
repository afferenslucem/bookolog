using Microsoft.AspNetCore.Builder;

namespace backend.v2.Configuration
{
    public static class UseNoSniffProtectionExtensions
    {
        public static void UseNoSniffProtection(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
                await next();
            });
        }
    }
}