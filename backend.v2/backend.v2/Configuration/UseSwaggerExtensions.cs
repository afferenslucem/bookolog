using System;
using Microsoft.AspNetCore.Builder;

namespace backend.v2.Configuration
{
    public static class UseSwaggerExtensions
    {
        public static void UseSwaggerDoc(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                 c.SwaggerEndpoint($"/swagger/{Version.Info.Version}/swagger.json",
                        $"Bookolog API {Version.BuildVersion}");
            });
        }
    }
}