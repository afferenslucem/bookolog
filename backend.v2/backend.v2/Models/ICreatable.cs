using System;

namespace backend.v2.Models
{
    public interface ICreatable {
        DateTime? CreateDate { get; set; }
    }
}