using System;
using System.Threading.Tasks;
using backend.v2.Controllers;
using backend.v2.Exceptions;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Controllers
{
    [TestClass]
    public class BookControllerTests
    {
        private Mock<IBookService> bookServiceMock;
        private Mock<ILogger<BookController>> loggerMock;
        private Mock<IUserSession> sessionMock;
        
        private Mock<BookController> controllerMock;
        
        [TestInitialize]
        public void BeforeEach()
        {
            bookServiceMock = new Mock<IBookService>();
            sessionMock = new Mock<IUserSession>();
            loggerMock = new Mock<ILogger<BookController>>();
            controllerMock = new Mock<BookController>(
                MockBehavior.Default,
                bookServiceMock.Object,
                sessionMock.Object,
                loggerMock.Object
            );

            controllerMock.CallBase = true;
        }
        
        [TestMethod]
        public async Task CreateShouldSaveEntity()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Save(It.IsAny<Book>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            await controllerMock.Object.Create(book);
            
            bookServiceMock.Verify(m => m.Save(book), Times.Once());
            controllerMock.Verify(m => m.Ok(book), Times.Once());
        }
        
        [TestMethod]
        public async Task CreateShouldReturn400()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Save(It.IsAny<Book>())).ThrowsAsync(new BookologException(ErrorCodes.BookCouldNotSave));
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Create(book);
            
            bookServiceMock.Verify(m => m.Save(book), Times.Once());
            controllerMock.Setup(m => m.StatusCode(400, It.IsAny<object>()));
        }
        
        [TestMethod]
        public async Task CreateShouldReturn500()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Save(It.IsAny<Book>())).ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Create(book);
            
            bookServiceMock.Verify(m => m.Save(book), Times.Once());
            controllerMock.Setup(m => m.StatusCode(500, It.IsAny<object>()));
        }
        
        [TestMethod]
        public async Task UpdateShouldUpdateEntity()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Update(It.IsAny<Book>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            await controllerMock.Object.Update(book);
            
            bookServiceMock.Verify(m => m.Update(book), Times.Once());
            controllerMock.Verify(m => m.Ok(book), Times.Once());
        }
        
        [TestMethod]
        public async Task UpdateShouldReturn400()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Update(It.IsAny<Book>())).ThrowsAsync(new BookologException(ErrorCodes.BookCouldNotSave));
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Update(book);
            
            bookServiceMock.Verify(m => m.Update(book), Times.Once());
            controllerMock.Setup(m => m.StatusCode(400, It.IsAny<object>()));
        }
        
        [TestMethod]
        public async Task UpdateShouldReturn500()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.Update(It.IsAny<Book>())).ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Update(book);
            
            bookServiceMock.Verify(m => m.Update(book), Times.Once());
            controllerMock.Setup(m => m.StatusCode(500, It.IsAny<object>()));
        }
        
        [TestMethod]
        public async Task DeleteShouldDeleteExistingEntity()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(book);
            bookServiceMock.Setup(m => m.Delete(It.IsAny<Guid>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            var guid = Guid.NewGuid();

            await controllerMock.Object.Delete(guid);
            
            bookServiceMock.Verify(m => m.GetByGuid(guid), Times.Once());
            bookServiceMock.Verify(m => m.Delete(guid), Times.Once());
            controllerMock.Verify(m => m.Ok(book), Times.Once());
        }
        
        [TestMethod]
        public async Task DeleteShouldReturn400()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ThrowsAsync(new BookologException(ErrorCodes.BookCouldNotSave));
            bookServiceMock.Setup(m => m.Delete(It.IsAny<Guid>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));
            var guid = Guid.NewGuid();

            await controllerMock.Object.Delete(guid);
            
            bookServiceMock.Verify(m => m.GetByGuid(guid), Times.Once());
            bookServiceMock.Verify(m => m.Delete(guid), Times.Never());
            controllerMock.Verify(m => m.StatusCode(400, It.IsAny<object>()), Times.Once());
        }
        
        [TestMethod]
        public async Task DeleteShouldReturn500()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ThrowsAsync(new Exception());
            bookServiceMock.Setup(m => m.Delete(It.IsAny<Guid>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));
            var guid = Guid.NewGuid();

            await controllerMock.Object.Delete(guid);
            
            bookServiceMock.Verify(m => m.GetByGuid(guid), Times.Once());
            bookServiceMock.Verify(m => m.Delete(guid), Times.Never());
            controllerMock.Verify(m => m.StatusCode(500), Times.Once());
        }
        
        [TestMethod]
        public async Task GetShouldReturnEntity()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(book);
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            var guid = Guid.NewGuid();

            await controllerMock.Object.Get(guid);
            
            bookServiceMock.Verify(m => m.GetByGuid(guid), Times.Once());
            controllerMock.Verify(m => m.Ok(book), Times.Once());
        }
        
        [TestMethod]
        public async Task GetShouldReturn500()
        {
            var book = new Book();
            bookServiceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>()));

            var guid = Guid.NewGuid();

            await controllerMock.Object.Get(guid);
            
            bookServiceMock.Verify(m => m.GetByGuid(guid), Times.Once());
            controllerMock.Verify(m => m.StatusCode(500), Times.Once());
        }
        
        [TestMethod]
        public async Task GetShouldReturnEntitiesForUser()
        {
            var books = new Book[]{};
            bookServiceMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ReturnsAsync(books);
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            await controllerMock.Object.Get(1);
            
            bookServiceMock.Verify(m => m.GetByUserId(1), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Once());
            controllerMock.Verify(m => m.Ok(books));
        }
        
        [TestMethod]
        public async Task GetShouldReturn500ForUser()
        {
            var books = new Book[]{};
            bookServiceMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ThrowsAsync(new Exception());
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>()));

            await controllerMock.Object.Get(1);
            
            bookServiceMock.Verify(m => m.GetByUserId(1), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Never());
            controllerMock.Verify(m => m.StatusCode(500));
        }
        
        [TestMethod]
        public async Task SyncShouldSyncEntities()
        {
            var data = new SyncData<Book>
            {
                Update = new Book[] { },
                Delete = new Guid[] { },
            };
            var answer = new SyncData<Book>
            {
                Update = new Book[] { },
                Delete = new Guid[] { },
            };
            
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>())).ReturnsAsync(answer);
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            await controllerMock.Object.Synchronize(data);
            
            bookServiceMock.Verify(m => m.Synch(data), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Once());
            controllerMock.Verify(m => m.Ok(answer));
        }
        
        [TestMethod]
        public async Task SyncShouldEmptyEntities()
        {
            var data = new SyncData<Book>
            {
                Update = null,
                Delete = null,
            };
            var answer = new SyncData<Book>
            {
                Update = new Book[] { },
                Delete = new Guid[] { },
            };
            
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>())).ReturnsAsync(answer);
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.Ok(It.IsAny<Book>()));

            await controllerMock.Object.Synchronize(data);
            
            bookServiceMock.Verify(m => m.Synch(It.Is<SyncData<Book>>(v => v.Update != null && v.Delete != null)), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Once());
            controllerMock.Verify(m => m.Ok(answer));
        }
        
        [TestMethod]
        public async Task SyncShouldReturn400()
        {
            var data = new SyncData<Book>
            {
                Update = new Book[] { },
                Delete = new Guid[] { },
            };
            
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>())).ThrowsAsync(new BookologException(ErrorCodes.BookCouldNotSave));
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Synchronize(data);
            
            bookServiceMock.Verify(m => m.Synch(data), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Never());
            controllerMock.Verify(m => m.StatusCode(400, It.IsAny<object>()));
        }
        
        [TestMethod]
        public async Task SyncShouldReturn500()
        {
            var data = new SyncData<Book>
            {
                Update = new Book[] { },
                Delete = new Guid[] { },
            };
            
            bookServiceMock.Setup(m => m.Synch(It.IsAny<SyncData<Book>>())).ThrowsAsync(new Exception());
            sessionMock.Setup(m => m.UpdateLastSyncTime());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Synchronize(data);
            
            bookServiceMock.Verify(m => m.Synch(data), Times.Once());
            sessionMock.Verify(m => m.UpdateLastSyncTime(), Times.Never());
            controllerMock.Verify(m => m.StatusCode(500));
        }
    }
}