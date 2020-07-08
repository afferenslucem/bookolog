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
        public string PasswordHash { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }

        public User() { }

        public User(User user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.PasswordHash = user.PasswordHash;
            this.Salt = user.Salt;
        }

        public User WithoutPrivate()
        {
            return new User()
            {
                Id = this.Id,
                Login = this.Login
            };
        }
    }
}
