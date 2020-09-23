using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Models;
using backend.Models.Authentication;
using backend.Exceptions.Authentication;
using backend.Services;
using backend.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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

            this.controller = new AuthController(service, new UserSessionMock(), logger.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
        }


        [TestMethod]
        public async Task LoginWithWrongPasswordTest()
        {
            var result = await this.controller.Login(new AuthenticateModel()
            {
                Login = "login",
                Password = "wrong password"
            }) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(401, result.StatusCode);
            Assert.AreEqual("Incorrect login or password", result.Value);
        }

        [TestMethod]
        public async Task LoginWithWrongUsernameTest()
        {
            var result = await this.controller.Login(new AuthenticateModel()
            {
                Login = "wrong login",
                Password = "masterkey"
            }) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(401, result.StatusCode);
            Assert.AreEqual("Incorrect login or password", result.Value);
        }

        [TestMethod]
        public async Task CheckUserShouldReturnUser() {
            var result = await this.controller.CheckUser("login", "masterkey");
            
            Assert.AreEqual(result.Login, "login");
        }
        
        [TestMethod]
        public async Task CheckUserShouldThrowException() {
            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => this.controller.CheckUser("login", "wrongPassword"));
        }

        
        [TestMethod]
        public async Task CheckUserShouldThrowException2() {
            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => this.controller.CheckUser("wrong-login", "masterkey"));
        }

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
