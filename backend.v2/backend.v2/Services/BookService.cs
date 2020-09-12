using backend.Models;
using backend.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Exceptions.BookExceptions;

namespace backend.Services
{
    public interface IBookService
    {
        Task<Book> GetByGuid(Guid guid);
        Task<IEnumerable<Book>> GetByUserId(long userId);
        Task<Book> Save(Book book);
        Task<Book> Update(Book book);
        Task<Book> Delete(Guid guid);
        Task<Synched<Book>> Synch(Sync<Book, Guid> data);
    }

    public class BookService : IBookService
    {
        private IBookStorage storage;
        private IUserSession session;

        public BookService(IUserSession session)
        {
            this.storage = new BookStorage();
            this.session = session;
        }
        public BookService(IBookStorage storage, IUserSession session)
        {
            this.storage = storage;
            this.session = session;
        }

        public async Task<Book> GetByGuid(Guid guid)
        {
            var result = await this.storage.GetByGuid(guid);

            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long userId)
        {
            var result = await this.storage.GetByUserId(userId);

            return result;
        }

        public async Task<Book> Save(Book book)
        {
            var result = await this.storage.Save(book);
            this.CheckEntity(book);
            book.UserId = (await this.session.User).Id;

            return result;
        }

        public async Task<Book> Update(Book book)
        {
            var currentState = await this.storage.GetByGuid(book.Id.Value);
            
            await this.CheckAccess(currentState);
            this.CheckEntity(book);

            book.UserId = (await this.session.User).Id;
            
            return await this.storage.Update(book);
        }

        public async Task<Book> Delete(Guid guid)
        {
            var currentState = await this.storage.GetByGuid(guid);
            await this.CheckAccess(currentState);
            
            return await this.storage.Delete(guid);
        }
        
        private async Task CheckAccess(Book book)
        {
            if (book.UserId != (await this.session.User).Id)
            {
                throw new BookCouldNotAccessSomeoneElsesException();
            }
        }

        private void CheckEntity(Book book)
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

        public async Task<Synched<Book>> Synch(Sync<Book, Guid> data)
        {
            var toDeleteAwait = this.storage.GetByGuids(data.DeleteGuids);

            foreach(var item in data.Add) {
                this.CheckEntity(item);
            }

            foreach(var item in data.Update) {
                this.CheckEntity(item);
                await this.CheckAccess(item);
            }

            var toDelete = await toDeleteAwait;

            foreach(var item in toDelete) {
                await this.CheckAccess(item);
            }

            data.Delete = toDelete;

            return await this.storage.Synch(data);
        }
    }
}
