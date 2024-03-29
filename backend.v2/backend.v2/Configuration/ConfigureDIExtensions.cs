using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
namespace backend.v2.Configuration
{
    public static class ConfigureDIExtensions
    {
        public static void ConfigureDI(this IServiceCollection services)
        {

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileSystemService, FileSystemService>();
            services.AddScoped<IConfigService, ConfigService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<ICollectionService, CollectionService>();
            services.AddScoped<IUserSession, UserSession>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IFileService, FileService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }
    }
}