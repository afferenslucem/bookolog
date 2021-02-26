using Microsoft.EntityFrameworkCore;
using backend.v2.Models;

namespace backend.v2.Storages
{
    public interface IBookStorage : IEntityStorage<Book>
    {   
    }

    public class BookStorage : EntityStorage<Book>, IBookStorage
    {
        protected override DbSet<Book> GetEntitiesSet(BookologContext context)
        {
            return context.Books;
        }
    }
}
