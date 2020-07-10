using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Exceptions.Authentication;
using Server.Models;
using Server.Services;
using Server.Testing.Mocks;
using Server.Tests.Mocks.Storages;
using Server.Utils;
using System.Threading.Tasks;

namespace Server.Testing
{
    [TestClass]
    public class UserServiceTests
    {
        User user = DefaultItems.user;

        UserStorageMock storage = new UserStorageMock();

        IUserService service;
        
        [TestInitialize()]
        public void Startup()
        {
            this.service = new UserService(this.storage);
        }

        [TestMethod]
        public async Task TestSave()
        {
            var saved = await this.service.Save(this.user);

            var result = await this.storage.GetById(saved.Id);

            Assert.AreEqual(this.user, result);
        }


        [TestMethod]
        public async Task TestDeleteByEntity()
        {
            var saved = await this.service.Save(this.user);

            await this.service.Delete(saved);

            var result = await this.storage.GetById(saved.Id);

            Assert.IsNull(result);
        }


        [TestMethod]
        public async Task TestDeleteById()
        {
            var saved = await this.service.Save(this.user);

            await this.service.Delete(saved.Id);

            var result = await this.storage.GetById(saved.Id);

            Assert.IsNull(result);
        }


        [TestMethod]
        public async Task TestAuthentication()
        {
            var saved = await this.service.Save(this.user);

            var user = await this.service.Authenticate(this.user.Login, this.user.Password);

            Assert.AreEqual(saved.Id, user.Id);
            Assert.AreEqual(saved.Login, user.Login);
        }


        [TestMethod]
        public async Task TestUpdatePassword()
        {
            var copy = new User(this.user);
            copy.Password = this.user.Password;

            var saved = await this.service.Save(copy);

            var newPassword = "222222";

            await this.service.UpdatePassword(saved.Id, copy.Password, newPassword);

            var user = await this.service.Authenticate(this.user.Login, newPassword);

            Assert.AreEqual(saved.Id, user.Id);
            Assert.AreEqual(saved.Login, user.Login);
        }


        [TestMethod]
        public async Task TestUpdate()
        {
            var saved = await this.service.Save(this.user);

            saved.Login = "1";
            
            await this.service.Update(saved);

            var updated = await this.storage.GetById(saved.Id);

            Assert.AreEqual(updated.Id, saved.Id);
            Assert.AreEqual(updated.Login, "1");
        }


        [TestMethod]
        public async Task TestAuthenticationWithWrongCreds()
        {
            var saved = await this.service.Save(this.user);

            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(async () => await this.service.Authenticate(this.user.Login, this.user.Password + "a"));
        }
    }
}
