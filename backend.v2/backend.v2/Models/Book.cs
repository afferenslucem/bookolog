using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public enum Status
    {
        ToRead = 0,
        InProgress = 1,
        Done = 2
    }
    public enum Type
    {
        Paper = 0,
        Electronic = 1,
        Audio = 2
    }

    public class Book
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(TypeName = "uuid")]
        public Guid? Guid { get; set; }
        [Column(TypeName = "varchar(512)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(512)[]")]
        public string[] Authors { get; set; }
        public Status? Status { get; set; }
        [Column(TypeName = "varchar(256)[]")]
        public string[] Tags { get; set; }
        public short? DoneUnits { get; set; }
        public short? TotalUnits { get; set; }
        [Column(TypeName = "varchar(256)")]
        public string Genre { get; set; }
        public short? StartDateYear { get; set; }
        public short? StartDateMonth { get; set; }
        public short? StartDateDay { get; set; }
        public short? EndDateYear { get; set; }
        public short? EndDateMonth { get; set; }
        public short? EndDateDay { get; set; }
        public short? Year { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? ModifyDate { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? CreateDate { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? DeleteDate { get; set; }

        public DateTime? StartDate { 
            get {
                if (!this.StartDateYear.HasValue) return null;
                
                return new DateTime(this.StartDateYear ?? 1, this.StartDateMonth ?? 1, this.StartDateDay ?? 1);
            }
        }
        public DateTime? EndDate { 
            get {
                if (!this.EndDateYear.HasValue) return null;
                
                return new DateTime(this.EndDateYear ?? 1, this.EndDateMonth ?? 1, this.EndDateDay ?? 1);
            }
        }
        public bool Deleted {
            get {
                return this.DeleteDate != null;
            }
        }
        public Type? Type { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }

        public ShortBook ToShortBook() {
            return new ShortBook() {
                Guid = this.Guid,
                Name = this.Name,
                Authors = this.Authors,
                Status = this.Status,
                EndDateDay = this.EndDateDay,
                EndDateMonth = this.EndDateMonth,
                EndDateYear = this.EndDateYear,
                CreateDate = this.CreateDate,
                ModifyDate = this.ModifyDate,
                Note = this.Note,
            };
        }
    }
}
