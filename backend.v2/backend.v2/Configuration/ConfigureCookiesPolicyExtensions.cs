using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace backend.v2.Configuration
{
    public static class ConfigureCookiesPolicyExtensions
    {
        public static void ConfigureCookiesPolicy(this IServiceCollection services)
        {

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Strict;
                options.HttpOnly = HttpOnlyPolicy.Always;
            });
        }
    }
}