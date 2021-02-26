using System;

namespace backend.v2.Authentication.Models
{
    public class TokenData
    {
        public Guid SessionGuid { get; set; }
        public long UserId { get; set; }
        public DateTime ValidityDate { get; set; }
    }
}
