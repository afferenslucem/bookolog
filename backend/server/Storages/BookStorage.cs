using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Storages
{
    public interface IBookStorage
    {
        Task<Book> GetById(long id);
        Task<Book> Save(Book book);
        Task Update(Book book);
        Task Delete(Book book);
        Task Delete(long bookId);
        Task<IEnumerable<Book>> GetByUserId(int id);
    }

    public class BookStorage : IBookStorage
    {
        IDictionary<long, Book> repository = new Dictionary<long, Book>();

        public async Task<Book> Save(Book book)
        {
            var lastId = await Task.Run(() => this.repository.Keys.DefaultIfEmpty(0).Max());

            lastId++;

            book.Id = lastId;

            this.repository[lastId] = book;

            return book;
        }

        public async Task Update(Book book)
        {
            await Task.Run(() => this.repository[book.Id] = book);
        }

        public async Task<Book> GetById(long id)
        {
            var result = await Task.Run(() => this.repository[id]);
            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(int id)
        {
            return await Task.Run(() => this.repository.Values); 
        }

        public async Task Delete(Book book)
        {
            await Task.Run(() => this.repository.Remove(book.Id));
        }

        public async Task Delete(long bookId)
        {
            await Task.Run(() => this.repository.Remove(bookId));
        }
    }
}
