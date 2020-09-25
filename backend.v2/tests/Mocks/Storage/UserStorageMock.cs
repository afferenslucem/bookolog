using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Services;
using backend.Storage;
using backend.Utils;

namespace tests.Storage
{
    public class UserStorageMock : IUserStorage
    {
        private IDictionary<long, User> storage = new Dictionary<long, User>();

        public UserStorageMock()
        {
            this.storage.Add(1, new User()
            {
                Id = 1,
                Email = "email",
                Login = "login",
                PasswordHash = new SHA256Hasher().GetSHA256Hash("masterkey", "123"),
                Salt = "123"
            });
        }

        public async Task<User> Save(User user)
        {
            await Task.Run(() => this.storage[user.Id] = user);

            return user;
        }

        public async Task<User> Update(User user)
        {
            await Task.Run(() => this.storage[user.Id] = user);

            return user;
        }

        public async Task<User> GetById(long id)
        {
            return await Task.Run(() =>
            {
                User result = null;

                return this.storage.TryGetValue(id, out result) ? result : null;
            });
        }

        public Task<User> GetByLogin(string login)
        {
            return Task.Run(() => storage
                .Select(item => item.Value)
                .Where(item => item.Login == login)
                .SingleOrDefault()
            );
        }

        public async Task<User> Delete(long id)
        {
            var book = this.storage[id];

            await Task.Run(() => this.storage.Remove(id));

            return book;
        }


        public Task<User> GetByEmail(string email)
        {
            return Task.Run(() => storage
                .Select(item => item.Value)
                .Where(item => item.Email == email)
                .SingleOrDefault()
            );
        }
    }
}