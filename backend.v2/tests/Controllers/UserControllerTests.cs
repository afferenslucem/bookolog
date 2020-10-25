using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Models;
using backend.Models.Authentication;
using backend.Exceptions.AuthenticationExceptions;
using backend.Services;
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
        public void ChangeEmailIfCorrect()
        {
            var userService = new Mock<IUserService>();
            var userSession = new Mock<IUserSession>();
            var bookService = new Mock<IBookService>();
            var fileService = new Mock<IFileService>();
            var logger = new Mock<ILogger<UserController>>();
        }
    }
}