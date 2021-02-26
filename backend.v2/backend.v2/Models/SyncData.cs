using System;

namespace backend.v2.Models
{
    public class SyncData<T>
    {
        public T[] Update { get; set; }
        public Guid[] Delete { get; set; }
    }
}