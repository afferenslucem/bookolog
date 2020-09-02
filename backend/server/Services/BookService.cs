using Server.Models;
using Server.Storages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IBookService
    {
        Task<Book> GetByGuid(string guid);
        Task<IEnumerable<Book>> GetByUserId(long userId);
        Task<Book> Save(Book book);
        Task Update(Book book);
        Task Delete(Book book);
        Task Delete(string guid);
    }

    public class BookService : IBookService
    {
        private IBookStorage storage;

        public BookService()
        {
            this.storage = new BookStorage();
        }
        public BookService(IBookStorage storage)
        {
            this.storage = storage;
        }

        public async Task<Book> GetByGuid(string guid)
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

        public async Task Update(Book book)
        {
             await this.storage.Update(book);
        }

        public async Task Delete(Book book)
        {
            await this.storage.Delete(book);
        }

        public async Task Delete(string guid)
        {
            await this.storage.Delete(guid);
        }
    }
}
