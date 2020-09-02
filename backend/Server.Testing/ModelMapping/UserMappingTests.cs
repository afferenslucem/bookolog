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
                Salt = "d",
                Email = "e",
                LastAction = new DateTime()
            };

            var adapter = new UserStorageAdapter(user);

            Assert.IsTrue(
                user.Id == adapter.Id &&
                user.Login == adapter.Login &&
                user.PasswordHash == adapter.PasswordHash &&
                user.Salt == adapter.Salt && 
                user.Email == adapter.Email && 
                user.LastAction == adapter.LastAction
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
                Salt = "d",
                Email = "e",
                LastAction = new DateTime()
            };

            var user = new User(adapter);

            Assert.IsTrue(
                user.Id == adapter.Id &&
                user.Login == adapter.Login &&
                user.PasswordHash == adapter.PasswordHash &&
                user.Salt == adapter.Salt &&
                user.Email == adapter.Email &&
                user.LastAction == adapter.LastAction &&
                user.Password == null
            );
        }
    }
}
