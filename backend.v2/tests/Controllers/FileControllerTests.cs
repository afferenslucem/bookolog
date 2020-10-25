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
    public class FileControllerTests
    {
        string GetRandomFileName(string ext) 
        {
            string guid = Guid.NewGuid().ToString();
            return guid + ext;
        }
        
        [TestMethod]
        public void ReadFile()
        {
            string fileName = this.GetRandomFileName(".jpg");
            string filePath = Path.Combine(Path.GetTempPath(), fileName);            
            System.IO.File.Create(filePath).Close();

            var logger = new Mock<ILogger<FileController>>();
            var fileService = new Mock<IFileService>();

            using var stream = System.IO.File.OpenRead(filePath);

            fileService.Setup(item => item.ReadFile(It.IsAny<string>())).Returns(stream);
            fileService.Setup(item => item.GetExtentionFromFilename(It.IsAny<string>())).Returns(".jpg");

            var controller = new FileController(fileService.Object, logger.Object);

            var result = controller.File(fileName) as FileStreamResult;

            Assert.AreEqual(result.FileStream, stream);
            Assert.AreEqual(result.ContentType, "image/jpeg");

            fileService.Verify(item => item.ReadFile(It.Is<string>(name => name == fileName)), Times.Once());
        }
        
        [TestMethod]
        public void CantFindFileException()
        {
            var logger = new Mock<ILogger<FileController>>();
            var fileService = new Mock<IFileService>();

            fileService.Setup(item => item.ReadFile(It.IsAny<string>())).Throws(new FileReadException(new FileNotFoundException()));

            var controller = new FileController(fileService.Object, logger.Object);

            var result = controller.File("qwerty.uiop.jpg") as ObjectResult;

            Assert.AreEqual(result.StatusCode, 404);
            Assert.AreEqual(result.Value, "Can't get file");
        }
        
        [TestMethod]
        public void UnexpectedException()
        {
            var logger = new Mock<ILogger<FileController>>();
            var fileService = new Mock<IFileService>();

            fileService.Setup(item => item.ReadFile(It.IsAny<string>())).Throws(new Exception("Unexpected"));

            var controller = new FileController(fileService.Object, logger.Object);

            var result = controller.File("qwerty.uiop.jpg") as ObjectResult;

            Assert.AreEqual(result.StatusCode, 500);
            Assert.AreEqual(result.Value, "Something went wrong");
        }
    }
}