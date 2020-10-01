using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Synched<TModel>
    {
        public TModel[] Update {get; set;}
        public TModel[] Delete {get; set;}
    }
}