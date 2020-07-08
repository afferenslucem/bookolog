using Server.Models;
using Server.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Storages
{
    public interface IUserStorage
    {
        Task<User> GetById(int id);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetByLogin(string login);
        Task<User> Save(User user);
        Task Update(User user);
        Task Delete(User user);
        Task Delete(int userId);
        Task UpdatePassword(User user);
    }

    class UserStorage : IUserStorage
    {
        IDictionary<int, User> repository = new Dictionary<int, User>();

        public UserStorage()
        {
            var salt = "123";
            var user = new User()
            {
                Login = "admin",
                Salt = salt,
                PasswordHash = new SHA256Hasher().GetSHA256Hash("masterkey", salt)
            };

            Task.WaitAll(this.Save(user));
        }

        public async Task Delete(User user)
        {
            await Task.Run(() => this.repository.Remove(user.Id));
        }

        public async Task Delete(int userId)
        {
            await Task.Run(() => this.repository.Remove(userId));
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var result = await Task.Run(() => this.repository.Values);
            return result;
        }

        public async Task<User> GetById(int id)
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
