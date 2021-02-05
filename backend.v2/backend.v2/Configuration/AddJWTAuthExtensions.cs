using System;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace backend.v2.Configuration
{
    public static class AddJWTAuthExtensions
    {
        public static AuthenticationBuilder AddJWT<TAuthService>(this AuthenticationBuilder builder)
        where TAuthService : class, IAuthenticationService
        {
            return AddJWT<TAuthService>(builder, JWTDefaults.AuthenticationScheme, _ => { });
        }

        public static AuthenticationBuilder AddJWT<TAuthService>(this AuthenticationBuilder builder, string authenticationScheme)
            where TAuthService : class, IAuthenticationService
        {
            return AddJWT<TAuthService>(builder, authenticationScheme, _ => { });
        }

        public static AuthenticationBuilder AddJWT<TAuthService>(this AuthenticationBuilder builder, Action<JWTAuthenticationOptions> configureOptions)
            where TAuthService : class, IAuthenticationService
        {
            return AddJWT<TAuthService>(builder, JWTDefaults.AuthenticationScheme, configureOptions);
        }

        public static AuthenticationBuilder AddJWT<TAuthService>(this AuthenticationBuilder builder, string authenticationScheme, Action<JWTAuthenticationOptions> configureOptions)
            where TAuthService : class, IAuthenticationService
        {
            builder.Services.AddSingleton<IPostConfigureOptions<JWTAuthenticationOptions>, JWTAuthenticationPostConfigureOptions>();
            builder.Services.AddTransient<IAuthenticationService, TAuthService>();

            return builder.AddScheme<JWTAuthenticationOptions, JWTAuthenticationHandler>(authenticationScheme, configureOptions);
        }
    }
}