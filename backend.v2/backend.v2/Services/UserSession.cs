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
        Task<User> GetUser();
        Task<User> User { get; }
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

        public async Task<User> GetUser()
        {
            if (this.user != null) return this.user;

            this.user = await this.userService.GetByLogin(this.context.User.Identity.Name);
            return this.user;
        }

        public Task<User> User {
            get {
                return this.GetUser();
            }
        }
    }
}
