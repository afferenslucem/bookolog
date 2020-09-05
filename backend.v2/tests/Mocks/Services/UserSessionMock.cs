using System.Threading.Tasks;
using backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Services;
using backend.Storage;

namespace tests.Services
{
    public class UserSessionMock: IUserSession
    {
        public Task<User> GetUser()
        {
            return Task.Run(() => new User()
            {
                Id = 1
            });
        }

        public Task<User> User
        {
            get { return this.GetUser(); }
        }
    }
}