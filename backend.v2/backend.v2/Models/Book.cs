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
        public Guid Id { get; set; }
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
        public string Genge { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Type? Type { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }

        public User User { get; set; }
    }
}
