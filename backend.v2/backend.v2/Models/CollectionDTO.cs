using System;

namespace backend.v2.Models
{
    public class CollectionDTO
    {
        public Guid? Guid { get; set; }
        public string Name { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
