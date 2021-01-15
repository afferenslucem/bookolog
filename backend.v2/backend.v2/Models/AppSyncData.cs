using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class AppSyncData
    {
        public SyncData<Book> Books {get; set;}
        public SyncData<Collection> Collections {get; set;}
    }
}