using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Exceptions.Authentication;
using Server.Models;
using Server.Services;
using Server.Testing.Mocks;
using Server.Tests.Mocks.Storages;
using Server.Utils;
using System.Threading.Tasks;

namespace Server.Testing
{
    [TestClass]
    public class BookServiceTests
    {
        Book book = DefaultItems.book;

        BookStorageMock storage = new BookStorageMock();

        IBookService service;
        
        [TestInitialize()]
        public void Startup()
        {
            this.service = new BookService(this.storage);
        }

        [TestMethod]
        public async Task TestSave()
        {
            var saved = await this.service.Save(this.book);

            var result = await this.storage.GetByGuid(saved.Guid);

            Assert.AreEqual(this.book, result);
        }


        [TestMethod]
        public async Task TestDeleteByEntity()
        {
            var saved = await this.service.Save(this.book);

            await this.service.Delete(saved);

            var result = await this.storage.GetByGuid(saved.Guid);

            Assert.IsNull(result);
        }


        [TestMethod]
        public async Task TestDeleteById()
        {
            var saved = await this.service.Save(this.book);

            await this.service.Delete(saved.Guid);

            var result = await this.storage.GetByGuid(saved.Guid);

            Assert.IsNull(result);
        }


        [TestMethod]
        public async Task TestUpdate()
        {
            var saved = await this.service.Save(this.book);
                        
            await this.service.Update(saved);

            var updated = await this.storage.GetByGuid(saved.Guid);

            Assert.AreEqual(saved, updated);
        }
    }
}
