using System;
using backend.v2.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Type = backend.v2.Models.Type;

namespace backend.v2.tests.Models
{
    [TestClass]
    public class BookTests
    {
        private Book model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new Book();
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(model);
        }

        [TestMethod]
        public void ShouldSetAllProperties()
        {
            var guid = Guid.NewGuid();
            var name = "name";
            var authors = new string[] { };
            var status = Status.ToRead;
            var tags = new string[] { };
            var done = (short)0;
            var total = (short)100;
            var collectionGuid = Guid.NewGuid();
            var order = (short)1;
            var genre = "genre";
            var startYear = (short)2019;
            var startMonth = (short)3;
            var startDay = (short)1;
            var endYear = (short)2021;
            var endMonth = (short)3;
            var endDay = (short)2;
            var year = (short)1998;
            var modifyDate = new DateTime(2021, 3, 1, 17, 33, 0);
            var createDate = new DateTime(2021, 3, 1, 17, 34, 0);
            var deleteDate = new DateTime(2021, 3, 1, 17, 35, 0);
            var progressType = "done";
            var type = Type.Audio;
            var note = "note";
            var userId = 1;

            var book = new Book()
            {
                Guid = guid,
                Name = name,
                Authors = authors,
                Status = status,
                Tags = tags,
                DoneUnits = done,
                TotalUnits = total,
                CollectionGuid = collectionGuid,
                CollectionOrder = order,
                Genre = genre,
                StartDateYear = startYear,
                StartDateMonth = startMonth,
                StartDateDay = startDay,
                EndDateYear = endYear,
                EndDateMonth = endMonth,
                EndDateDay = endDay,
                Year = year,
                ModifyDate = modifyDate,
                CreateDate = createDate,
                DeleteDate = deleteDate,
                ProgressType = progressType,
                Type = type,
                Note = note,
                UserId = userId,
            };
            
            Assert.AreEqual(book.Guid, guid);
            Assert.AreEqual(book.Name, name);
            Assert.AreSame(book.Authors, authors);
            Assert.AreEqual(book.Status, status);
            Assert.AreSame(book.Tags, tags);
            Assert.AreEqual(book.DoneUnits, done);
            Assert.AreEqual(book.TotalUnits, total);
            Assert.AreEqual(book.CollectionGuid, collectionGuid);
            Assert.AreEqual(book.CollectionOrder, order);
            Assert.AreEqual(book.Genre, genre);
            Assert.AreEqual(book.StartDateYear, startYear);
            Assert.AreEqual(book.StartDateMonth, startMonth);
            Assert.AreEqual(book.StartDateDay, startDay);
            Assert.AreEqual(book.EndDateYear, endYear);
            Assert.AreEqual(book.EndDateMonth, endMonth);
            Assert.AreEqual(book.EndDateDay, endDay);
            Assert.AreEqual(book.Year, year);
            Assert.AreEqual(book.ModifyDate, modifyDate);
            Assert.AreEqual(book.CreateDate, createDate);
            Assert.AreEqual(book.DeleteDate, deleteDate);
            Assert.AreEqual(book.ProgressType, progressType);
            Assert.AreEqual(book.Type, type);
            Assert.AreEqual(book.Note, note);
            Assert.AreEqual(book.UserId, userId);
            Assert.AreEqual(book.StartDate, new DateTime(2019, 3, 1));
            Assert.AreEqual(book.EndDate, new DateTime(2021, 3, 2));
            Assert.AreEqual(book.Deleted, true);
        }

        [TestMethod]
        public void ShouldReturnNullableDates()
        {
            var book = new Book();
            
            Assert.AreEqual(book.EndDate, null);
            Assert.AreEqual(book.StartDate, null);
            Assert.AreEqual(book.Deleted, false);
        }
    }
}