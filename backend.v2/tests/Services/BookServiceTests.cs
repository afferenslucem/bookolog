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

namespace tests.Services
{
    [TestClass]
    public class BookServicesTests
    {
        IBookStorage bookStorage;
        private IBookService service;

        private IUserSession userSession;

        [TestInitialize]
        public void BeforeEach() {
            this.bookStorage = new BookStorageMock();
            
            this.userSession = new UserSessionMock();

            service = new BookService(this.bookStorage, this.userSession);
        }

        [TestMethod]
        public async Task ShouldSave()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.Save(It.IsAny<Book>())).ReturnsAsync(book);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            var result = await bookService.Save(book);
            
            Assert.AreEqual(result.Guid, book.Guid);
            
            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.Save(book), Times.Once());
        }
    }
    
    [TestClass]
    public class BookServiceEntityCheckingTests
    {
        private BookService service;

        [TestInitialize]
        public void BeforeEach() {
            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            this.service = new BookService(bookStorage.Object, userSession.Object);
        }
        

        [TestMethod]
        public void ShouldPassWithStartDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDateYear = 2012,
                StartDateMonth = 07,
                StartDateDay = 12,
            };

            this.service.CheckEntity(book);
        }

        [TestMethod]
        public void ShouldPassWithEndDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                EndDateYear = 2012,
                EndDateMonth = 06,
                EndDateDay = 12,
            };

            this.service.CheckEntity(book);
        }
        

        [TestMethod]
        public void ShouldSaveWithTotalUnits()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                TotalUnits = 100
            };

            this.service.CheckEntity(book);
        }

        [TestMethod]
        public void ShouldSaveWithDoneUnits()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                DoneUnits = 100
            };

            this.service.CheckEntity(book);
        }
        
        [TestMethod]
        public void ShouldThrowUnitsException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                TotalUnits = 10,
                DoneUnits = 20
            };

            Assert.ThrowsException<BookWrongUnitsException>(() => this.service.CheckEntity(book));
        }
        
        [TestMethod]
        public void ShouldThrowDatesException()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDateYear = 2012,
                StartDateMonth = 07,
                StartDateDay = 12,
                EndDateYear = 2012,
                EndDateMonth = 06,
                EndDateDay = 12,
            };

            Assert.ThrowsException<BookWrongDatesException>(() => this.service.CheckEntity(book));
        }
    }
}
