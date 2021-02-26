using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.v2.Controllers;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Services;
using backend.v2.Storages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using tests.Services;
using Moq;
using tests.Storage;
using backend.v2.Exceptions.StorageExceptions;
using System.IO;
using backend.v2.Exceptions.FileExceptions;

namespace tests.Controllers
{
    [TestClass]
    public class UserControllerTests
    {
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