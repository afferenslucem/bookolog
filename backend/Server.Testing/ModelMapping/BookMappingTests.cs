using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Exceptions.Authentication;
using Server.Models;
using Server.Services;
using Server.Tests.Mocks.Storages;
using Server.Utils;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Testing.Mocks
{
    [TestClass]
    public class BookMappingTests
    {
        [TestMethod]
        public void BookToAdapterTest()
        {
            var book = new Book
            {
                Id = 1,
                Authors = new string[] { "a", "b" },
                Name = "name",
                Status = Status.Done,
                PagesRead = 0,
                TotalPages = 10,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                UserId = 2
            };

            var adapter = new BookStorageAdapter(book);

            Assert.IsTrue(
                book.Id == adapter.Id &&
                book.Authors.SequenceEqual(adapter.Authors) &&
                book.Name == adapter.Name &&
                book.Status == (Status)adapter.Status &&
                book.PagesRead == adapter.PagesRead &&
                book.TotalPages == adapter.TotalPages &&
                book.StartDate == adapter.StartDate &&
                book.EndDate == adapter.EndDate &&
                book.UserId == adapter.UserId
            );
        }
        [TestMethod]
        public void AdapterToBookTest()
        {
            var adapter = new BookStorageAdapter
            {
                Id = 1,
                Authors = new string[] { "a", "b" },
                Name = "name",
                Status = (int)Status.Done,
                PagesRead = 0,
                TotalPages = 10,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                UserId = 2
            };

            var book = new Book(adapter);

            Assert.IsTrue(
                book.Id == adapter.Id &&
                book.Authors.SequenceEqual(adapter.Authors) &&
                book.Name == adapter.Name &&
                book.Status == (Status)adapter.Status &&
                book.PagesRead == adapter.PagesRead &&
                book.TotalPages == adapter.TotalPages &&
                book.StartDate == adapter.StartDate &&
                book.EndDate == adapter.EndDate &&
                book.UserId == adapter.UserId
            );
        }
    }
}
