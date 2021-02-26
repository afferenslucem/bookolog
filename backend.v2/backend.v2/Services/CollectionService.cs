using backend.v2.Models;
using backend.v2.Storages;

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
