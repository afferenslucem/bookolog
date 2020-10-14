using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class File
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }
}
