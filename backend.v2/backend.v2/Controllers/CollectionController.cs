using Microsoft.AspNetCore.Mvc;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.Extensions.Logging;

namespace backend.v2.Controllers
{
    [Route("[controller]")]
    public class CollectionController : EntityController<Collection>
    {
        private readonly ILogger<CollectionController> logger;
        private readonly IUserSession session;

        public CollectionController(ICollectionService service, IUserSession session, ILogger<CollectionController> logger) : base(service, session, logger)
        {
            this.logger = logger;
            this.session = session;
        }
    }
}