using System;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using Microsoft.AspNetCore.Http;

namespace backend.v2.Services
{
    public interface IUserSession
    {
        void UpdateLastSyncTime();
        User User { get; set; }
        DateTime? LastSyncTime { get; }
    }

    public class UserSession : IUserSession
    {
        private User user;
        private HttpContext context;

        public UserSession(IHttpContextAccessor context)
        {
            this.context = context.HttpContext;
        }

        public void UpdateLastSyncTime()
        {
            var now = DateSessionUtils.Now;
            var str = DateSessionUtils.Stringify(now);
            context.Session.SetString("LastSyncTime", str);
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
                var saved = this.context.Session.GetString("LastSyncTime");

                return DateSessionUtils.Parse(saved) ?? null;
            }
        }
    }
}
