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
        IDictionary<string, Book> repository = new Dictionary<string, Book>();

        public IDictionary<string, Book> Repository { get { return repository; } }

        public async Task Delete(Book book)
        {
            await Task.Run(() => this.repository.Remove(book.Guid));
        }

        public async Task Delete(string bookId)
        {
            await Task.Run(() => this.repository.Remove(bookId));
        }

        public async Task<Book> GetByGuid(string id)
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
            var value = Guid.NewGuid().ToString();

            this.repository[value] = book;

            book.Guid = value;

            return new Book(book);
        }

        public async Task Update(Book book)
        {
            await Task.Run(() => {
                var temp = this.repository[book.Guid];

                temp = book;

                this.repository[book.Guid] = temp; });
        }
    }
}
