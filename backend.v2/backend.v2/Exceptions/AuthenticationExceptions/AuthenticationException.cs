using System;

namespace backend.v2.Exceptions.AuthenticationExceptions
{
    public class AuthenticationException: Exception
    {
        public Guid? SessionGuid { get; set; }

        public AuthenticationException(string message) : base(message)
        {
        }

        public AuthenticationException(string message, Guid sessionGuid) : base(message)
        {
            this.SessionGuid = sessionGuid;
        }

        public AuthenticationException(string message, Guid sessionGuid, Exception inner) : base(message, inner)
        {
            this.SessionGuid = sessionGuid;
        }
    }
}