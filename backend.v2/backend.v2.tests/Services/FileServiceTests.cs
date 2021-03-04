using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Services;
using backend.v2.Storages;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Services
{
    [TestClass]
    public class FileServiceTests
    {
        private Mock<IFileStorage> storageMock;
        private Mock<IFileSystemService> systemMock;
        private Mock<IConfigService> configServiceMock;

        private Mock<FileService> serviceMock;

        [TestInitialize]
        public void BeforeEach()
        {
            this.storageMock = new Mock<IFileStorage>();
            this.systemMock = new Mock<IFileSystemService>();
            this.configServiceMock = new Mock<IConfigService>();

            this.serviceMock = new Mock<FileService>(
                MockBehavior.Default,
                storageMock.Object,
                systemMock.Object,
                configServiceMock.Object
            );

            this.serviceMock.CallBase = true;
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(serviceMock.Object);
        }

        [TestMethod]
        public void ShouldCreate2()
        {
            Assert.IsNotNull(new Mock<FileService>(MockBehavior.Default, systemMock.Object, configServiceMock.Object).Object);
        }

        [TestMethod]
        public async Task ShouldSaveFile()
        {
            var data = new Mock<IFormFile>();
            data.SetupGet(m => m.FileName).Returns("avatar.jpg");
            
            serviceMock.Setup(m => m.CheckExtention(It.IsAny<string>()));

            var entity = new File()
            {
                Name = "avatar.jpg",
                Path = "/path/sahew8kj.jpg"
            };
            
            serviceMock.Setup(m => m.CreateFileEntity(It.IsAny<IFormFile>())).Returns(entity);
            systemMock.Setup(m => m.WrileFile(It.IsAny<IFormFile>(), It.IsAny<string>()));
            storageMock.Setup(m => m.Save(It.IsAny<File>()));

            await serviceMock.Object.Save(data.Object);
            
            serviceMock.Verify(m => m.CheckExtention("avatar.jpg"), Times.Once());
            serviceMock.Verify(m => m.CreateFileEntity(data.Object), Times.Once());
            systemMock.Verify(m => m.WrileFile(data.Object, "/path/sahew8kj.jpg"), Times.Once());
            storageMock.Verify(m => m.Save(entity), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteFile()
        {
            var entity = new File()
            {
                Name = "avatar.jpg",
                Path = "/path/sahew8kj.jpg"
            };
            
            storageMock.Setup(m => m.GetFile(It.IsAny<long>())).ReturnsAsync(entity);
            systemMock.Setup(m => m.Delete(It.IsAny<string>()));
            storageMock.Setup(m => m.Delete(It.IsAny<long>()));

            await serviceMock.Object.Delete(2);

            storageMock.Verify(m => m.GetFile(2), Times.Once());
            systemMock.Verify(m => m.Delete("/path/sahew8kj.jpg"), Times.Once());
            storageMock.Verify(m => m.Delete(2), Times.Once());
        }

        [TestMethod]
        public void ShouldReturnExtension()
        {
            var result = serviceMock.Object.GetExtentionFromFilename("qwerty.uiop");
            
            Assert.AreEqual(result, ".uiop");
        }
    }
}