using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Exceptions.BookExceptions;
using backend.Models;
using backend.v2.Services;
using backend.Storages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using tests.Services;
using Moq;
using tests.Storage;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace tests.Services
{
    [TestClass]
    public class FileServiceTests
    {

        [TestMethod]
        public async Task ShouldSaveFile()
        {
            var fileMock = new Mock<IFormFile>();

            fileMock.Setup(item => item.FileName).Returns("avatar.jpeg");

            var configService = new Mock<IConfigService>();
            configService.Setup(item => item.FileStorage).Returns(new StorageConfig { AllowedExtensions = new string[] { ".jpeg", ".svg" }, StoragePath = "./path" });

            var fileSystem = new Mock<IFileSystemService>();

            fileSystem.Setup(
                item => item.WrileFile(
                    It.Is<IFormFile>(file => file == fileMock.Object),
                    It.Is<string>(path => path.StartsWith("./path") && path.EndsWith(".jpeg"))
                )
            ).Returns(Task.CompletedTask);

            fileSystem.Setup(
                item => item.GetRandomFileName()
            ).Returns("asdf.ghj");

            var fileStorage = new Mock<IFileStorage>();

            var savedFile = new backend.Models.File
            {
                Name = "asdf.ghj.jpeg",
                Path = Path.Combine("./path", "asdf.ghj.jpeg")
            };

            fileStorage.Setup(item => item.Save(
                It.IsAny<backend.Models.File>()
            ));

            var fileService = new FileService(fileStorage.Object, fileSystem.Object, configService.Object);

            var result = await fileService.Save(fileMock.Object);

            fileSystem.Verify(item => item.WrileFile(fileMock.Object, Path.Combine("./path", "asdf.ghj.jpeg")), Times.Once());
            fileSystem.Verify(item => item.GetRandomFileName(), Times.Once());
            fileStorage.Verify(item => item.Save(
                    It.Is<backend.Models.File>(file =>
                        file.Name.EndsWith(".jpeg") &&
                        file.Path == Path.Combine("./path", file.Name)
                    )
                ), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteFile()
        {
            var file = new backend.Models.File {
                Id = 2,
                Name = "asdasd.asd.jpeg",
                Path = "/storage/asdasd.asd.jpeg"
            };

            var fileSystem = new Mock<IFileSystemService>();
            fileSystem.Setup(
                item => item.Delete(It.IsAny<string>())
            );

             var fileStorage = new Mock<IFileStorage>();
             fileStorage.Setup(item => item.GetFile(It.IsAny<long>())).ReturnsAsync(file);
             fileStorage.Setup(item => item.Delete(It.IsAny<long>())).ReturnsAsync(file);

             var configService = new Mock<IConfigService>();

             var fileService = new FileService(fileStorage.Object, fileSystem.Object, configService.Object);

             await fileService.Delete(2);

             fileSystem.Verify(item => item.Delete(file.Path), Times.Once());

             fileStorage.Verify(item => item.GetFile(2), Times.Once());
             fileStorage.Verify(item => item.Delete(2), Times.Once());
        }
        [TestMethod]
        public void ShouldReadFile()
        {
            var fileStorage = new Mock<IFileStorage>();

            var fileSystem = new Mock<IFileSystemService>();
            fileSystem.Setup(
                item => item.GetFileStream(It.IsAny<string>())
            );

             var configService = new Mock<IConfigService>();
            configService.Setup(item => item.FileStorage).Returns(new StorageConfig { StoragePath = "./path" });


             var fileService = new FileService(fileStorage.Object, fileSystem.Object, configService.Object);

             fileService.ReadFile("asd.asd.jpeg");

             configService.Verify(item => item.FileStorage, Times.Once());
             fileSystem.Verify(item => item.GetFileStream(Path.Combine("./path", "asd.asd.jpeg")), Times.Once());
        }
    }
}
