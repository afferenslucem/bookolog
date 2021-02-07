using Microsoft.AspNetCore.Http;
using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Authentication;

namespace backend.v2.Services
{
    public interface IUserSession
    {
        void UpdateLastSyncTime();
        Session Session { get; set; }
        User User { get; set; }
        DateTime? LastSyncTime { get; }
    }

    public class UserSession : IUserSession
    {
        private HttpContext context;

        private Session session;
        private User user;

        public UserSession(ISessionService sessionService)
        {
        }

        public Session Session {
            get {
                return this.session;
            }
            set {
                this.session = value;
            }
        }

        public void UpdateLastSyncTime()
        {
            var now = DateSessionUtils.Now;
            var str = DateSessionUtils.Stringify(now);
            this.session.Set("LastSyncTime", str);
        }

        public User User
        {
            get
            {             
                user.LastSyncTime = this.LastSyncTime;   
                return user;
            }
            set
            {                
                this.user = value;
            }
        }

        public DateTime? LastSyncTime
        {
            get
            {
                var saved = this.session != null ? this.session.Get("LastSyncTime") : null;

                return DateSessionUtils.Parse(saved) ?? null;
            }
        }
    }
}
