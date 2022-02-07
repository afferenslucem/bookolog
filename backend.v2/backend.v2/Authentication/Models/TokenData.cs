using System;

namespace backend.v2.Authentication.Models
{
    public enum TokenType
    {
        Access = 0,
        Refresh = 1
    }

    public class TokenData
    {
        public Guid SessionGuid { get; set; }
        public long UserId { get; set; }
        public virtual DateTime ValidityDate { get; set; }
        public TokenType Type { get; set; }
    }
}