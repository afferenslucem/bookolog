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
        IDictionary<long, (long, Book)> repository = new Dictionary<long, (long, Book)>();

        public IDictionary<long, (long, Book)> Repository { get { return repository; } }

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
                (long, Book) temp = (0, null);
                var opResult = this.repository.TryGetValue(id, out temp);

                return opResult ? temp.Item2 : null;
            });
            return result;
        }

        public Task<IEnumerable<Book>> GetByUserId(long userId)
        {
            throw new NotImplementedException();
        }

        public async Task<Book> SaveForUser(Book book, User user)
        {
            var lastId = await Task.Run(() => this.repository.Keys.DefaultIfEmpty(0).Max());

            var value = lastId + 1;

            this.repository[value] = (user.Id, book);

            book.Id = value;

            return new Book(book);
        }

        public async Task Update(Book book)
        {
            await Task.Run(() => {
                var temp = this.repository[book.Id];

                temp.Item2 = book;

                this.repository[book.Id] = temp; });
        }
    }
}
