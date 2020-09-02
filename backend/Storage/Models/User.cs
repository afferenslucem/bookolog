using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Models
{
    public interface IStorageUser
    {
        long Id { get; set; }
        string Login { get; set; }
        string Email { get; set; }
        string PasswordHash { get; set; }
        string Salt { get; set; }
        DateTime? LastAction { get; set; }
    }

    class User : IStorageUser
    {
        public long Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public DateTime? LastAction { get; set; }

        public User() { }

        public User(IStorageUser user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.Email = user.Email;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
            this.LastAction = user.LastAction;
        }
    }
}
