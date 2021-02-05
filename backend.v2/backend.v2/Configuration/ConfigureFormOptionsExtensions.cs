using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;

namespace backend.v2.Configuration
{
    public static class ConfigureFormOptionsExtensions
    {
        public static void ConfigureFormOptions(this IServiceCollection services)
        {
            services.Configure<FormOptions>(options =>
            {
                options.MemoryBufferThreshold = 2 * 1024 * 1024;
            });
        }
    }
}