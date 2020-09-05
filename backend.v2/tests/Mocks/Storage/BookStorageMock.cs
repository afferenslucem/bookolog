using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Services;
using backend.Storage;

namespace tests.Storage
{
    public class BookStorageMock: IBookStorage
    {
        private IDictionary<Guid, Book> storage = new Dictionary<Guid, Book>();
        public async Task<Book> Save(Book book)
        {
            await Task.Run(() => this.storage[book.Id.Value] = book);

            return book;
        }

        public async Task<Book> Update(Book book)
        {
            await Task.Run(() => this.storage[book.Id.Value] = book);

            return book;
        }

        public async Task<Book> GetByGuid(Guid guid)
        {
            return await Task.Run(() => this.storage[guid]);
        }

        public Task<IEnumerable<Book>> GetByUserId(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Book> Delete(Guid guid)
        {
            var book = this.storage[guid];
            
            await Task.Run(() => this.storage.Remove(guid));
            
            return book;
        }
    }
}