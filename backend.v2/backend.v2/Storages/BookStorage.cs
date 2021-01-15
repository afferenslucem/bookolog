using backend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storages
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
