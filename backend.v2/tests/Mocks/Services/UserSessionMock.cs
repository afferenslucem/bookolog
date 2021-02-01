using System.Threading.Tasks;
using backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.v2.Services;
using backend.Storages;
using System;

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

        public void UpdateLastSyncTime()
        {
            throw new NotImplementedException();
        }

        public Task<User> User
        {
            get { return this.GetUser(); }
        }

        public DateTime LastSyncTime => throw new NotImplementedException();
    }
}