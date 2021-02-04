using System;
using System.Net;
using System.Threading.Tasks;
using backend.Storages;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Authentication;

using Microsoft.Extensions.Options;
using backend.v2.Configuration;
using Microsoft.AspNetCore.CookiePolicy;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace backend.v2
{
    public class Startup
    {
        private const string corsPolicy = "default";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.ReadConfig();

            services.AddCorsRules(corsPolicy);

            services
            .AddAuthentication(JWTDefaults.AuthenticationScheme)
            .AddJWT<JWTAuthenticationService>();

            services.Configure<FormOptions>(options =>
            {
                options.MemoryBufferThreshold = 2 * 1024 * 1024;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Strict;
                options.HttpOnly = HttpOnlyPolicy.Always;
            });
            
            services.AddControllers();

            services.AddDbContext<BookologContext>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileSystemService, FileSystemService>();
            services.AddScoped<IConfigService, ConfigService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<ICollectionService, CollectionService>();
            services.AddScoped<IUserSession, UserSession>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IFileService, FileService>();

            services.AddSingleton<ISessionService, SessionService>();
            services.AddScoped<IAuthenticationService, JWTAuthenticationService>();
            services.AddSingleton<IPostConfigureOptions<JWTAuthenticationOptions>, JWTAuthenticationPostConfigureOptions>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(corsPolicy);

            app.UseRouting();

            app.UseXssProtection();
            app.UseNoSniffProtection();
            app.UseDenyFrameProtection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            this.UpdateDatabase(app);
        }

        private void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<BookologContext>())
                {
                    context.Database.Migrate();
                }
            }
        }
        public void ReadConfig()
        {
            Config.ConnectionString = this.Configuration.GetConnectionString("DefaultConnection");
            Config.AllowedOrigins = this.Configuration.GetSection("AllowedOrigins").Get<string[]>();
            Config.FileStorage.StoragePath = this.Configuration.GetValue<string>("FileStorage:StoragePath");
            Config.FileStorage.AllowedExtensions = this.Configuration.GetSection("FileStorage:AllowedExtensions").Get<string[]>();
            Config.SMTP.Host = this.Configuration.GetValue<string>("SMTP:Host");
            Config.SMTP.Port = this.Configuration.GetValue<int>("SMTP:Port");
            Config.SMTP.From = this.Configuration.GetValue<string>("SMTP:From");
            Config.SMTP.User = this.Configuration.GetValue<string>("SMTP:User");
            Config.SessionChiper.Key = this.Configuration.GetValue<string>("SessionCipher:Key");
            Config.SessionChiper.Salt = this.Configuration.GetValue<string>("SessionCipher:Salt");
            Config.Cookie.AcceptTimeSeconds = this.Configuration.GetValue<long>("Cookies:AcceptTimeSeconds");
            Config.Cookie.RefrashTimeSeconds = this.Configuration.GetValue<long>("Cookies:RefrashTimeSeconds");
        }
    }
}
