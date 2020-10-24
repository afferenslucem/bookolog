using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using backend.Storages;
using backend.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore;
using Swashbuckle.Swagger;
using Microsoft.AspNetCore.Http.Features;

namespace backend
{
    public class Startup
    {
        string corsPolicy = "default";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.ReadConfig();

            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicy, builder => builder
                    .WithOrigins(Config.AllowedOrigins)
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(14);
                options.SlidingExpiration = true;
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(o =>
            {
                o.LoginPath = new PathString("/Auth/Login/");
                o.Cookie.Path = "/";
                o.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                o.Cookie.HttpOnly = true;
                o.LogoutPath = new PathString("/Auth/Logout/");

                o.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Task.CompletedTask;
                    },
                };
            });

            services.AddDistributedMemoryCache();
            
            services.Configure<FormOptions>(options =>
            {
                options.MemoryBufferThreshold = 2 * 1024 * 1024;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddSession(options =>
            {
                options.Cookie.IsEssential = true;
            });

            services.AddControllers();

            services.AddDbContext<BookologContext>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileSystemService, FileSystemService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IUserSession, UserSession>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IFileService, FileService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseCors(corsPolicy);

            app.UseRouting();

            app.UseSession();

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
        }
    }
}
