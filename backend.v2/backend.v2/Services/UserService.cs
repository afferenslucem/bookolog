﻿using System;
using System.Threading.Tasks;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Exceptions.StorageExceptions;
using backend.v2.Models;
using backend.v2.Storages;
using backend.v2.Utils;

namespace backend.v2.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string login, string password);
        Task<User> Authenticate(long id, string password);
        Task<User> GetByLogin(string login);
        Task<User> GetByEmail(string email);
        Task<User> GetById(long id);
        Task<User> Update(User user);
        Task<User> RegisterUser(User user);
        Task ChangePassword(long id, string oldPassword, string newPassword);
        Task SetNewPassword(long id, string newPassword);
    }

    public class UserService : IUserService
    {
        private SHA256Hasher hasher = new SHA256Hasher();
        private IUserStorage storage;

        public UserService() : base()
        {
            this.storage = new UserStorage();
        }
        public UserService(IUserStorage storage) : base()
        {
            this.storage = storage;
        }

        public async Task<User> Authenticate(string login, string password)
        {
            try
            {
                var user = await this.GetByLogin(login);

                if (this.CheckHash(user, password))
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

        public virtual bool CheckHash(User user, string password) {
            return user.PasswordHash == this.hasher.GetSHA256Hash(password, user.Salt);
        }

        public virtual async Task<User> Authenticate(long id, string password)
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

        public async Task ChangePassword(long id, string oldPassword, string newPassword)
        {
            await this.Authenticate(id, oldPassword);

            await this.SetNewPassword(id, newPassword);
        }

        public virtual async Task SetNewPassword(long id, string newPassword) {
            var salt = this.hasher.GetSalt();
            var hash = this.hasher.GetSHA256Hash(newPassword, salt);

            var user = await this.GetById(id);

            user.PasswordHash = hash;
            user.Salt = salt;

            await this.storage.Update(user);
        }

        public async Task<User> Update(User user) {
            return await this.storage.Update(user);
        }

        public async Task<User> RegisterUser(User user)
        {
            user = this.PrepareForSave(user);
            
            await this.CheckLoginExisting(user.Login);
            await this.CheckEmailExisting(user.Email);
        
            try
            {
                
                var salt = this.hasher.GetSalt();
                var hash = this.hasher.GetSHA256Hash(user.Password, salt);

                user.PasswordHash = hash;
                user.Salt = salt;

                return await this.storage.Save(user);            
            }
            catch (Exception e) {
                var exception = this.ParseRegistrationException(e);

                if(exception != null){
                    throw exception;
                }
                else {
                    throw;
                }
            }
        }

        public User PrepareForSave(User user)
        {
            user.Email = user.Email.Trim();
            user.Login = user.Login.Trim();

            return user;
        }

        public virtual async Task CheckLoginExisting(string login)
        {
            var user = await this.storage.GetByLogin(login);

            if (user != null)
            {
                throw new RegistrationException("User with same login already exisits");
            }
        }

        public virtual async Task CheckEmailExisting(string email)
        {
            var user = await this.storage.GetByEmail(email);

            if (user != null)
            {
                throw new RegistrationException("User with same email already exisits");
            }
        }

        public Exception ParseRegistrationException(Exception e) {
            if(e.InnerException == null) return null;

            var message = e.InnerException.Message;

            if(message.Contains("Login") && message.Contains("unique")) {
                return new RegistrationException("User with same login already exisits");
            } else  if(message.Contains("Email") && message.Contains("unique")) {
                return new RegistrationException("User with same email already exisits");
            } else {
                return null;
            }
        }

        public virtual async Task<User> GetByLogin(string login)
        {
            var result = await this.storage.GetByLogin(login);

            if(result == null) {
                throw new StorageReadException();
            }

            return result;
        }

        public async Task<User> GetByEmail(string email)
        {
            var result = await this.storage.GetByEmail(email);

            if(result == null) {
                throw new StorageReadException();
            }

            return result;
        }

        public virtual async Task<User> GetById(long id)
        {
            var user = await this.storage.GetById(id);

            return user;
        }
    }
}
