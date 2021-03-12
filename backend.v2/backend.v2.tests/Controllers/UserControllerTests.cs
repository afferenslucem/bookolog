using System;
using System.Linq;
using System.Threading.Tasks;
using backend.v2.Controllers;
using backend.v2.Exceptions;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Controllers
{
    [TestClass]
    public class UserControllerTests
    {
        private Mock<IUserService> userServiceMock;
        private Mock<IBookService> bookServiceMock;
        private Mock<ICollectionService> collectionServiceMock;
        private Mock<IFileService> fileServiceMock;
        private Mock<ILogger<UserController>> loggerMock;
        private Mock<IUserSession> userSessionMock;

        private Mock<UserController> controller;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.userServiceMock = new Mock<IUserService>();
            this.bookServiceMock = new Mock<IBookService>();
            this.collectionServiceMock = new Mock<ICollectionService>();
            this.fileServiceMock = new Mock<IFileService>();
            this.loggerMock = new Mock<ILogger<UserController>>();
            this.userSessionMock = new Mock<IUserSession>();

            this.controller = new Mock<UserController>(
                MockBehavior.Default,
                userServiceMock.Object,
                userSessionMock.Object,
                bookServiceMock.Object,
                collectionServiceMock.Object,
                fileServiceMock.Object,
                loggerMock.Object
            );
            
            var request = new Mock<HttpRequest>();
            request.SetupGet(m => m.Form.Files).Returns(new FormFileCollection());
            
            var context = new Mock<HttpContext>();
            context.SetupGet(x => x.Request).Returns(request.Object);
            
            controller.CallBase = true;
            controller.Object.ControllerContext = new ControllerContext();
            controller.Object.ControllerContext.HttpContext = context.Object;
        }

        [TestMethod]
        public async Task ShouldChangeEmail()
        {
            var user = new User()
            {
                Id = 2,
            };
            
            userSessionMock.SetupGet(m => m.User).Returns(user);

            userServiceMock.Setup(m => m.Update(It.IsAny<User>())).Returns(Task.FromResult(user));

            controller.Setup(m => m.Ok(It.IsAny<User>()));

            await controller.Object.ChangeEmail("alexshakirov74@gmail.com");
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            userServiceMock.Verify(m => m.Update(It.Is<User>(v => v.Id == user.Id && v.Email == "alexshakirov74@gmail.com")), Times.Once);
            controller.Verify(m => m.Ok(It.Is<User>(v => v.Id == user.Id)));
        }

        [TestMethod]
        public async Task ChangeEmailShouldReturnsBadRequestForIncorrectEmail()
        {
            var user = new User()
            {
                Id = 2,
            };
            
            userSessionMock.SetupGet(m => m.User).Returns(user);

            userServiceMock.Setup(m => m.Update(It.IsAny<User>())).Returns(Task.FromResult(user));

            controller.Setup(m => m.BadRequest(It.IsAny<string>()));

            await controller.Object.ChangeEmail("alexshakirov7");
            
            userSessionMock.VerifyGet(m => m.User, Times.Never());
            userServiceMock.Verify(m => m.Update(It.IsAny<User>()), Times.Never());
            controller.Verify(m => m.BadRequest("Incorrect email"));
        }

        [TestMethod]
        public async Task ChangeEmailShouldReturns500()
        {
            var user = new User()
            {
                Id = 2,
            };
            
            userSessionMock.SetupGet(m => m.User).Returns(user);

            userServiceMock.Setup(m => m.Update(It.IsAny<User>())).ThrowsAsync(new Exception());

            controller.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<string>()));

            await controller.Object.ChangeEmail("alexshakirov74@gmail.com");
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            userServiceMock.Verify(m => m.Update(It.IsAny<User>()), Times.Once());
            controller.Verify(m => m.StatusCode(500, "Can't change email"), Times.Once());
        }

        [TestMethod]
        public void ShouldReturnsUserInfo()
        {
            var user = new User()
            {
                Id = 2,
            };

            userSessionMock.SetupGet(m => m.User).Returns(user);
            controller.Setup(m => m.Ok(It.IsAny<User>()));

            controller.Object.Me();

            userSessionMock.VerifyGet(m => m.User, Times.Once());
            controller.Verify(m => m.Ok(It.Is<User>(v => v.Id == 2)), Times.Once());
        }

        [TestMethod]
        public void MeShouldReturns500()
        {
            var user = new User()
            {
                Id = 2,
            };

            userSessionMock.SetupGet(m => m.User).Returns((User)null);
            controller.Setup(m => m.StatusCode(It.IsAny<int>()));

            controller.Object.Me();

            userSessionMock.VerifyGet(m => m.User, Times.Once());
            controller.Setup(m => m.StatusCode(500));
        }

        [TestMethod]
        public async Task UploadAvatarShouldSaveImage()
        {
            var user = new User()
            {
                Id = 2,
            };

            var file = new File()
            {
                Id = 1
            };

            userSessionMock.SetupGet(m => m.User).Returns(user);
            fileServiceMock.Setup(m => m.Save(It.IsAny<IFormFile>())).ReturnsAsync(file);
            userServiceMock.Setup(m => m.Update(It.IsAny<User>())).ReturnsAsync(user);
            controller.Setup(m => m.Ok(It.IsAny<string>()));

            await controller.Object.UploadAvatar();

            userSessionMock.VerifyGet(m => m.User, Times.Once());
            fileServiceMock.Verify(m => m.Save(It.IsAny<IFormFile>()), Times.Once());
            userServiceMock.Verify(m => m.Update(user), Times.Once());
            controller.Verify(m => m.Ok(It.IsAny<string>()), Times.Once());
        }

        [TestMethod]
        public async Task UploadAvatarShouldDeleteOldImage()
        {
            var user = new User()
            {
                Id = 2,
                AvatarId = 1,
            };

            var file = new File()
            {
                Id = 1
            };

            userSessionMock.SetupGet(m => m.User).Returns(user);
            fileServiceMock.Setup(m => m.Save(It.IsAny<IFormFile>())).ReturnsAsync(file);
            userServiceMock.Setup(m => m.Update(It.IsAny<User>())).ReturnsAsync(user);
            fileServiceMock.Setup(m => m.Delete(It.IsAny<long>())).ReturnsAsync(file);

            await controller.Object.UploadAvatar();

            fileServiceMock.Verify(m => m.Delete(1), Times.Once());
        }

        [TestMethod]
        public async Task UploadAvatarShouldReturnBadRequest()
        {
            var user = new User()
            {
                Id = 2,
                AvatarId = 1,
            };

            var file = new File()
            {
                Id = 1
            };

            userSessionMock.SetupGet(m => m.User).Throws(new  Exception());
            controller.Setup(m => m.BadRequest());

            await controller.Object.UploadAvatar();

            controller.Verify(m => m.BadRequest(), Times.Once());
        }

        [TestMethod]
        public async Task SynchronizeShouldSyncEntities()
        {
            var data = new AppSyncData()
            {
                Books = new SyncData<Book>()
                {
                    Delete = new Guid[] { },
                    Update = new Book[] { }
                },
                Collections = new SyncData<Collection>()
                {
                    Delete = new Guid[] { },
                    Update = new Collection[] { }
                }
            };

            collectionServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Collection>>()));
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>()));

            userSessionMock.Setup(m => m.UpdateLastSyncTime());

            controller.Setup(m => m.Ok());

            await controller.Object.Synchronize(data);
            
            collectionServiceMock.Verify(m => m.Synch(data.Collections), Times.Once());
            bookServiceMock.Verify(m => m.Synch(data.Books), Times.Once());
            
            userSessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Once());
        }

        [TestMethod]
        public async Task SynchronizeShouldSyncEntitiesWithEmptyData()
        {
            var data = new AppSyncData()
            {
            };

            collectionServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Collection>>()));
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>()));
            await controller.Object.Synchronize(data);
            
            collectionServiceMock.Verify(m => m.Synch(It.IsNotNull<SyncData<Collection>>()), Times.Once());
            bookServiceMock.Verify(m => m.Synch(It.IsNotNull<SyncData<Book>>()), Times.Once());
        }

        [TestMethod]
        public async Task SynchronizeShouldReturn400()
        {
            var data = new AppSyncData()
            {
            };

            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>()))
                .ThrowsAsync(new BookologException(ErrorCodes.BookCouldNotSave, "ping"));

            controller.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<string>()));
            
            await controller.Object.Synchronize(data);
            
            controller.Verify(m => m.StatusCode(400, "ping"));
        }

        [TestMethod]
        public async Task SynchronizeShouldReturn500()
        {
            var data = new AppSyncData()
            {
            };

            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>()))
                .ThrowsAsync(new Exception("ping"));

            controller.Setup(m => m.StatusCode(It.IsAny<int>()));
            
            await controller.Object.Synchronize(data);
            
            controller.Verify(m => m.StatusCode(500));
        }

        [TestMethod]
        public async Task LoadAllShouldReturnData()
        {
            var user = new User()
            {
                Id = 2,
            };

            var allBooks = new Book[] {};
            var allCollections = new Collection[] {};
            
            userSessionMock.SetupGet(m => m.User).Returns(user);
            bookServiceMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ReturnsAsync(allBooks);
            collectionServiceMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ReturnsAsync(allCollections);
            controller.Setup(m => m.Ok(It.IsAny<AppSyncData>()));

            await controller.Object.LoadAll();
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            bookServiceMock.Verify(m => m.GetByUserId(2), Times.Once());
            collectionServiceMock.Verify(m => m.GetByUserId(2), Times.Once());
            controller.Verify(m => m.Ok(It.Is<AppData>(v => v.Books == allBooks && v.Collections == allCollections)));
        }

        [TestMethod]
        public async Task LoadAllShouldReturn500()
        {
            var user = new User()
            {
                Id = 2,
            };
            
            userSessionMock.SetupGet(m => m.User).Returns(user);
            bookServiceMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ThrowsAsync(new Exception());
            controller.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<string>()));

            await controller.Object.LoadAll();
            
            controller.Verify(m => m.StatusCode(500), Times.Once());
        }
    }
}