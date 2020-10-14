using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace backend.Models
{
    public class UserSnapshot
    {
        public User User {get; set;}
        public IEnumerable<ShortBook> Books { get; set; }
    }
}