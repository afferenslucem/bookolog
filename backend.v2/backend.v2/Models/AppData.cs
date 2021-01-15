using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class AppData
    {
        public IEnumerable<Book> Books {get; set;}
        public IEnumerable<Collection> Collections {get; set;}
    }
}