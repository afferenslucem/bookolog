using System;
using backend.v2.Authentication.Models;

namespace backend.v2.Exceptions.AuthenticationExceptions
{
    public class AuthenticationException: Exception
    {
        public Guid? SessionGuid
        {
            get
            {
                return this.Token?.SessionGuid;
            }
        }

        public TokenData Token { get; set; }

        public AuthenticationException(string message, TokenData token) : base(message)
        {
            this.Token = token;
        }
    }
}