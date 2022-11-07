using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.v2.Models;

namespace backend.v2.Storages
{
    public interface IBookStorage : IEntityStorage<Book>
    {   
        Task<IEnumerable<Book>> GetByUserIdAndStatus(long id, Status status);
        Task<string[]> GetAllAuthors();
        Task<string[]> GetAllTags();
        Task<string[]> GetAllGenres();
    }

    public class BookStorage : EntityStorage<Book>, IBookStorage
    {
        protected override DbSet<Book> GetEntitiesSet(BookologContext context)
        {
            return context.Books;
        }

        protected override IQueryable<Book> GetQuariableSet(BookologContext context)
        {
            var set = this.GetEntitiesSet(context);

            return set.Include(item => item.RereadedByBooks);
        }

        public async Task<IEnumerable<Book>> GetByUserIdAndStatus(long id, Status status)
        {
            using var db = new BookologContext();

            var books = await db.Books
                .Include(item => item.RereadedByBooks)
                .Where(book => book.UserId == id && book.Status == status)
                .OrderByDescending(book => book.EndDateYear)
                .ThenByDescending(book => book.EndDateMonth)
                .ThenByDescending(book => book.EndDateDay)
                .ThenByDescending(book => book.ModifyDate)
                .ToArrayAsync();
            
            return books;
        }

        public async Task<string[]> GetAllAuthors()
        {
            using var db = new BookologContext();

            var temp = await db.Books
                .Select(book => book.Authors)
                .ToArrayAsync();

            var authors = temp
                .SelectMany(items => items)
                .Distinct()
                .OrderBy(item => item)
                .ToArray();

            return authors;
        }

        public async Task<string[]> GetAllTags()
        {
            using var db = new BookologContext();

            var temp = await db.Books
                .Select(book => book.Tags)
                .ToArrayAsync();
            
            var tags = temp
                .SelectMany(items => items)
                .Distinct()
                .OrderBy(item => item)
                .ToArray();

            return tags;
        }

        public async Task<string[]> GetAllGenres()
        {
            using var db = new BookologContext();

            var genres = await db.Books
                .Select(book => book.Genre)
                .Distinct()
                .OrderBy(item => item)
                .ToArrayAsync();

            return genres;
        }
    }
}
