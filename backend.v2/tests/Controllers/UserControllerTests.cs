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
using System.IO;
using backend.Exceptions.FileExceptions;

namespace tests.Controllers
{
    [TestClass]
    public class UserControllerTests
    {
        [TestMethod]
        public async Task ChangeEmailIfCorrect()
        {
            var user = new User {
                Id = 2,
                Login = "login",
                Email = "tests@test.ru"
            };

            var userService = new Mock<IUserService>();

            userService.Setup(item => item.Update(It.IsAny<User>())).ReturnsAsync(user);

            var userSession = new Mock<IUserSession>();

            userSession.Setup(item => item.User).ReturnsAsync(user);

            var bookService = new Mock<IBookService>();
            var fileService = new Mock<IFileService>();
            var logger = new Mock<ILogger<UserController>>();

            var controller = new UserController(userService.Object, userSession.Object, bookService.Object, fileService.Object, logger.Object);

            var result = await controller.ChangeEmail("qwerty-uiop@gmail.com") as ObjectResult;

            var userResult = result.Value as User;

            userService.Verify(item => item.Update(It.Is<User>(user => user.Email == "qwerty-uiop@gmail.com" && user.Id == 2)), Times.Once());

            Assert.AreEqual(userResult.Email, "qwerty-uiop@gmail.com");
            Assert.AreEqual(userResult.Id, 2);
        }
        
        [TestMethod]
        public async Task DeclineEmailIfIncorrect()
        {
            var userService = new Mock<IUserService>();
            var userSession = new Mock<IUserSession>();
            var bookService = new Mock<IBookService>();
            var fileService = new Mock<IFileService>();
            var logger = new Mock<ILogger<UserController>>();

            var controller = new UserController(userService.Object, userSession.Object, bookService.Object, fileService.Object, logger.Object);

            var result = await controller.ChangeEmail("qwerty-uiopgmail.com") as ObjectResult;

            Assert.AreEqual(result.Value, "Incorrect email");
            Assert.AreEqual(result.StatusCode, 400);
        }
    }
}