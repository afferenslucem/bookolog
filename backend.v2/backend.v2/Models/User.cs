using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.v2.Configuration.Attributes;
using Newtonsoft.Json;

namespace backend.v2.Models
{
    /// <summary>
    /// Модель пользователя сервиса.
    /// </summary>
    public class User
    {        
        /// <summary>
        /// Уникальный идентификатор пользователя.
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// Псевдоним пользователя.
        /// </summary>
        [Required]
        [Column(TypeName = "varchar(128)")]
        public string Login { get; set; }
        
        /// <summary>
        /// Почта пользователя.
        /// Может использоваться для восстановления доступа к сервису.
        /// </summary>
        [Required]
        [Column(TypeName = "varchar(128)")]
        public string Email { get; set; }   

        [JsonIgnore]
        [SwaggerIgnore]
        [Column(TypeName = "varchar(256)")]
        public string PasswordHash { get; set; }

        /// <summary>
        /// Пароль пользоватея.
        /// Обязателен для заполнения только при регистрации.
        /// </summary>
        [Required]
        [NotMapped]
        public string Password { get; set; }
        
        /// <summary>
        /// Время последней синхронизации с сервисом.
        /// </summary>
        [NotMapped]
        public DateTime? LastSyncTime { get; set; }
        
        [JsonIgnore]
        [SwaggerIgnore]
        [Column(TypeName = "varchar(256)")]
        public string Salt { get; set; }
        
        [JsonIgnore]
        [SwaggerIgnore]
        public long? AvatarId { get; set; }
        
        [JsonIgnore]
        [SwaggerIgnore]
        public File Avatar { get; set; }     

        /// <summary>
        /// Название файла аватарки.
        /// </summary>
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
