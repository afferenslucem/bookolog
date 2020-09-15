using System;
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
        IBookStorage bookStorage;

        private IUserSession userSession;

        BookController controller;

        [TestInitialize]
        public void BeforeEach() {
            var logger = new Mock<ILogger<BookController>>();
            
            this.bookStorage = new BookStorageMock();
            
            this.userSession = new UserSessionMock();

            var bookService = new BookService(this.bookStorage, this.userSession);

            this.controller = new BookController(bookService, logger.Object);
        }

        [TestMethod]
        public async Task ShouldSave()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var saved = await this.controller.Create(book) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);
        }

        [TestMethod]
        public async Task ShouldSaveWithStartDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDate = DateTime.Now
            };

            var saved = await this.controller.Create(book) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);
        }

        [TestMethod]
        public async Task ShouldSaveWithEndDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                EndDate = DateTime.Now
            };

            var saved = await this.controller.Create(book) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);
        }

        [TestMethod]
        public async Task ShouldSaveWithTotalUnits()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                TotalUnits = 100
            };

            var saved = await this.controller.Create(book) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);
        }

        [TestMethod]
        public async Task ShouldSaveWithDoneUnits()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                DoneUnits = 100
            };

            var saved = await this.controller.Create(book) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);
        }
        
        [TestMethod]
        public async Task ShouldThrowUnitsException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                TotalUnits = 10,
                DoneUnits = 20
            };
            
            var result = await this.controller.Create(book) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookWrongUnitsException.ErrorMessage, result.Value);
        }
        
        [TestMethod]
        public async Task ShouldThrowDatesException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(-1)
            };

            var result = await this.controller.Create(book) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookWrongDatesException.ErrorMessage, result.Value);
        }
        
        [TestMethod]
        public async Task ShouldUpdateException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(-1)
            };

            await this.controller.Create(book);
            
            var user = await this.userSession.User;
            user.Id = 2;
            
            var result = await this.controller.Update(book) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookCouldNotAccessSomeoneElsesException.ErrorMessage, result.Value);
        }
        [TestMethod]
        public async Task ShouldDeleteException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(-1)
            };

            await this.controller.Create(book);
            
            var user = await this.userSession.User;
            user.Id = 2;
            
            var result = await this.controller.Delete(book.Guid.Value) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookCouldNotAccessSomeoneElsesException.ErrorMessage, result.Value);
        }
    }
}
