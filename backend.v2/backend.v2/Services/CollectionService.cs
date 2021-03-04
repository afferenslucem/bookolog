using backend.v2.Models;
using backend.v2.Storages;

namespace backend.v2.Services
{
    public interface ICollectionService : IEntityService<Collection>
    {
    }

    public class CollectionService : EntityService<Collection>, ICollectionService
    {
        public CollectionService(IUserSession session) : base(new CollectionStorage(), session)
        {
        }

        public CollectionService(ICollectionStorage storage, IUserSession session) : base(storage, session)
        {
        }

        public override void CheckEntity(Collection book)
        {
        }
    }
}
