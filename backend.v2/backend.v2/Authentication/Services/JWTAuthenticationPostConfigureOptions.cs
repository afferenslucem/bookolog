using System;
using backend.v2.Authentication.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace backend.v2.Authentication.Services
{
    public class JWTAuthenticationPostConfigureOptions : IPostConfigureOptions<JWTAuthenticationOptions>
    {
        public void PostConfigure(string name, JWTAuthenticationOptions options)
        {
            //
        }
    }
}
