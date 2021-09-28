namespace backend.v2.Authentication.Models
{
    public class JWTDefaults
    {
        public const string AuthenticationScheme = "JWT";
        
        public const string CookieName = ".AspNetCore.History";

        public const string AccessHeaderName = "X-Authentication-Access-Token";
        public const string RefreshHeaderName = "X-Authentication-Refresh-Token";
        public const string TokenHeaderName = "X-Authentication-Token";

    }
}