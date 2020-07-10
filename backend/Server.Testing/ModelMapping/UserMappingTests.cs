using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Exceptions.Authentication;
using Server.Models;
using Server.Services;
using Server.Tests.Mocks.Storages;
using Server.Utils;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Testing.Mocks
{
    [TestClass]
    public class UserMappingTests
    {
        [TestMethod]
        public void UserToAdapterTest()
        {
            var user = new User
            {
                Id = 1,
                Login = "a",
                Password = "b",
                PasswordHash = "c",
                Salt = "d"
            };

            var adapter = new UserStorageAdapter(user);

            Assert.IsTrue(
                user.Id == adapter.Id &&
                user.Login == adapter.Login &&
                user.PasswordHash == adapter.PasswordHash &&
                user.Salt == adapter.Salt
            );
        }
        [TestMethod]
        public void AdapterToUserTest()
        {
            var adapter = new UserStorageAdapter
            {
                Id = 1,
                Login = "a",
                PasswordHash = "c",
                Salt = "d"
            };

            var user = new User(adapter);

            Assert.IsTrue(
                user.Id == adapter.Id &&
                user.Login == adapter.Login &&
                user.PasswordHash == adapter.PasswordHash &&
                user.Salt == adapter.Salt &&
                user.Password == null
            );
        }
    }
}
