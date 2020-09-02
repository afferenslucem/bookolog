using Storage.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public DateTime? LastAction { get; set; }

        public User() {
        }

        public User(User user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.Email = user.Email;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
            this.LastAction = user.LastAction;
        }

        public User(IStorageUser user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.Email = user.Email;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
            this.LastAction = user.LastAction;
        }

        public User WithoutPrivate()
        {
            return new User()
            {
                Id = this.Id,
                Login = this.Login,
                Email = this.Email,
            };
        }
    }

    public class UserStorageAdapter : IStorageUser
    {
        public long Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public DateTime? LastAction { get; set; }

        public UserStorageAdapter(User user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.Email = user.Email;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
            this.LastAction = user.LastAction;
        }

        public UserStorageAdapter() { }
    }
}
