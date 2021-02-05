using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace backend.v2.Configuration
{
    public static class AddCorsExtensions
    {
        public static void AddCorsRules(this IServiceCollection services, string corsPolicy)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicy, builder => builder
                    .WithOrigins(Config.AllowedOrigins)
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }
    }
}