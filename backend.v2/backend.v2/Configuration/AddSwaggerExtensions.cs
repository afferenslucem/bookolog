using System;
using System.IO;
using backend.v2.Configuration.SwaggerFilters;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.Swagger;

namespace backend.v2.Configuration
{
    public static class AddSwaggerExtensions
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SchemaFilter<SwaggerIgnoreFilter>();
                c.DocumentFilter<SwaggerIgnoreFilter>();
                c.SwaggerDoc(Version.Info.Version, Version.Info);
                c.IncludeXmlComments(GetXMLPath());
            });
            
        }

        private static string GetXMLPath()
        {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "swagger.xml");
        }
    }
}