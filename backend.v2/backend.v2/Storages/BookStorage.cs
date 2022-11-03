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
                .Where(book => book.UserId == id && book.Status == status).ToArrayAsync();
            
            return books;
        }
    }
}
