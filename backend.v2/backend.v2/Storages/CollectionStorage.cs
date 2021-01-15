using backend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storages
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
