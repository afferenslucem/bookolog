using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Collection: IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(TypeName = "uuid")]
        public Guid? Guid { get; set; }

        [Column(TypeName = "varchar(512)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(2048)")]
        public string Description { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? ModifyDate { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? CreateDate { get; set; }

        [Column(TypeName = "timestamptz")]
        public DateTime? DeleteDate { get; set; }
        
        public long? CoverId { get; set; }
        public File Cover { get; set; }     

        public Book[] Books {get; set;}
        
        [NotMapped]
        public string CoverName { get; set; }
        public long UserId { get; set; }
        
        public bool Deleted {
            get {
                return this.DeleteDate != null;
            }
        }
    }
}