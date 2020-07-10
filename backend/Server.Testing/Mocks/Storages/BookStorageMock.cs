using Server.Models;
using Server.Storages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Tests.Mocks.Storages
{
    class BookStorageMock : IBookStorage
    {
        IDictionary<long, Book> repository = new Dictionary<long, Book>();

        public IDictionary<long, Book> Repository { get { return repository; } }

        public async Task Delete(Book book)
        {
            await Task.Run(() => this.repository.Remove(book.Id));
        }

        public async Task Delete(long bookId)
        {
            await Task.Run(() => this.repository.Remove(bookId));
        }

        public async Task<Book> GetById(long id)
        {
            var result = await Task.Run(() =>
            {
                Book temp = null;
                var opResult = this.repository.TryGetValue(id, out temp);

                return opResult ? temp : null;
            });
            return result;
        }

        public async Task<IEnumerable<Book>> GetByUserId(long userId)
        {
            return await Task.Run(() => this.repository.Values.Where(item => item.UserId == userId));
        }

        public async Task<Book> Save(Book book)
        {
            var lastId = await Task.Run(() => this.repository.Keys.DefaultIfEmpty(0).Max());

            var value = lastId + 1;

            this.repository[value] = book;

            book.Id = value;

            return new Book(book);
        }

        public async Task Update(Book book)
        {
            await Task.Run(() => {
                var temp = this.repository[book.Id];

                temp = book;

                this.repository[book.Id] = temp; });
        }
    }
}
