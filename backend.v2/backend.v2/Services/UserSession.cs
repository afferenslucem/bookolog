using Microsoft.AspNetCore.Http;
using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IUserSession
    {
        void UpdateLastSyncTime();
        Task<User> GetUser();
        Task<User> User { get; }
        DateTime LastSyncTime { get; }
    }

    public class UserSession : IUserSession
    {
        private HttpContext context;
        IUserService userService;

        private User user;

        public UserSession(IHttpContextAccessor contextAccessor, IUserService userService)
        {
            this.context = contextAccessor.HttpContext;
            this.userService = userService;
        }

        public void UpdateLastSyncTime()
        {
            var now = DateSessionUtils.Now;
            var str = DateSessionUtils.Stringify(now);
            this.Session.SetString("LastSyncTime", str);
        }

        public async Task<User> GetUser()
        {
            if (this.user != null) return this.user;

            this.user = await this.userService.GetByLogin(this.context.User.Identity.Name);
            return this.user;
        }

        public Task<User> User
        {
            get
            {
                return this.GetUser();
            }
        }

        public DateTime LastSyncTime
        {
            get
            {
                var saved = this.Session.GetString("LastSyncTime");

                return DateSessionUtils.Parse(saved) ?? DateTime.MinValue;
            }
        }

        private ISession Session
        {
            get
            {
                return this.context.Session;
            }
        }
    }
}
