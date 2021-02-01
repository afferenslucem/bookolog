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
        Task UpdateLastSyncTime();
        void SetSession(Session session);
        User User { get; }
        DateTime LastSyncTime { get; }
    }

    public class UserSession : IUserSession
    {
        private HttpContext context;
        private ISessionService sessionService;

        private Session session;

        public UserSession(ISessionService sessionService)
        {
            this.sessionService = sessionService;
        }

        public async Task UpdateLastSyncTime()
        {
            var now = DateSessionUtils.Now;
            var str = DateSessionUtils.Stringify(now);
            this.session.Set("LastSyncTime", str);

            await this.sessionService.Update(this.session);
        }

        public void SetSession(Session session)
        {
            this.session = session;
        }

        public User User
        {
            get
            {
                var result = this.session.User;
                result.LastSyncTime = this.LastSyncTime;
                
                return result;
            }
        }

        public DateTime LastSyncTime
        {
            get
            {
                var saved = this.session.Get("LastSyncTime");

                return DateSessionUtils.Parse(saved) ?? DateTime.MinValue;
            }
        }
    }
}
