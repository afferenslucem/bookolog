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
                Name = "test",
                Authors = new string[] { "test1", "test2" },
                Status = Status.Done,
                UserId = 1,
                DoneUnits = 100,
                TotalUnits = 450,
                Genge = "Fantastic",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1),
                ModifyDate = DateTime.Now.AddDays(2),
                Note = "note",
                Guid = "csdcsdvdfvsdbsdfb sfgdvbsfd",
                Tags = new string[] { "tag1" },
                Type = Server.Models.Type.Audio,
                Year = 2018
            };

            var adapter = new BookStorageAdapter(book);

            Assert.IsTrue(
                book.Guid == adapter.Guid &&
                book.Authors.SequenceEqual(adapter.Authors) &&
                book.Name == adapter.Name &&
                book.Status == (Status)adapter.Status &&
                book.DoneUnits == adapter.DoneUnits &&
                book.TotalUnits == adapter.TotalUnits &&
                book.Genge == adapter.Genge &&
                book.StartDate == adapter.StartDate &&
                book.EndDate == adapter.EndDate &&
                book.ModifyDate == adapter.ModifyDate &&
                book.Note == adapter.Note &&
                book.Type == (Server.Models.Type?)adapter.Type &&
                book.Year == adapter.Year &&
                book.Tags.SequenceEqual(adapter.Tags) &&
                book.UserId == adapter.UserId
            );
        }
        [TestMethod]
        public void AdapterToBookTest()
        {
            var adapter = new BookStorageAdapter
            {
                Name = "test",
                Authors = new string[] { "test1", "test2" },
                Status = (int?)Status.Done,
                UserId = 1,
                DoneUnits = 100,
                TotalUnits = 450,
                Genge = "Fantastic",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1),
                ModifyDate = DateTime.Now.AddDays(2),
                Note = "note",
                Guid = "csdcsdvdfvsdbsdfb sfgdvbsfd",
                Tags = new string[] { "tag1" },
                Type = (int?)Server.Models.Type.Audio,
                Year = 2018
            };

            var book = new Book(adapter);

            Assert.IsTrue(
                book.Guid == adapter.Guid &&
                book.Authors.SequenceEqual(adapter.Authors) &&
                book.Name == adapter.Name &&
                book.Status == (Status)adapter.Status &&
                book.DoneUnits == adapter.DoneUnits &&
                book.TotalUnits == adapter.TotalUnits &&
                book.Genge == adapter.Genge &&
                book.StartDate == adapter.StartDate &&
                book.EndDate == adapter.EndDate &&
                book.ModifyDate == adapter.ModifyDate &&
                book.Note == adapter.Note &&
                book.Type == (Server.Models.Type?)adapter.Type &&
                book.Year == adapter.Year &&
                book.Tags.SequenceEqual(adapter.Tags) &&
                book.UserId == adapter.UserId
            );
        }
    }
}
