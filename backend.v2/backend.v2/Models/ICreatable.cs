using System;

namespace backend.Models
{
    public interface ICreatable {
        DateTime? CreateDate { get; set; }
    }
}