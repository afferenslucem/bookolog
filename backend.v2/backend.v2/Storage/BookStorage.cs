using backend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storage
{
    public interface IBookStorage
    {
        Task<Book> Save(Book book);
        Task<Book> Update(Book book);
        Task<Book> GetByGuid(Guid guid);
        Task<IEnumerable<Book>> GetByUserId(long id);
        Task<Book> Delete(Guid guid);
    }

    public class BookStorage : IBookStorage
    {
        public async Task<Book> Save(Book book)
        {
            using var context = new BookologContext();

            await context.Books.AddAsync(book);

            await context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> Update(Book book)
        {
            using var context = new BookologContext();

            context.Books.Update(book);

            await context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> GetByGuid(Guid guid)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.Id == guid).SingleAsync();

            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long id)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.UserId == id).ToArrayAsync();

            return result;
        }

        public async Task<Book> Delete(Guid guid)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.Id == guid).SingleAsync();

            context.Books.Remove(result);

            await context.SaveChangesAsync();

            return result;
        }
    }
}
