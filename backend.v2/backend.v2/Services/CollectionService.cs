using backend.Models;
using backend.Storages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Exceptions.BookExceptions;

namespace backend.v2.Services
{
    public interface ICollectionService : IEntityService<Collection>
    {
    }

    public class CollectionService : EntityService<Collection>, ICollectionService
    {
        private ICollectionStorage storage;
        private IUserSession session;

        public CollectionService(IUserSession session) : base(new CollectionStorage(), session)
        {
            this.storage = new CollectionStorage();
            this.session = session;
        }

        public CollectionService(ICollectionStorage storage, IUserSession session) : base(storage, session)
        {
            this.storage = storage;
            this.session = session;
        }

        public override void CheckEntity(Collection book)
        {
        }
    }
}
