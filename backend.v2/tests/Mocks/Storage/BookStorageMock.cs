using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Services;
using backend.Storage;

namespace tests.Storage
{
    public class BookStorageMock: IBookStorage
    {
        private IDictionary<Guid, Book> storage = new Dictionary<Guid, Book>();
        public async Task<Book> Save(Book book)
        {
            await Task.Run(() => this.storage[book.Guid.Value] = book);

            return book;
        }

        public async Task<Book> Update(Book book)
        {
            await Task.Run(() => this.storage[book.Guid.Value] = book);

            return book;
        }
        
        public async Task<Book> GetByGuid(Guid guid)
        {
            return await Task.Run(() => this.storage[guid]);
        }

        public Task<Book[]> GetByGuids(Guid[] guids)
        {
            return Task.Run(() => this.storage.Values.Where(item => guids.Contains(item.Guid.Value)).ToArray());
        }

        public Task<IEnumerable<Book>> GetByUserId(long id)
        {
            return Task.Run(() => this.storage.Values.Where(item => item.UserId == id));
        }

        public async Task<Book> Delete(Guid guid)
        {
            var book = this.storage[guid];

            if(this.storage.ContainsKey(book.Guid.Value)) {
                await Task.Run(() => this.storage.Remove(guid));
                
                return book;
            } else {
                return null;
            }            
        }

        public async Task<Book[]> SaveMany(Book[] books)
        {
            var result = new List<Book>();
            
            foreach (var book in books)
            {
                var temp = await this.Save(book);
                
                if (temp != null) {
                    result.Add(book);
                }
            }

            return result.ToArray();
        }

        public async Task<Book[]> UpdateMany(Book[] books)
        {
            var result = new List<Book>();
            
            foreach (var book in books)
            {
                await this.Update(book);
                 
                result.Add(book);
            }

            return result.ToArray();
        }

        public async Task<Book[]> DeleteMany(Book[] books)
        {
            var result = new List<Book>();
            
            foreach (var book in books)
            {
                var temp = await this.Delete(book.Guid.Value);
                
                if (temp != null) {
                    result.Add(book);
                }
            }

            return result.ToArray();
        }

        public Task<Book[]> GetChangedAfter(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Task<Book[]> GetDeletedAfter(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Task<Book[]> SaveOrUpdateMany(Book[] books)
        {
            throw new NotImplementedException();
        }
    }
}