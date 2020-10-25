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

namespace tests.Controllers
{
    [TestClass]
    public class FileControllerTests
    {
        [TestMethod]
        public void ReadFile()
        {
            var logger = new Mock<ILogger<FileControllerTests>>();
            var fileService = new Mock<FileService>();
        }
    }
}