using System;

namespace backend.v2.Exceptions.AuthenticationExceptions
{
    public class RegistrationException: Exception
    {
        public RegistrationException(string message) : base(message) {}
    }
}