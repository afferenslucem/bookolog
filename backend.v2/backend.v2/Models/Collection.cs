using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.v2.Configuration.Attributes;

namespace backend.v2.Models
{
    /// <summary>
    /// Модель коллекции книг
    /// </summary>
    public class Collection: IEntity
    {
        /// <summary>
        /// Уникальный идентификатор коллекции
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(TypeName = "uuid")]
        public Guid? Guid { get; set; }

        /// <summary>
        /// Название коллекции
        /// </summary>
        [Column(TypeName = "varchar(512)")]
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Описание коллекции
        /// </summary>
        [Column(TypeName = "varchar(2048)")]
        public string Description { get; set; }

        /// <summary>
        /// Время последнего изменения коллекции
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? ModifyDate { get; set; }

        /// <summary>
        /// Время создания коллекции
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// Время удаления коллекции
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? DeleteDate { get; set; }
        
        [SwaggerIgnore]
        public long? CoverId { get; set; }
        
        [SwaggerIgnore]
        public File Cover { get; set; }     
        
        [SwaggerIgnore]
        [JsonIgnore]
        public Book[] Books {get; set;}
        
        /// <summary>
        /// Название файла обложки.
        /// </summary>
        [NotMapped]
        public string CoverName { get; set; }
        
        /// <summary>
        /// `Id` пользователя, владеющего коллекцией.
        /// </summary>
        public long UserId { get; set; }
        
        [SwaggerIgnore]
        [JsonIgnore]
        public User User { get; set; }
        
        /// <summary>
        /// Маркер того, что коллекция уделена.
        /// Всегда `true`, когда заполнена `DeleteDate` и, соответственно, всегда `false`, когда ее нет.
        /// </summary>
        public bool Deleted {
            get {
                return this.DeleteDate != null;
            }
        }
    }
}