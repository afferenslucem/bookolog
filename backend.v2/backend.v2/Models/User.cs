using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class User
    {
        public long Id { get; set; }
        [Column(TypeName = "varchar(128)")]
        public string Login { get; set; }
        [Column(TypeName = "varchar(128)")]
        public string Email { get; set; }
        [Column(TypeName = "varchar(256)")]
        public string PasswordHash { get; set; }
        [NotMapped]
        public string Password { get; set; }
        public string Salt { get; set; }
        public DateTime? LastAction { get; set; }

        public User WithoutPrivate()
        {
            return new User()
            {
                Id = this.Id,
                Login = this.Login,
                Email = this.Email,
                LastAction = this.LastAction
            };
        }
    }
}
