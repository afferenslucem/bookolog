using Microsoft.EntityFrameworkCore;
using backend.v2.Models;

namespace backend.v2.Storages
{
    public interface ICollectionStorage : IEntityStorage<Collection>
    {   
    }

    public class CollectionStorage : EntityStorage<Collection>, ICollectionStorage
    {
        protected override DbSet<Collection> GetEntitiesSet(BookologContext context)
        {
            return context.Collections;
        }
    }
}
