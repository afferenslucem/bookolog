using System;

namespace backend.Models
{
    public interface IDeletable {
        bool Deleted { get; }

        DateTime? DeleteDate {get; set;}
    }
}