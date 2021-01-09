using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace backend.Models
{
    public class SyncModel<T>
    {
        public T[] Update { get; set; }
        public Guid[] Delete { get; set; }
    }
}