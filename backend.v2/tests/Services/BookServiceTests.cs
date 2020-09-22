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

            var result = await this.service.Save(book);
            var saved = await this.bookStorage.GetByGuid(result.Guid.Value);
            
            Assert.AreEqual(result.Guid, saved.Guid);
            Assert.AreEqual(result.UserId, 1);
        }

        [TestMethod]
        public async Task ShouldSaveWithStartDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                StartDateYear = 2012,
                StartDateMonth = 07,
                StartDateDay = 12,
            };

            var result = await this.service.Save(book);
        }

        [TestMethod]
        public async Task ShouldSaveWithEndDate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                EndDateYear = 2012,
                EndDateMonth = 06,
                EndDateDay = 12,
            };

            var result = await this.service.Save(book);
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

            var result = await this.service.Save(book);
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

            var result = await this.service.Save(book);
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

            await Assert.ThrowsExceptionAsync<BookWrongUnitsException>(() => this.service.Save(book));
        }
        
        [TestMethod]
        public async Task ShouldThrowDatesException()
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

            await Assert.ThrowsExceptionAsync<BookWrongDatesException>(() => this.service.Save(book));
        }
    }
}
