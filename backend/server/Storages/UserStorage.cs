using Server.Exceptions.Storage;
using Server.Models;
using Server.Utils;
using Storage.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Storages
{
    public interface IUserStorage
    {
        Task<User> GetById(long id);
        Task<User> GetByLogin(string login);
        Task<User> Save(User user);
        Task Update(User user);
        Task Delete(User user);
        Task Delete(long userId);
        Task UpdatePassword(User user);
    }

    class UserStorage : IUserStorage
    {
        IUserRepository repository = UserRepository.GetRepository(Config.ConnectionString);

        public UserStorage()
        {
        }

        public async Task Delete(User user)
        {
            await this.repository.Delete(user.Id);
        }

        public async Task Delete(long userId)
        {
            await this.repository.Delete(userId);
        }

        public async Task<User> GetById(long id)
        {
            var storage = await this.repository.GetById(id);

            var result = new User(storage);

            return result;
        }

        public async Task<User> GetByLogin(string login)
        {
            var storage = await this.repository.GetByLogin(login);

            if(storage == null)
            {
                throw new StorageReadException();
            }

            var result = new User(storage);

            return result;
        }

        public async Task<User> Save(User user)
        {
            var storage = await this.repository.Save(new UserStorageAdapter(user));

            var result = new User(storage);

            return result;
        }

        public async Task Update(User user)
        {
            await this.repository.Update(new UserStorageAdapter(user));
        }

        public async Task UpdatePassword(User user)
        {
            await this.repository.UpdatePassword(new UserStorageAdapter(user));
        }
    }
}
