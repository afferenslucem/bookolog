using System;
using System.IO;
using System.Threading.Tasks;
using backend.v2.Controllers;
using backend.v2.Exceptions;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Exceptions.FileExceptions;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using File = System.IO.File;

namespace backend.v2.tests.Controllers
{
    [TestClass]
    public class FileControllerTests
    {
        private Mock<IFileService> fileServiceMock;
        private Mock<ILogger<FileController>> loggerMock;
        private Mock<IUserSession> sessionMock;
        
        private Mock<FileController> controllerMock;
        
        [TestInitialize]
        public void BeforeEach()
        {
            fileServiceMock = new Mock<IFileService>(MockBehavior.Loose);
            loggerMock = new Mock<ILogger<FileController>>();
            controllerMock = new Mock<FileController>(
                MockBehavior.Default,
                fileServiceMock.Object,
                loggerMock.Object
            );

            controllerMock.CallBase = true;
        }
        
        [TestMethod]
        public void ShouldReturnFile()
        {
            var fsMock = new Mock<FileStream>(MockBehavior.Loose, "avatar.jpeg", FileMode.Append);
            
            fileServiceMock.Setup(m => m.ReadFile(It.IsAny<string>())).Returns(fsMock.Object);
            fileServiceMock.Setup(m => m.GetExtentionFromFilename(It.IsAny<string>())).Returns(".jpeg");

            controllerMock.Setup(m => m.File(It.IsAny<FileStream>(), It.IsAny<string>()));

            controllerMock.Object.File("avatar.jpeg");
            
            fileServiceMock.Verify(m => m.ReadFile("avatar.jpeg"), Times.Once());
            fileServiceMock.Verify(m => m.GetExtentionFromFilename("avatar.jpeg"), Times.Once());
            
            controllerMock.Verify(m => m.File(fsMock.Object, "image/jpeg"), Times.Once());
        }
        
        [TestMethod]
        public void ShouldReturn404()
        {
            fileServiceMock.Setup(m => m.ReadFile(It.IsAny<string>())).Throws(new FileReadException(new Exception()));
            fileServiceMock.Setup(m => m.GetExtentionFromFilename(It.IsAny<string>())).Returns(".jpeg");
            controllerMock.Setup(m => m.File(It.IsAny<FileStream>(), It.IsAny<string>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<string>()));

            controllerMock.Object.File("avatar.jpeg");
            
            fileServiceMock.Verify(m => m.ReadFile("avatar.jpeg"), Times.Once());
            fileServiceMock.Verify(m => m.GetExtentionFromFilename("avatar.jpeg"), Times.Never());
            
            controllerMock.Verify(m => m.File(It.IsAny<FileStream>(), "image/jpeg"), Times.Never());
            controllerMock.Verify(m => m.StatusCode(404, "Can't get file"), Times.Once());
        }
        
        [TestMethod]
        public void ShouldReturn500()
        {
            fileServiceMock.Setup(m => m.ReadFile(It.IsAny<string>())).Throws(new Exception());
            fileServiceMock.Setup(m => m.GetExtentionFromFilename(It.IsAny<string>())).Returns(".jpeg");
            controllerMock.Setup(m => m.File(It.IsAny<FileStream>(), It.IsAny<string>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<string>()));

            controllerMock.Object.File("avatar.jpeg");
            
            fileServiceMock.Verify(m => m.ReadFile("avatar.jpeg"), Times.Once());
            fileServiceMock.Verify(m => m.GetExtentionFromFilename("avatar.jpeg"), Times.Never());
            
            controllerMock.Verify(m => m.File(It.IsAny<FileStream>(), "image/jpeg"), Times.Never());
            controllerMock.Verify(m => m.StatusCode(500, "Something went wrong"), Times.Once());
        }
    }
}