using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Exceptions.BookExceptions;
using backend.Models;
using backend.Services;
using backend.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using tests.Services;
using Moq;
using tests.Storage;

namespace tests.Controllers
{
    [TestClass]
    public class BookControllerTests
    {
        [TestMethod]
        public async Task ShouldSave()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            bookService.Setup(item => item.Save(It.IsAny<Book>())).Returns(Task.Run(() => book));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.Create(book) as OkObjectResult;

            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);

            bookService.Verify(item => item.Save(book), Times.Once);
        }

        [TestMethod]
        public async Task ShouldSaveMany()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name"
                }
            };
            
            bookService.Setup(item => item.SaveMany(It.IsAny<Book[]>())).Returns(Task.Run(() => books));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.CreateMany(books) as OkObjectResult;

            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);            
            
            bookService.Verify(item => item.SaveMany(books), Times.Once());
        }

        [TestMethod]
        public async Task ShouldUpdate()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            bookService.Setup(item => item.Update(It.IsAny<Book>())).Returns(Task.Run(() => book));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.Update(book) as OkObjectResult;

            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);

            bookService.Verify(item => item.Update(book), Times.Once);
        }

        [TestMethod]
        public async Task ShouldUpdateMany()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name"
                }
            };
            
            bookService.Setup(item => item.UpdateMany(It.IsAny<Book[]>())).Returns(Task.Run(() => books));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.UpdateMany(books) as OkObjectResult;

            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);            
            
            bookService.Verify(item => item.UpdateMany(books), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDelete()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var guid = Guid.NewGuid();

            bookService.Setup(item => item.Delete(It.IsAny<Guid>())).Returns(Task.Run(() => book));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.Delete(guid) as OkObjectResult;

            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);

            bookService.Verify(item => item.Delete(guid), Times.Once);
        }

        [TestMethod]
        public async Task ShouldDeleteMany()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name"
                }
            };
            
            var guids = new Guid[] {
                Guid.NewGuid()
            };
            
            bookService.Setup(item => item.DeleteMany(It.IsAny<Guid[]>())).Returns(Task.Run(() => books));

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var saved = await controller.DeleteMany(guids) as OkObjectResult;

            bookService.Verify(item => item.DeleteMany(guids), Times.Once());
        }

        [TestMethod]
        public async Task ShouldThrowUnitsException()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            bookService.Setup(item => item.Save(It.IsAny<Book>())).Throws(new BookWrongUnitsException());

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var result = await controller.Create(book) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookWrongUnitsException.ErrorMessage, result.Value);
        }

        [TestMethod]
        public async Task ShouldThrowDatesException()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            bookService.Setup(item => item.Save(It.IsAny<Book>())).Throws(new BookWrongDatesException());

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var result = await controller.Create(book) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);

            Assert.AreEqual(BookWrongDatesException.ErrorMessage, result.Value);
        }

        [TestMethod]
        public async Task ShouldUpdateException()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            bookService.Setup(item => item.Update(It.IsAny<Book>())).Throws(new BookCouldNotAccessSomeoneElsesException());

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var result = await controller.Update(book) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);

            Assert.AreEqual(BookCouldNotAccessSomeoneElsesException.ErrorMessage, result.Value);
        }

        [TestMethod]
        public async Task ShouldDeleteException()
        {
            var logger = new Mock<ILogger<BookController>>();
            var userSession = new UserSessionMock();
            var bookService = new Mock<IBookService>();

            bookService.Setup(item => item.Delete(It.IsAny<Guid>())).Throws(new BookCouldNotAccessSomeoneElsesException());

            var controller = new BookController(bookService.Object, userSession, logger.Object);

            var result = await controller.Delete(Guid.NewGuid()) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);

            Assert.AreEqual(BookCouldNotAccessSomeoneElsesException.ErrorMessage, result.Value);
        }
    }
}
