using backend.v2.Models;
using backend.v2.Models.Authentication;

namespace backend.v2.Authentication.Models
{
    public class SessionResolveData
    {
        public Session NewSession {get; set;}
        public Session Session {get; set;}
        public User User {get; set;}
    }
}
