﻿using backend.Models;
using backend.Storages;
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
        Task<Synched<Book>> Synch(SyncModel<Book> data);
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
            
            return await this.storage.Update(book);
        }

        public async Task<Book> Delete(Guid guid)
        {
            var currentState = await this.storage.GetByGuid(guid);
            await this.CheckAccess(currentState);
            
            return await this.storage.Delete(guid);
        }
        
        public async Task CheckAccess(Book book)
        {
            var currentUser = await this.session.User;

            if (book.UserId != currentUser.Id)
            {
                throw new BookCouldNotAccessSomeoneElsesException();
            }
        }
        
        public void CheckAccess(long userId, Book book)
        {   
            if (book.UserId != userId)
            {
                throw new BookCouldNotAccessSomeoneElsesException();
            }
        }

        public void CheckEntity(Book book)
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

        public async Task<Synched<Book>> Synch(SyncModel<Book> data)
        {
            try {
                var toDeleteAwait = this.CheckAndLoadForDelete(data.Delete);
                var toUpdateAwait = this.CheckForUpdate(data.Update);

                var loaded = await Task.WhenAll(toUpdateAwait, toDeleteAwait);

                var updatingAwait = this.storage.SaveOrUpdateMany(loaded[0]);
                var deletingAwait = this.DeleteMany(loaded[1]);

                var synched = await Task.WhenAll(updatingAwait, deletingAwait);

                return await this.GetDifferenceForSession();
            } catch (Exception e) {
                throw e;
            }
        }

        private async Task<Synched<Book>> GetDifferenceForSession() {
            var thres = this.session.LastSyncTime;
            var user = await this.session.User;

            var updateAwait = this.storage.GetChangedAfter(user.Id, thres);
            var deleteAwait = this.storage.GetDeletedAfter(user.Id, thres);

            var diff = await Task.WhenAll(updateAwait, deleteAwait);

            return new Synched<Book> {
                Update = diff[0],
                Delete = diff[1],
            };
        }

        public async Task<Book[]> SaveMany(Book[] books)
        {            
            books = await this.CheckForSave(books);

            return await this.storage.SaveMany(books);
        }

        public async Task<Book[]> CheckForSave(Book[] books) {
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

        public async Task<Book[]> CheckForUpdate(Book[] books) {
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

        public async Task<Book[]> DeleteMany(Book[] books)
        {            
            var user = await this.session.User;
            
            foreach(var item in books) {
                this.CheckAccess(user.Id, item);
            } 

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
