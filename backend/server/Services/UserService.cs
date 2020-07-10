using Microsoft.AspNetCore.Identity;
using Server.Exceptions.Authentication;
using Server.Exceptions.Storage;
using Server.Models;
using Server.Storages;
using Server.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string login, string password);
        Task<User> Authenticate(long id, string password);
        Task UpdatePassword(long id, string oldPassword, string newPassword);
        Task<User> CreateUser(User user);
        Task<User> GetByLogin(string login);
        Task<User> GetById(long id);
        Task<User> Save(User user);
        Task Update(User user);
        Task Delete(User user);
        Task Delete(long userId);
    }

    public class UserService : IUserService
    {
        private SHA256Hasher hasher = new SHA256Hasher();
        private IUserStorage storage;

        public UserService() : base()
        {
            this.storage = new UserStorage();
        }
        public UserService(IUserStorage storage)
        {
            this.storage = storage;
        }

        public async Task<User> Authenticate(string login, string password)
        {
            try
            {
                var user = await this.GetByLogin(login);

                if (user.PasswordHash == this.hasher.GetSHA256Hash(password, user.Salt))
                {
                    return user.WithoutPrivate();
                }
                else
                {
                    throw new IncorrectCredentianlsException();
                }
            }
            catch(StorageReadException)
            {
                throw new IncorrectCredentianlsException();
            }
        }

        public async Task<User> Authenticate(long id, string password)
        {
            var user = await this.GetById(id);

            if (user == null)
            {
                throw new IncorrectCredentianlsException();
            }

            if (user.PasswordHash == this.hasher.GetSHA256Hash(password, user.Salt))
            {
                return user.WithoutPrivate();
            }
            else
            {
                throw new IncorrectCredentianlsException();
            }
        }

        public async Task UpdatePassword(long id, string oldPassword, string newPassword)
        {
            try
            {
                await this.Authenticate(id, oldPassword);

                var salt = this.hasher.GetSalt();

                var hash = this.hasher.GetSHA256Hash(newPassword, salt);

                var user = await this.GetById(id);

                user.PasswordHash = hash;
                user.Salt = salt;

                await this.storage.UpdatePassword(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<User> CreateUser(User user)
        {
            try
            {
                var salt = this.hasher.GetSalt();

                var hash = this.hasher.GetSHA256Hash(user.Password, salt);

                user.PasswordHash = hash;
                user.Salt = salt;

                return await this.storage.Save(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<User> GetByLogin(string login)
        {
            return await this.storage.GetByLogin(login);
        }

        public async Task<User> Save(User user)
        {
            var salt = this.hasher.GetSalt();

            var hash = this.hasher.GetSHA256Hash(user.Password, salt);

            user.PasswordHash = hash;
            user.Salt = salt;

            return await this.storage.Save(user);
        }

        public async Task Update(User user)
        {
            await this.storage.Update(user);
        }

        public async Task Delete(User user)
        {
            await this.storage.Delete(user);
        }

        public async Task Delete(long userId)
        {
            await this.storage.Delete(userId);
        }

        public async Task<User> GetById(long id)
        {
            var user = await this.storage.GetById(id);

            return user;
        }
    }
}
