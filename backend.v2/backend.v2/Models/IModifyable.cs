using System;

namespace backend.v2.Models
{
    public interface IModifyable {
        DateTime? ModifyDate { get; set; }
    }
}
