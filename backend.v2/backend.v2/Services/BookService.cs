using backend.Models;
using backend.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IBookService
    {
        Task<Book> GetByGuid(Guid guid);
        Task<IEnumerable<Book>> GetByUserId(long userId);
        Task<Book> Save(Book book);
        Task<Book> Update(Book book);
        Task<Book> Delete(Guid guid);
    }

    public class BookService : IBookService
    {
        private BookStorage storage;

        public BookService()
        {
            this.storage = new BookStorage();
        }
        public BookService(BookStorage storage)
        {
            this.storage = storage;
        }

        public async Task<Book> GetByGuid(Guid guid)
        {
            var result = await this.storage.GetByGuid(guid);

            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long userId)
        {
            var result = await this.storage.GetByUserId(userId);

            return result;
        }

        public async Task<Book> Save(Book book)
        {
            var result = await this.storage.Save(book);

            return result;
        }

        public async Task<Book> Update(Book book)
        {
            return await this.storage.Update(book);
        }

        public async Task<Book> Delete(Guid guid)
        {
            return await this.storage.Delete(guid);
        }
    }
}
