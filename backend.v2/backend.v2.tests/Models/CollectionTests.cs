using System;
using backend.v2.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Type = backend.v2.Models.Type;

namespace backend.v2.tests.Models
{
    [TestClass]
    public class CollectionTests
    {
        private Collection model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new Collection();
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
            var description = "description";
            var modifyDate = new DateTime(2021, 3, 1, 17, 33, 0);
            var createDate = new DateTime(2021, 3, 1, 17, 34, 0);
            var deleteDate = new DateTime(2021, 3, 1, 17, 35, 0);
            var coverId = 1;
            var coverName = "coverName";
            var userId = 2;

            var book = new Collection()
            {
                Guid = guid,
                Name = name,
                Description = description,
                ModifyDate = modifyDate,
                CreateDate = createDate,
                DeleteDate = deleteDate,
                CoverId = coverId,
                CoverName = coverName,
                UserId = userId,
            };
            
            Assert.AreEqual(book.Guid, guid);
            Assert.AreEqual(book.Name, name);
            Assert.AreEqual(book.Description, description);
            Assert.AreEqual(book.ModifyDate, modifyDate);
            Assert.AreEqual(book.CreateDate, createDate);
            Assert.AreEqual(book.DeleteDate, deleteDate);
            Assert.AreEqual(book.UserId, userId);
            Assert.AreEqual(book.CoverId, coverId);
            Assert.AreEqual(book.CoverName, coverName);
            Assert.AreEqual(book.Deleted, true);
        }

        [TestMethod]
        public void ShouldReturnNullableDates()
        {
            var book = new Collection();
            
            Assert.AreEqual(book.Deleted, false);
        }
    }
}