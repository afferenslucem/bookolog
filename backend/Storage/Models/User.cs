using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Models
{
    public interface IStorageUser
    {
        long Id { get; set; }
        string Login { get; set; }
        string PasswordHash { get; set; }
        string Salt { get; set; }
    }

    public class User : IStorageUser
    {
        public long Id { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }

        public User() { }

        public User(IStorageUser user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
        }
    }
}
