using Server.Models;
using Storage.Repositories;
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
        Task<IEnumerable<Book>> GetByUserId(long userId);
    }

    public class BookStorage : IBookStorage
    {
        IBookRepository repository = BookRepository.GetRepository(Config.ConnectionString);

        public async Task<Book> Save(Book book)
        {
            var saved = await this.repository.Save(new BookStorageAdapter(book));
            
            var result = new Book(saved);

            return result;
        }

        public async Task Update(Book book)
        {

            await this.repository.Update(new BookStorageAdapter(book));
        }

        public async Task<Book> GetById(long id)
        {
            var book = await this.repository.GetById(id);

            var result = new Book(book);

            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long id)
        {
            var books = await this.repository.GetByUserId(id);

            var result = books.Select(item => new Book(item));

            return result;
        }

        public async Task Delete(Book book)
        {
            await this.repository.Delete(book.Id);
        }

        public async Task Delete(long bookId)
        {
            await this.repository.Delete(bookId);
        }
    }
}
