using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.Models.Authentication;
using backend.v2.Utils;
using backend.v2.Authentication.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace backend.v2.Authentication.Services
{
public class JWTAuthenticationHandler : AuthenticationHandler<JWTAuthenticationOptions>
    {
        private readonly ILogger<JWTAuthenticationService> logger;
        private readonly IAuthenticationService authenticationService;

        public JWTAuthenticationHandler(IOptionsMonitor<JWTAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthenticationService authenticationService
            )
            : base(options, logger, encoder, clock)
        {
            this.authenticationService = authenticationService;
        }
        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            return this.authenticationService.AuthenticateAsync(Request.HttpContext, JWTDefaults.AuthenticationScheme);
        }
    }
}
