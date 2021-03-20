using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services.Actions;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationService : AuthenticationService, IAuthenticationService
    {
        private readonly ISignInService signInService;
        private readonly ISignOutService signOutService;

        public JWTAuthenticationService(
            IAuthenticationSchemeProvider schemes,
            IAuthenticationHandlerProvider handlers,
            IClaimsTransformation transform,
            IOptions<AuthenticationOptions> options,
            ISignInService signInService,
            ISignOutService signOutService
            ): base(schemes, handlers, transform, options)
        {
            this.signInService = signInService;
            this.signOutService = signOutService;
        }

        public override async Task ChallengeAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            if (context.Response.StatusCode == 409) return;

            await base.ChallengeAsync(context, scheme, properties);
        }

        public override Task ForbidAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            context.Response.StatusCode = 403;
            return Task.CompletedTask;
        }

        public override async Task SignInAsync(HttpContext context, string scheme, ClaimsPrincipal principal, AuthenticationProperties properties)
        {
            await this.signInService.SignInAsync(context, principal);
        }

        public override async Task SignOutAsync(HttpContext context, string scheme, AuthenticationProperties properties)
        {
            await this.signOutService.SignOutAsync(context);
        }
    }
}
