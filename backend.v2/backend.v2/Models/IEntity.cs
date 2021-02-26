using System;

namespace backend.v2.Models
{
    public interface IEntity: ICreatable, IDeletable, IModifyable
    {
        Guid? Guid {get; set;}
        long UserId { get; set; }
    }
}