using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.v2.Configuration.Attributes;

namespace backend.v2.Models
{
    /// <summary>
    /// Перечисление для определения статуса книги.
    /// Книга может находиться в статусах "К прочтению", "Читаю" или "Буду читать".
    /// </summary>
    public enum Status
    {
        ToRead = 0,
        InProgress = 1,
        Done = 2
    }
    
    /// <summary>
    /// Перечисление для определения типа книги.
    /// Книга может иметь тип "Бумажная", "Электронная", "Аудиокнига".
    /// </summary>
    public enum Type
    {
        Paper = 0,
        Electronic = 1,
        Audio = 2
    }

    public class Book: IEntity
    {
        /// <summary>
        /// Уникальный идентификатор книги.
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(TypeName = "uuid")]
        public Guid? Guid { get; set; }
        
        /// <summary>
        /// Название книги.
        /// </summary>
        [Column(TypeName = "varchar(512)")]
        [Required]
        public string Name { get; set; }
        
        /// <summary>
        /// Список авторов.
        /// </summary>
        [Column(TypeName = "varchar(512)[]")]
        public string[] Authors { get; set; }
        
        /// <summary>
        /// Статус книги.
        /// </summary>
        public Status? Status { get; set; }
        
        /// <summary>
        /// Список тегов книги.
        /// </summary>
        [Column(TypeName = "varchar(256)[]")]
        public string[] Tags { get; set; }
        
        /// <summary>
        /// Количество прочитаных страниц/прослушанных минут.
        /// </summary>
        public short? DoneUnits { get; set; }
        
        /// <summary>
        /// Количество страниц/минут в книге.
        /// </summary>
        public short? TotalUnits { get; set; }

        [JsonIgnore]
        [SwaggerIgnore]
        public Collection Collection {get; set;}
        
        /// <summary>
        /// Коллекция к которой принадлежит книга.
        /// </summary>
        public Guid? CollectionGuid {get; set;}

        /// <summary>
        /// Номер книги в коллекции.
        /// </summary>
        public short? CollectionOrder {get; set;}
        
        /// <summary>
        /// Название жанра.
        /// </summary>
        [Column(TypeName = "varchar(256)")]
        public string Genre { get; set; }
        
        /// <summary>
        /// Год даты начала чтения.
        /// </summary>
        public short? StartDateYear { get; set; }
        
        /// <summary>
        /// Месяц даты начала чтения.
        /// </summary>
        public short? StartDateMonth { get; set; }
        
        /// <summary>
        /// День даты начала чтения.
        /// </summary>
        public short? StartDateDay { get; set; }
        
        /// <summary>
        /// Год даты окончания чтения.
        /// </summary>
        public short? EndDateYear { get; set; }
        
        /// <summary>
        /// Месяц даты окончания чтения.
        /// </summary>
        public short? EndDateMonth { get; set; }
        
        /// <summary>
        /// День даты окончания чтения.
        /// </summary>
        public short? EndDateDay { get; set; }
        
        /// <summary>
        /// Год выпуска книги.
        /// </summary>
        public short? Year { get; set; }
        
        /// <summary>
        /// Время последнего изменения книги.
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? ModifyDate { get; set; }
        
        /// <summary>
        /// Время создания книги.
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? CreateDate { get; set; }
        
        /// <summary>
        /// Время удаления книги.
        /// </summary>
        [Column(TypeName = "timestamptz")]
        public DateTime? DeleteDate { get; set; }

        /// <summary>
        /// Способ расчета прогресса чтения.
        /// Может принимать значения "Done", "Left".
        /// Используется "Done" по умолчанию.
        /// </summary>
        [Column(TypeName = "varchar(16)")]
        public string ProgressType { get; set; }

        /// <summary>
        /// Дата начала прочтения.
        /// </summary>
        public DateTime? StartDate { 
            get {
                if (!this.StartDateYear.HasValue) return null;
                
                return new DateTime(this.StartDateYear ?? 1, this.StartDateMonth ?? 1, this.StartDateDay ?? 1);
            }
        }
        

        /// <summary>
        /// Дата окончания прочтения.
        /// </summary>
        public DateTime? EndDate { 
            get {
                if (!this.EndDateYear.HasValue) return null;
                
                return new DateTime(this.EndDateYear ?? 1, this.EndDateMonth ?? 1, this.EndDateDay ?? 1);
            }
        }
        
        /// <summary>
        /// Маркер того, что коллекция уделена.
        /// Всегда `true`, когда заполнена `DeleteDate` и, соответственно, всегда `false`, когда ее нет.
        /// </summary>
        public bool Deleted {
            get {
                return this.DeleteDate != null;
            }
        }
        
        
        /// <summary>
        /// Тип книги.
        /// </summary>
        public Type? Type { get; set; }
        
        /// <summary>
        /// Заметка о книге.
        /// </summary>
        public string Note { get; set; }
        
        
        /// <summary>
        /// `Id` пользователя, владеющего книгой.
        /// </summary>
        public long UserId { get; set; }
        
        [SwaggerIgnore]
        [JsonIgnore]
        public User User { get; set; }
    }
}
