using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Models;
using Server.Services;
using Server.Tests.Mocks.Storages;
using Server.Utils;
using System.Threading.Tasks;

namespace Server.Testing
{
    [TestClass]
    public class UserServiceTests
    {
        UserStorageMock storage = new UserStorageMock();

        IUserService service;

        User user = new User
        {
            Login = "test",
            Password = "masterkey",
            Salt = "123",
            PasswordHash = new SHA256Hasher().GetSHA256Hash("masterkey", "123")
        };

        public UserServiceTests()
        {
            this.service = new UserService(this.storage);
        }

        [TestMethod]
        public async Task TestSave()
        {
            await this.service.Save(this.user);

            var result = await this.storage.GetById(1);

            Assert.AreEqual(this.user, result);
        }
    }
}
