using Microsoft.AspNetCore.Builder;

namespace backend.v2.Configuration
{
    public static class UseDenyFrameMiddlewareExtensions
    {
        public static void UseDenyFrameProtection(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Frame-Options", "DENY");
                await next();
            });
        }
    }
}