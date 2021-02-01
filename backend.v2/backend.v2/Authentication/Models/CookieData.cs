using System;

namespace backend.v2.Authentication.Models
{
    public class CookieData
    {
        public Guid Guid {get; set;}
        public DateTime AccessExpired {get; set;}
        public DateTime RefreshExpired {get; set;}

        public string TokenData {get; set;}
    }
}
