using Server.Models;
using Server.Storages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Tests.Mocks.Storages
{
    class UserStorageMock : IUserStorage
    {
        IDictionary<long, User> repository = new Dictionary<long, User>();

        public IDictionary<long, User> Repository { get { return repository; } }

        public async Task Delete(User user)
        {
            await Task.Run(() => this.repository.Remove(user.Id));
        }

        public async Task Delete(long userId)
        {
            await Task.Run(() => this.repository.Remove(userId));
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var result = await Task.Run(() => this.repository.Values);
            return result;
        }

        public async Task<User> GetById(long id)
        {
            var result = await Task.Run(() =>
            {
                User temp = null;
                var opResult = this.repository.TryGetValue(id, out temp);

                return opResult ? temp : null;
            });
            return result;
        }

        public async Task<User> GetByLogin(string login)
        {
            var result = await Task.Run(() => this.repository.Select(item => item.Value).FirstOrDefault(item => item.Login == login));
            return result;
        }

        public async Task<User> Save(User user)
        {
            var lastId = await Task.Run(() => this.repository.Keys.DefaultIfEmpty(0).Max());
            lastId++;

            this.repository[lastId] = user;

            user.Id = lastId;

            return new User(user);
        }

        public async Task Update(User user)
        {
            await Task.Run(() => this.repository[user.Id] = user);
        }

        public async Task UpdatePassword(User user)
        {
            await this.Update(user);
        }
    }
}
