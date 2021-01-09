using System;

namespace backend.Models
{
    public interface IModifyable {
        DateTime? ModifyDate { get; set; }
    }
}
