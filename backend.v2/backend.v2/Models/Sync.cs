using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace backend.Models
{
    public class BookSyncModel
    {
        public Book[] Update { get; set; }
        public Guid[] DeleteGuids { get; set; }
    }
}