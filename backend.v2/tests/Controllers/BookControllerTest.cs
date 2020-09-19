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
        public async Task ShouldSaveMany()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var saved = await this.controller.CreateMany(new Book[] {book}) as OkObjectResult;
            
            Assert.IsNotNull(saved);
            Assert.AreEqual(200, saved.StatusCode);

            var storage = this.bookStorage.GetByGuid(book.Guid.Value);

            Assert.IsNotNull(storage);
        }

        [TestMethod]
        public async Task ShouldUpdateMany()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var book2 = new Book
            {
                Guid = book.Guid,
                Name = "Name2"
            };

            var saved = await this.controller.CreateMany(new Book[] {book}) as OkObjectResult;
            var updated = await this.controller.UpdateMany(new Book[] {book2}) as OkObjectResult;
        
            var storage = this.bookStorage.GetByGuid(book.Guid.Value);

            Assert.AreEqual(book2.Name, "Name2");
        }

        [TestMethod]
        public async Task ShouldDeleteMany()
        {
            var book = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name"
            };

            var book2 = new Book
            {
                Guid = Guid.NewGuid(),
                Name = "Name2"
            };

            var saved = await this.controller.CreateMany(new Book[] {book, book2}) as OkObjectResult;

            Console.WriteLine(book.Guid);
            Console.WriteLine(book2.Guid);
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(saved.Value));

            var updated = await this.controller.DeleteMany(new Guid[] {book.Guid.Value, book2.Guid.Value}) as OkObjectResult;
        
            var user = await this.userSession.User;

            var storage = await this.bookStorage.GetByUserId(user.Id);

            Assert.AreEqual(storage.Count(), 0);
        }
        
        [TestMethod]
        public async Task ShouldSync()
        {
            var init = new Book[] {
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name"
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name2"
                },
                new Book
                {
                    Guid = Guid.NewGuid(),
                    Name = "Name3"
                }
            };
            var saved = await this.controller.CreateMany(init) as OkObjectResult;

            var sync = new BookSyncModel {
                Add = new Book[] {
                    new Book {
                        Guid = Guid.NewGuid(),
                        Name = "Name4"
                    }
                },
                Update = new Book[] {
                    new Book {
                        Guid = init[0].Guid.Value,
                        Name = "Name5"
                    }
                },
                DeleteGuids = new Guid[] {init[2].Guid.Value}
            };
            var synched = await this.controller.Synchronize(sync) as OkObjectResult;

            var user = await this.userSession.User;

            var storage = (await this.bookStorage.GetByUserId(user.Id)).ToArray();

            var temp = storage.Where(item => item.Guid == sync.Update[0].Guid).Single();
            Assert.AreEqual(temp.Name, "Name5");

            temp = storage.Where(item => item.Guid == init[1].Guid).Single();
            Assert.AreEqual(temp.Name, "Name2");

            temp = storage.Where(item => item.Guid == sync.DeleteGuids[0]).SingleOrDefault();
            Assert.AreEqual(temp, null);

            temp = storage.Where(item => item.Guid == sync.Add[0].Guid).Single();
            Assert.AreEqual(temp.Name, "Name4");
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
                EndDate = DateTime.Now.AddDays(1)
            };

            await this.controller.Create(book);
            
            book.UserId = 2;
            
            var updateResult = await this.controller.Update(book);

            var result = updateResult as ObjectResult;
            
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
                EndDate = DateTime.Now.AddDays(1)
            };

            await this.controller.Create(book);
            
            book.UserId = 2;
            
            var result = await this.controller.Delete(book.Guid.Value) as ObjectResult;
            
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(BookCouldNotAccessSomeoneElsesException.ErrorMessage, result.Value);
        }
    }
}