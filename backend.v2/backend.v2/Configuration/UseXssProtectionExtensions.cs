using Microsoft.AspNetCore.Builder;

namespace backend.v2.Configuration
{
    public static class UseCustomSessionExtensions
    {
        public static void UseXssProtection(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Xss-Protection", "1");
                await next();
            });
        }
    }
}