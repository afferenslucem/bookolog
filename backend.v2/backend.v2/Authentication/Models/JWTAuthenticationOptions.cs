using System;
using Microsoft.AspNetCore.Authentication;

namespace backend.v2.Authentication.Models
{
    public class JWTAuthenticationOptions : AuthenticationSchemeOptions
    {
        public Guid Guid { get; set; }
        public DateTime AccessExpired { get; set; }
        public DateTime RefreshExpired { get; set; }

        public string TokenData { get; set; }
    }
}
