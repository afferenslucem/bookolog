using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        
        [NotMapped]
        public DateTime? LastSyncTime { get; set; }
        
        [Column(TypeName = "varchar(256)")]
        public string Salt { get; set; }
        public long? AvatarId { get; set; }
        public File Avatar { get; set; }     

        [NotMapped]
        public string AvatarName { get; set; }

        public User WithoutPrivate()
        {
            return new User()
            {
                Id = this.Id,
                Login = this.Login,
                Email = this.Email,
                LastSyncTime = this.LastSyncTime,
                AvatarName = this.Avatar?.Name,
            };
        }
    }
}
