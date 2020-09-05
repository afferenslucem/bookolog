using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Models;
using backend.Models.Authentication;
using backend.Services;
using backend.Storage;
using Microsoft.AspNetCore.Mvc;
using tests.Services;
using Moq;
using tests.Storage;

namespace tests.Controllers
{
    [TestClass]
    public class AuthControllerTests
    {
        IUserStorage userStorage;
        AuthController controller;

        [TestInitialize]
        public void BeforeEach() {
            var logger = new Mock<ILogger<AuthController>>();

            this.userStorage = new UserStorageMock();
            
            var service = new UserService(this.userStorage);

            this.controller = new AuthController(service, logger.Object);
        }


        // [TestMethod]
        // public async Task LoginTest()
        // {
        //     var result = await this.controller.Login(new AuthenticateModel()
        //     {
        //         Login = "login",
        //         Password = "masterkey"
        //     }) as OkObjectResult;
        //     
        //     Assert.IsNotNull(result);
        //     Assert.AreEqual(200, result.StatusCode);
        // }

        [TestMethod]
        public async Task RegisterTest()
        {
            var result = await this.controller.Register(new User()
            {
                Login = "login2",
                Email = "email2",
                Password = "masterkey"
            }) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            var saved = await this.userStorage.GetByLogin("login2");
            
            Assert.AreEqual("email2", saved.Email);
        }
    }
}
