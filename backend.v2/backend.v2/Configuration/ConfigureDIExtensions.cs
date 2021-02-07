using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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

            services.AddScoped<IAuthenticationService, JWTAuthenticationService>();
            services.AddSingleton<ISessionService, SessionService>();
            services.AddSingleton<IJWTTokenManager, JWTTokenManager>();
            services.AddSingleton<IPostConfigureOptions<JWTAuthenticationOptions>, JWTAuthenticationPostConfigureOptions>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }
    }
}