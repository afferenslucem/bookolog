using System;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using backend.v2.Configuration;
using backend.v2.Configuration.Middlewares;
using backend.v2.Storages;
using backend.v2.Configuration.RequestFormatters;
using Microsoft.AspNetCore.Authentication.Cookies;

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
            services.AddCorsRules(corsPolicy);

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.ExpireTimeSpan = TimeSpan.FromHours(24 * 7);
                    options.SlidingExpiration = true;
                    options.AccessDeniedPath = "/Forbidden/";
                });

            services.AddMvc(o => o.InputFormatters.Insert(0, new RawRequestBodyFormatter()));
            services.ConfigureFormOptions();
            
            services.ConfigureCookiesPolicy();

            services
                .AddControllers()
                .AddNewtonsoftJson();

            services.AddSwagger();

            services.AddDbContext<BookologContext>();

            services.ConfigureDI();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            this.ReadConfig(env);
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(corsPolicy);

            app.UseRouting();
            
            app.UseSwaggerDoc();

            app.UseXssProtection();
            app.UseNoSniffProtection();
            app.UseDenyFrameProtection();

            app.UseMiddleware<SessionMiddleware>();
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
        public void ReadConfig(IWebHostEnvironment env)
        {
            Config.IsProduction = env.IsProduction();
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
