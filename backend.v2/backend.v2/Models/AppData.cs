using System.Collections.Generic;

namespace backend.v2.Models
{
    public class AppData
    {
        public IEnumerable<Book> Books {get; set;}
        public IEnumerable<Collection> Collections {get; set;}
    }
}