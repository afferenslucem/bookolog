using Microsoft.AspNetCore.Identity;
using backend.Exceptions.Authentication;
using backend.Exceptions.Storage;
using backend.Models;
using backend.Storage;
using backend.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string login, string password);
        Task<User> Authenticate(long id, string password);
        Task<User> GetByLogin(string login);
        Task<User> GetById(long id);
    }

    public class UserService : IUserService
    {
        private SHA256Hasher hasher = new SHA256Hasher();
        private UserStorage storage = new UserStorage();

        public UserService() : base()
        {
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

                await this.storage.Update(user);
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

        public async Task<User> GetById(long id)
        {
            var user = await this.storage.GetById(id);

            return user;
        }
    }
}
