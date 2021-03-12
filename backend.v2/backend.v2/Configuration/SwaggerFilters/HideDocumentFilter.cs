using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.Http.Description;
using backend.v2.Configuration.Attributes;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.Swagger;
using IDocumentFilter = Swashbuckle.AspNetCore.SwaggerGen.IDocumentFilter;
using ISchemaFilter = Swashbuckle.AspNetCore.SwaggerGen.ISchemaFilter;

namespace backend.v2.Configuration.SwaggerFilters
{
    public class SwaggerIgnoreFilter : ISchemaFilter, IDocumentFilter
    {
        internal static string ToCamelCase(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return char.ToLowerInvariant(value[0]) + value.Substring(1);
        }

        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (schema.Properties.Count == 0)
                return;

            const BindingFlags bindingFlags = BindingFlags.Public |
                                              BindingFlags.NonPublic |
                                              BindingFlags.Instance;
            var memberList = context.Type
                .GetFields(bindingFlags)
                .Cast<MemberInfo>()
                .Concat(context.Type.GetProperties(bindingFlags));

            var excludedList = memberList.Where(m => m.GetCustomAttribute<SwaggerIgnoreAttribute>() != null)
                .Select(m => m.GetCustomAttribute<JsonPropertyAttribute>()?.PropertyName ?? ToCamelCase(m.Name));

            foreach (var excludedName in excludedList)
            {
                if (schema.Properties.ContainsKey(excludedName))
                    schema.Properties.Remove(excludedName);
            }
        }

        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Components.Schemas.Remove(typeof(File).Name);
        }
    }
}