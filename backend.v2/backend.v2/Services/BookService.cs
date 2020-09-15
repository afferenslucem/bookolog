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
        Task<Synched<Book>> Synch(BookSyncModel data);
        Task<Book[]> SaveMany(Book[] book);
        Task<Book[]> UpdateMany(Book[] book);
        Task<Book[]> DeleteMany(Guid[] book);
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
            this.CheckEntity(book);
            book.UserId = (await this.session.User).Id;
            var result = await this.storage.Save(book);

            return result;
        }

        public async Task<Book> Update(Book book)
        {
            var currentState = await this.storage.GetByGuid(book.Guid.Value);
            
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
        
        private void CheckAccess(long userId, Book book)
        {
            if (book.UserId != userId)
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

        public async Task<Synched<Book>> Synch(BookSyncModel data)
        {
            try {
                var toDeleteAwait = this.CheckAndLoadForDelete(data.DeleteGuids);
                var toUpdateAwait = this.CheckForUpdate(data.Update);
                var toAddAwait = this.CheckForSave(data.Add);

                var loaded = await Task.WhenAll(toAddAwait, toUpdateAwait, toDeleteAwait);

                var savingAwait = this.storage.SaveMany(loaded[0]);
                var updatingAwait = this.storage.UpdateMany(loaded[1]);
                var deletingAwait = this.storage.DeleteMany(loaded[2]);

                var synched = await Task.WhenAll(savingAwait, updatingAwait, deletingAwait);

                return new Synched<Book> {
                    Add = synched[0],
                    Update = synched[1],
                    Delete = synched[2],
                };
            } catch (Exception e) {
                throw e;
            }
        }


        public async Task<Book[]> SaveMany(Book[] books)
        {            
            books = await this.CheckForSave(books);

            return await this.storage.SaveMany(books);
        }

        private async Task<Book[]> CheckForSave(Book[] books) {
            var user = await this.session.User;

            foreach(var item in books) {
                this.CheckEntity(item);
                item.UserId = user.Id;
            }

            return books;
        }

        public async Task<Book[]> UpdateMany(Book[] books)
        {            
            books = await this.CheckForUpdate(books);

            return await this.storage.UpdateMany(books);
        }

        private async Task<Book[]> CheckForUpdate(Book[] books) {
            var user = await this.session.User;
            var toUpdateAwait = this.storage.GetByGuids(books.Select(item => item.Guid.Value).ToArray());

            foreach(var item in books) {
                this.CheckEntity(item);
                item.UserId = user.Id;
            }

            var toUpdate = await toUpdateAwait;

            foreach(var item in toUpdate) {
                this.CheckAccess(user.Id, item);
            }

            return books;
        }

        public async Task<Book[]> DeleteMany(Guid[] guids)
        {            
            var books = await this.CheckAndLoadForDelete(guids);

            return await this.storage.DeleteMany(books);
        }

        private async Task<Book[]> CheckAndLoadForDelete(Guid[] books) {
            var toDeleteAwait = this.storage.GetByGuids(books);
            var user = await this.session.User;

            var toDelete = await toDeleteAwait;

            foreach(var item in toDelete) {
                this.CheckAccess(user.Id, item);
            } 
            
            return toDelete;
        }
    }
}
