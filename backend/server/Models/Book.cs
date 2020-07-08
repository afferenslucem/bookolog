using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public enum Status
    {
        ToRead = 0,
        InProgress = 1,
        Done = 2
    }

    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public Status Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? PagesRead { get; set; }
        public int? TotalPages { get; set; }
    }
}
