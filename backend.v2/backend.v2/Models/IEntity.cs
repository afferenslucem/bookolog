using System;

namespace backend.Models
{
    public interface IEntity: ICreatable, IDeletable, IModifyable
    {
        Guid? Guid {get; set;}
        long UserId { get; set; }
    }
}