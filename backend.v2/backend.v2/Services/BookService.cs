using System.Collections.Generic;
using System.Threading.Tasks;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Storages;

namespace backend.v2.Services
{
    public interface IBookService : IEntityService<Book>
    {
        Task<IEnumerable<Book>> GetByStatus(Status status);
        Task<string[]> GetAllAuthors();
        Task<string[]> GetAllTags();
        Task<string[]> GetAllGenres();
    }

    public class BookService : EntityService<Book>, IBookService
    {
        private IBookStorage storage;
        private IUserSession session;

        public BookService(IUserSession session) : base(new BookStorage(), session)
        {
            this.storage = new BookStorage();
            this.session = session;
        }

        public BookService(IBookStorage storage, IUserSession session) : base(storage, session)
        {
            this.storage = storage;
            this.session = session;
        }

        public Task<IEnumerable<Book>> GetByStatus(Status status)
        {
            return storage.GetByUserIdAndStatus(session.User.Id, status);
        }

        public Task<string[]> GetAllAuthors()
        {
            return storage.GetAllAuthors();
        }

        public Task<string[]> GetAllTags()
        {
            return storage.GetAllTags();
        }

        public Task<string[]> GetAllGenres()
        {
            return storage.GetAllGenres();
        }

        public override void CheckEntity(Book book)
        {
            if (book.DoneUnits != null && book.TotalUnits != null && book.DoneUnits > book.TotalUnits)
            {
                throw new BookWrongUnitsException();
            }
            if (book.StartDate != null && book.EndDate != null && book.StartDate > book.EndDate)
            {
                throw new BookWrongDatesException();
            }
        }
    }
}
