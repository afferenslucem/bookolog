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
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Services
{
    [TestClass]
    public class BookServiceTests
    {
        private Mock<IBookStorage> storageMock;
        private Mock<IUserSession> sessionMock;

        private Mock<BookService> serviceMock;

        [TestInitialize]
        public void BeforeEach()
        {
            this.storageMock = new Mock<IBookStorage>();
            this.sessionMock = new Mock<IUserSession>();

            this.serviceMock = new Mock<BookService>(
                MockBehavior.Default,
                storageMock.Object,
                sessionMock.Object
            );

            this.serviceMock.CallBase = true;
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(serviceMock.Object);
        }

        [TestMethod]
        public async Task ShouldReturnByGuid()
        {
            var guid = Guid.NewGuid();

            var book = new Book()
            {
                Guid = guid
            };
            
            storageMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(book);

            var result = await serviceMock.Object.GetByGuid(guid);
            
            Assert.AreSame(result, book);
            
            storageMock.Verify(m => m.GetByGuid(guid), Times.Once);
        }

        [TestMethod]
        public async Task ShouldSave()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            
            var guid = Guid.NewGuid();

            var book = new Book()
            {
                Guid = guid
            };

            serviceMock.Setup(m => m.CheckEntity(It.IsAny<Book>()));
            storageMock.Setup(m => m.Save(It.IsAny<Book>())).ReturnsAsync(book);

            var result = await serviceMock.Object.Save(book);
            
            Assert.AreSame(result, book);
            
            storageMock.Verify(m => m.Save(book), Times.Once);            
            serviceMock.Verify(m => m.CheckEntity(book));

            Assert.AreEqual(book.UserId, 2);
        }

        [TestMethod]
        public async Task ShouldUpdate()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            serviceMock.Setup(m => m.CheckEntity(It.IsAny<Book>()));
            
            var guid = Guid.NewGuid();

            var book = new Book()
            {
                Guid = guid
            };
            var currentStateOfBook = new Book()
            {
                Guid = guid,
                UserId = 2,
            };
            
            storageMock.Setup(m => m.Update(It.IsAny<Book>())).ReturnsAsync(book);
            serviceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(currentStateOfBook);


            var result = await serviceMock.Object.Update(book);
            
            Assert.AreSame(result, book);
            
            storageMock.Verify(m => m.Update(book), Times.Once);
            serviceMock.Verify(m => m.CheckEntity(book), Times.Once);  
            Assert.AreEqual(book.UserId, 2);
        }

        [TestMethod]
        public async Task UpdateShouldThrowAccessDenied()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            
            var guid = Guid.NewGuid();
            var book = new Book()
            {
                Guid = guid,
            };
            var currentStateOfBook = new Book()
            {
                Guid = guid,
                UserId = 1,
            };
            
            storageMock.Setup(m => m.Update(It.IsAny<Book>())).ReturnsAsync(book);
            serviceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(currentStateOfBook);

            await Assert.ThrowsExceptionAsync<EntityAccessDeniedException>(() => serviceMock.Object.Update(book));
        }

        [TestMethod]
        public async Task ShouldDelete()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            
            var guid = Guid.NewGuid();
            var currentStateOfBook = new Book()
            {
                Guid = guid,
                UserId = 2,
            };
            
            storageMock.Setup(m => m.Delete(It.IsAny<Guid>())).ReturnsAsync(currentStateOfBook);
            serviceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(currentStateOfBook);


            var result = await serviceMock.Object.Delete(guid);
            
            Assert.AreSame(result, currentStateOfBook);
            
            storageMock.Verify(m => m.Delete(guid), Times.Once);
        }

        [TestMethod]
        public async Task DeleteShouldThrowAccessDenied()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            
            var guid = Guid.NewGuid();
            var currentStateOfBook = new Book()
            {
                Guid = guid,
                UserId = 1,
            };
            
            storageMock.Setup(m => m.Update(It.IsAny<Book>())).ReturnsAsync(currentStateOfBook);
            serviceMock.Setup(m => m.GetByGuid(It.IsAny<Guid>())).ReturnsAsync(currentStateOfBook);

            await Assert.ThrowsExceptionAsync<EntityAccessDeniedException>(() => serviceMock.Object.Delete(guid));
        }

        [TestMethod]
        public async Task ShouldSaveMany()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var books = new [] {new Book(), new Book()};
            
            storageMock.Setup(m => m.SaveMany(It.IsAny<Book[]>()));
            serviceMock.Setup(m => m.CheckEntity(It.IsAny<Book>()));

            await serviceMock.Object.SaveMany(books);
            
            serviceMock.Verify(m => m.CheckEntity(It.IsAny<Book>()), Times.Exactly(2));
            storageMock.Verify(m => m.SaveMany(books));
            
            Assert.AreEqual(books[0].UserId, 2);
            Assert.AreEqual(books[1].UserId, 2);
        }

        [TestMethod]
        public async Task ShouldUpdateMany()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            var currentStatesBooks = new [] {new Book(), new Book()};
            
            storageMock.Setup(m => m.UpdateMany(It.IsAny<Book[]>()));
            serviceMock.Setup(m => m.CheckEntity(It.IsAny<Book[]>()));
            serviceMock.Setup(m => m.EntityAccessCheck(It.IsAny<Guid[]>())).ReturnsAsync(currentStatesBooks);
            serviceMock.Setup(m => m.CopyMetadata(It.IsAny<Book[]>(), It.IsAny<Book[]>()));

            await serviceMock.Object.UpdateMany(books);
            
            storageMock.Verify(m => m.UpdateMany(books), Times.Once());
            serviceMock.Verify(m => m.EntityAccessCheck(
                    It.Is<Guid[]>(v => v[0] == books[0].Guid && v[1] == books[1].Guid)
                ), Times.Once()
            );
            serviceMock.Verify(m => m.CheckEntity(books), Times.Once());
            serviceMock.Verify(m => m.CopyMetadata(books, currentStatesBooks), Times.Once());
        }

        [TestMethod]
        public async Task UpdateManyShouldThrowAccessCheckError()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            var currentStatesBooks = new [] {new Book() { UserId = 1 }, new Book() { UserId = 2 }};
            
            storageMock.Setup(m => m.UpdateMany(It.IsAny<Book[]>()));
            serviceMock.Setup(m => m.GetByGuids(It.IsAny<Guid[]>())).ReturnsAsync(currentStatesBooks);

            await Assert.ThrowsExceptionAsync<EntityAccessDeniedException>(() => serviceMock.Object.UpdateMany(books));
        }

        [TestMethod]
        public async Task ShouldDeleteMany()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            var currentStatesBooks = new [] {new Book(), new Book()};
            
            storageMock.Setup(m => m.DeleteMany(It.IsAny<Book[]>()));
            serviceMock.Setup(m => m.EntityAccessCheck(It.IsAny<Guid[]>())).ReturnsAsync(currentStatesBooks);

            await serviceMock.Object.DeleteMany(books);
            
            storageMock.Verify(m => m.DeleteMany(books), Times.Once());
            serviceMock.Verify(m => m.EntityAccessCheck(
                    It.Is<Guid[]>(v => v[0] == books[0].Guid && v[1] == books[1].Guid)
                ), Times.Once()
            );
        }

        [TestMethod]
        public async Task DeleteManyShouldThrowAccessError()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            var currentStatesBooks = new [] {new Book() { UserId = 1 }, new Book() { UserId = 2 }};
            
            serviceMock.Setup(m => m.GetByGuids(It.IsAny<Guid[]>())).ReturnsAsync(currentStatesBooks);
            
            await Assert.ThrowsExceptionAsync<EntityAccessDeniedException>(() => serviceMock.Object.DeleteMany(books));
        }

        [TestMethod]
        public async Task ShouldDeleteManyByGuids()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });

            var booksGuids = new [] { Guid.NewGuid(), Guid.NewGuid() };
            var currentStatesBooks = new [] {new Book(), new Book()};
            
            storageMock.Setup(m => m.DeleteMany(It.IsAny<Guid[]>()));

            await serviceMock.Object.DeleteMany(booksGuids);
            
            storageMock.Verify(m => m.DeleteMany(booksGuids), Times.Once());
        }

        [TestMethod]
        public async Task ShouldReturnForUser()
        {
            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            storageMock.Setup(m => m.GetByUserId(It.IsAny<long>())).ReturnsAsync(books);

            var result = await serviceMock.Object.GetByUserId(1);
            
            storageMock.Verify(m => m.GetByUserId(1), Times.Once());
            Assert.AreSame(books, result);
        }

        [TestMethod]
        public async Task ShouldCheckAccess()
        {
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });
            
            var books = new [] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() }};
            var guids = books.Select(item => item.Guid.Value).ToArray();
            
            serviceMock.Setup(m => m.GetByGuids(It.IsAny<Guid[]>())).ReturnsAsync(books);
            serviceMock.Setup(m => m.CheckAccess(It.IsAny<long>(), It.IsAny<Book>()));
            
            await serviceMock.Object.EntityAccessCheck(guids);
            
            serviceMock.Verify(m => m.GetByGuids(guids), Times.Once());
            serviceMock.Verify(m => m.CheckAccess(2, It.IsIn(books)), Times.Exactly(2));
        }

        [TestMethod]
        public async Task ShouldSync()
        {
            var data = new SyncData<Book>()
            {
                Delete = new[] {Guid.NewGuid(), Guid.NewGuid(),},
                Update = new Book[] {new Book() { Guid = Guid.NewGuid() }, new Book() { Guid = Guid.NewGuid() },}
            };

            var toUpdate = new Book[] {new Book(), new Book(),};
            var toDelete = new Book[] {new Book() {Guid = Guid.NewGuid()}, new Book() {Guid = Guid.NewGuid()},};
            
            sessionMock.SetupGet(m => m.User).Returns(new User() { Id = 2 });
            serviceMock.Setup(m => m.EntityAccessCheck(It.IsAny<Guid[]>())).ReturnsAsync(new Queue<Book[]>( new [] { toDelete, toUpdate } ).Dequeue);

            serviceMock.Setup(m => m.CopyMetadata(It.IsAny<Book[]>(), It.IsAny<Book[]>()));

            storageMock.Setup(m => m.SaveOrUpdateMany(It.IsAny<Book[]>()));
            storageMock.Setup(m => m.DeleteMany(It.IsAny<Book[]>()));

            serviceMock.Setup(m => m.GetDifferenceForSession());

            await serviceMock.Object.Synch(data);
            
            serviceMock.Verify(m => m.EntityAccessCheck(data.Delete), Times.Once());
            serviceMock.Verify(m => m.EntityAccessCheck(It.Is<Guid[]>(v => v[0] == data.Update[0].Guid && v[1] == data.Update[1].Guid)), Times.Once());
            
            serviceMock.Verify(m => m.CopyMetadata(data.Update, toUpdate), Times.Once());
            
            storageMock.Verify(m => m.SaveOrUpdateMany(data.Update), Times.Once());
            storageMock.Verify(m => m.DeleteMany(toDelete), Times.Once());
            serviceMock.Verify(m => m.GetDifferenceForSession(), Times.Once());
        }

        [TestMethod]
        public async Task ShouldGetNewForSession()
        {
            sessionMock.SetupGet(m => m.LastSyncTime).Returns(new DateTime(2021, 3, 21, 17, 34, 0));
            sessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 1,
            });

            var updateResult = new Book[] { };
            var deleteResult = new Book[] { };

            storageMock.Setup(m => m.GetDeletedAfter(It.IsAny<long>(), It.IsAny<DateTime>()))
                .ReturnsAsync(deleteResult);

            storageMock.Setup(m => m.GetChangedAfter(It.IsAny<long>(), It.IsAny<DateTime>()))
                .ReturnsAsync(updateResult);

            var result = await serviceMock.Object.GetDifferenceForSession();
            
            storageMock.Verify(m => m.GetDeletedAfter(1, new DateTime(2021, 3, 21, 17, 34, 0)));
            storageMock.Verify(m => m.GetChangedAfter(1, new DateTime(2021, 3, 21, 17, 34, 0)));
            
            Assert.AreEqual(result.Update.Length, 0);
            Assert.AreEqual(result.Delete.Length, 0);
        }

        [TestMethod]
        public void ShouldCopyMetadata()
        {
            serviceMock.Setup(m => m.CopyMetadata(It.IsAny<Book>(), It.IsAny<Book>()));

            var guid = Guid.NewGuid();

            var newBooks = new[] {new Book() {Guid = guid}};
            var oldBooks = new[] {new Book() {Guid = guid}};
            
            serviceMock.Object.CopyMetadata(newBooks, oldBooks);
            
            serviceMock.Verify(m => m.CopyMetadata(newBooks[0], oldBooks[0]), Times.Once());
            serviceMock.Verify(m => m.CopyMetadata(It.IsAny<Book>(), It.IsAny<Book>()), Times.Once());
        }

        [TestMethod]
        public void CheckEntityShouldPassNullUnits()
        {

            var book = new Book()
            {
                DoneUnits = null,
                TotalUnits = null,
            };
            
            serviceMock.Object.CheckEntity(book);
        }

        [TestMethod]
        public void CheckEntityShouldPassTotalGreaterThenDone()
        {

            var book = new Book()
            {
                DoneUnits = 100,
                TotalUnits = 200,
            };
            
            serviceMock.Object.CheckEntity(book);
        }

        [TestMethod]
        public void CheckEntityShouldThrowDoneGreaterThenTotal()
        {

            var book = new Book()
            {
                DoneUnits = 200,
                TotalUnits = 100,
            };

            Assert.ThrowsException<BookWrongUnitsException>(() => serviceMock.Object.CheckEntity(book));
        }

        [TestMethod]
        public void CheckEntityShouldPassNullDates()
        {

            var book = new Book()
            {
                StartDateYear = null,
                StartDateMonth = null,
                StartDateDay = null,
                EndDateYear = null,
                EndDateMonth = null,
                EndDateDay = null,
            };
            
            serviceMock.Object.CheckEntity(book);
        }

        [TestMethod]
        public void CheckEntityShouldPassEndGreaterThenStart()
        {

            var book = new Book()
            {
                StartDateYear = 2020,
                StartDateMonth = 12,
                StartDateDay = 31,
                EndDateYear = 2021,
                EndDateMonth = null,
                EndDateDay = null,
            };
            
            serviceMock.Object.CheckEntity(book);
        }

        [TestMethod]
        public void CheckEntityShouldThrowStartGreaterThenEnd()
        {

            var book = new Book()
            {
                StartDateYear = 2022,
                EndDateYear = 2021,
                EndDateMonth = 3,
                EndDateDay = 3,
            };
            
            Assert.ThrowsException<BookWrongDatesException>(() => serviceMock.Object.CheckEntity(book));
        }
    }
}