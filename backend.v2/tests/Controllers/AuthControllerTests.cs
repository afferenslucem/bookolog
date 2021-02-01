using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Models;
using backend.Models.Authentication;
using backend.Exceptions.AuthenticationExceptions;
using backend.v2.Services;
using backend.Storages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using tests.Services;
using Moq;
using tests.Storage;
using backend.Exceptions.StorageExceptions;

namespace tests.Controllers
{
    [TestClass]
    public class AuthControllerTests
    {
        [TestMethod]
        public async Task LoginWithWrongLoginTest()
        {
            var logger = new Mock<ILogger<AuthController>>();
            var mailer = new Mock<IMailService>();
            var storage = new Mock<IUserStorage>();
            storage.Setup(item => item.GetByLogin(It.IsAny<string>())).Throws(new StorageReadException());
            var service = new UserService(storage.Object);
            var controller = new AuthController(service, new UserSessionMock(), mailer.Object, logger.Object);

            var result = await controller.Login(new AuthenticateModel()
            {
                Login = "login",
                Password = "wrong password"
            }) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(401, result.StatusCode);
            Assert.AreEqual("Incorrect login or password", result.Value);
        }

        [TestMethod]
        public async Task LoginWithWrongPasswordTest()
        {
            var logger = new Mock<ILogger<AuthController>>();
            var mailer = new Mock<IMailService>();
            var storage = new Mock<IUserStorage>();
            storage.Setup(item => item.GetByLogin(It.IsAny<string>())).Returns(Task.Run(() => new User{
                Id = 1,
                Login = "login",
                PasswordHash = "sgdfgdf",
                Salt = "sdfgdfgdfg"
            }));

            var service = new UserService(storage.Object);
            var controller = new AuthController(service, new UserSessionMock(), mailer.Object, logger.Object);

            var result = await controller.Login(new AuthenticateModel()
            {
                Login = "login",
                Password = "masterkey"
            }) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(401, result.StatusCode);
            Assert.AreEqual("Incorrect login or password", result.Value);
        }

        [TestMethod]
        public async Task CheckUserTriggerAuthenticateUser() {
            var logger = new Mock<ILogger<AuthController>>();
            var mailer = new Mock<IMailService>();
            var service = new Mock<IUserService>();

            var controller = new AuthController(service.Object, new UserSessionMock(), mailer.Object, logger.Object);

            var result = await controller.CheckUser("login", "masterkey");
            
            service.Verify(item => item.Authenticate(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        }

        [TestMethod]
        public async Task RegisterTest()
        {
            var logger = new Mock<ILogger<AuthController>>();
            var mailer = new Mock<IMailService>();

            var storage = new Mock<IUserStorage>();

            var user = new User()
            {
                Login = "login2",
                Email = "email2",
                Password = "masterkey"
            };

            storage.Setup(item => item.Save(user)).Returns(Task.Run(() => user));

            var service = new UserService(storage.Object);


            var controller = new AuthController(service, new UserSessionMock(), mailer.Object, logger.Object);


            var result = await controller.Register(user) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            storage.Verify(item => item.Save(user), Times.Once());
        }
    }
}
