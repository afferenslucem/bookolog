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
        Task<Book[]> GetByGuids(Guid[] guids);
        Task<Book[]> GetChangedAfter(DateTime date);
        Task<Book[]> GetDeletedAfter(DateTime date);
        Task<IEnumerable<Book>> GetByUserId(long id);
        Task<Book> Delete(Guid guid);
        Task<Book[]> SaveMany(Book[] books);
        Task<Book[]> UpdateMany(Book[] books);
        Task<Book[]> SaveOrUpdateMany(Book[] books);
        Task<Book[]> DeleteMany(Book[] books);
    }

    public class BookStorage : IBookStorage
    {
        public async Task<Book> Save(Book book)
        {
            using var context = new BookologContext();

            book = this.MarkBookForSave(book);
            await context.Books.AddAsync(book);

            await context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> Update(Book book)
        {
            using var context = new BookologContext();

            book = this.MarkBookForUpdate(book);
            context.Books.Update(book);

            await context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> SaveOrUpdate(Book book)
        {
            using var context = new BookologContext();

            var exists = context.Books.Any(item => item.Guid == book.Guid);

            if (exists)
            {
                book = this.MarkBookForUpdate(book);
                context.Books.Update(book);
            }
            else
            {
                book = this.MarkBookForSave(book);
                context.Add(book);
            }

            await context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> GetByGuid(Guid guid)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.Guid == guid && item.DeleteDate == null).SingleAsync();

            return result;
        }
        public async Task<Book[]> GetByGuids(Guid[] guids)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => guids.Contains(item.Guid.Value) && item.DeleteDate == null).ToArrayAsync();

            return result;
        }

        public async Task<Book[]> GetDeletedAfter(DateTime date)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.DeleteDate >= date).ToArrayAsync();

            return result;
        }

        public async Task<Book[]> GetChangedAfter(DateTime date)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.ModifyDate >= date || item.CreateDate >= date).ToArrayAsync();

            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long id)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.UserId == id && item.DeleteDate == null).ToArrayAsync();

            return result;
        }

        public async Task<Book> Delete(Guid guid)
        {
            using var context = new BookologContext();

            var result = await context.Books.Where(item => item.Guid == guid).SingleAsync();

            result = this.MarkBookForDelete(result);

            context.Books.Update(result);

            await context.SaveChangesAsync();

            return result;
        }

        public async Task<Book[]> SaveMany(Book[] books)
        {
            using var context = new BookologContext();

            books = books.Select(item => this.MarkBookForSave(item)).ToArray();

            await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();

            return books;
        }
        public async Task<Book[]> UpdateMany(Book[] books)
        {
            using var context = new BookologContext();

            books = books.Select(item => this.MarkBookForUpdate(item)).ToArray();

            context.Books.UpdateRange(books);
            await context.SaveChangesAsync();

            return books;
        }
        public async Task<Book[]> SaveOrUpdateMany(Book[] books)
        {
            using var context = new BookologContext();

            var toAdd = books.Where(item => context.Books.All(book => book.Guid != item.Guid)).ToArray();
            var toUpdate = books.Where(item => context.Books.Any(book => book.Guid == item.Guid)).ToArray();

            toUpdate = toUpdate.Select(item => this.MarkBookForUpdate(item)).ToArray();
            toAdd = toAdd.Select(item => this.MarkBookForSave(item)).ToArray();

            var addingAwait = context.AddRangeAsync(toAdd);

            context.UpdateRange(toUpdate);

            await addingAwait;

            await context.SaveChangesAsync();

            return books;
        }
        public async Task<Book[]> DeleteMany(Book[] books)
        {
            using var context = new BookologContext();

            books = books.Select(item => this.MarkBookForDelete(item)).ToArray();

            context.Books.UpdateRange(books);
            await context.SaveChangesAsync();

            return books;
        }

        private Book MarkBookForDelete(Book book)
        {
            book.DeleteDate = DateSessionUtils.Now;

            return book;
        }

        private Book MarkBookForUpdate(Book book)
        {
            book.ModifyDate = DateSessionUtils.Now;

            return book;
        }

        private Book MarkBookForSave(Book book)
        {
            book.CreateDate = DateSessionUtils.Now;

            return book;
        }
    }
}
