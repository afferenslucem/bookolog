using System.Collections.Generic;

namespace backend.v2.Models
{
    public class UserSnapshot
    {
        public User User {get; set;}
        public IEnumerable<ShortBook> Books { get; set; }
    }
}