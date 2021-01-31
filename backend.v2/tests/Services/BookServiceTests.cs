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

namespace tests.Services
{
    [TestClass]
    public class BookServicesTests
    {
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

        [TestMethod]
        public async Task ShouldUpdate()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 1,
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.Update(It.IsAny<Book>())).ReturnsAsync(book);
            bookStorage.Setup(item => item.GetByGuid(It.Is<Guid>(guid => guid == book.Guid.Value))).ReturnsAsync(book);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            var result = await bookService.Update(book);

            Assert.AreEqual(result.Guid, book.Guid);

            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.Update(book), Times.Once());
            bookStorage.Verify(item => item.GetByGuid(book.Guid.Value), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDelete()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 1,
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.Delete(It.Is<Guid>(guid => guid == book.Guid.Value))).ReturnsAsync(book);
            bookStorage.Setup(item => item.GetByGuid(It.Is<Guid>(guid => guid == book.Guid.Value))).ReturnsAsync(book);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            var result = await bookService.Delete(book.Guid.Value);

            Assert.AreEqual(result.Guid, book.Guid);

            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.Delete(book.Guid.Value), Times.Once());
            bookStorage.Verify(item => item.GetByGuid(book.Guid.Value), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteManyByBooks()
        {
            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name",
                    UserId = 1,
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name2",
                    UserId = 1,
                }
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.DeleteMany(It.IsAny<Book[]>())).ReturnsAsync(books);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            await bookService.DeleteMany(books);

            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.DeleteMany(books), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteManyByGuids()
        {
            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name",
                    UserId = 1,
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name2",
                    UserId = 1,
                }
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.DeleteMany(It.IsAny<Guid[]>())).Returns(Task.CompletedTask);
            bookStorage.Setup(item => item.GetByGuids(It.IsAny<Guid[]>())).ReturnsAsync(books);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            await bookService.DeleteMany(books.Select(item => item.Guid.Value).ToArray());

            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.GetByGuids(It.IsAny<Guid[]>()), Times.Once());
            bookStorage.Verify(item => item.DeleteMany(It.IsAny<Guid[]>()), Times.Once());
        }

        [TestMethod]
        public async Task ShouldUpdateManyBooks()
        {
            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name",
                    UserId = 1,
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name2",
                    UserId = 1,
                }
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.UpdateMany(It.IsAny<Book[]>())).ReturnsAsync(books);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            await bookService.UpdateMany(books);

            userSession.Verify(item => item.User);
            bookStorage.Verify(item => item.UpdateMany(books), Times.Once());
        }

        [TestMethod]
        public async Task ShouldSaveManyBooks()
        {
            var books = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name",
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name2",
                }
            };

            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            bookStorage.Setup(item => item.SaveMany(It.IsAny<Book[]>())).ReturnsAsync(books);
            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            var bookService = new BookService(bookStorage.Object, userSession.Object);

            await bookService.SaveMany(books);

            userSession.Verify(item => item.User, Times.Once());
            bookStorage.Verify(item => item.SaveMany(books), Times.Once());
        }
    }

    [TestClass]
    public class BookServiceAccessCheckingTests
    {
        private BookService service;

        [TestInitialize]
        public void BeforeEach()
        {
            var bookStorage = new Mock<IBookStorage>();
            var userSession = new Mock<IUserSession>();

            userSession.Setup(item => item.User).ReturnsAsync(new User { Id = 1 });

            this.service = new BookService(bookStorage.Object, userSession.Object);
        }

        [TestMethod]
        public async Task ShouldPassWithSameIds()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 1,
            };

            await this.service.CheckAccess(book);
        }

        [TestMethod]
        public async Task ShouldDeclineWithDiffIds()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 2,
            };

            await Assert.ThrowsExceptionAsync<EntityAccessDenied>(() => this.service.CheckAccess(book));
        }

        [TestMethod]
        public void ShouldPassWithSameIdsWithoutSession()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 2,
            };

            this.service.CheckAccess(2, book);
        }

        [TestMethod]
        public void ShouldDeclineWithDiffIdsWithoutSession()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name",
                UserId = 2,
            };

            Assert.ThrowsException<EntityAccessDenied>(() => this.service.CheckAccess(1, book));
        }
    }

    [TestClass]
    public class BookServiceEntityCheckingTests
    {
        private BookService service;

        [TestInitialize]
        public void BeforeEach()
        {
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
