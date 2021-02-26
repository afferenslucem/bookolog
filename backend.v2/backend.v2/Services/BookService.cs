using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Storages;

namespace backend.v2.Services
{
    public interface IBookService : IEntityService<Book>
    {
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
