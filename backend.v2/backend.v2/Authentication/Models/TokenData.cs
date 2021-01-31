using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace backend.v2.Authentication.Models
{
    public class TokenData
    {
        public long UserId { get; set; }
        public string Login {get; set; }
    }
}
