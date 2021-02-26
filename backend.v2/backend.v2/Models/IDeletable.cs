using System;

namespace backend.v2.Models
{
    public interface IDeletable {
        bool Deleted { get; }

        DateTime? DeleteDate {get; set;}
    }
}