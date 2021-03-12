using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
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
        
        /// <summary>
        /// Создает новую коллекцию.
        /// </summary>
        /// <param name="collection"></param>
        /// <response code="201">Возвращает новую коллекцию.</response>
        /// <response code="400">Проблема при валидации или сохранении коллекции.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Book), StatusCodes.Status201Created)]
        public override async Task<IActionResult> Create([FromBody]Collection collection)
        {
            return await base.Create(collection);
        }
        
        /// <summary>
        /// Обновляет коллекцию.
        /// </summary>
        /// <param name="collection"></param>
        /// <response code="200">Возвращает обновленную коллекцию.</response>
        /// <response code="400">Проблема при валидации или обновлении коллекции.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Collection), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Update([FromBody]Collection collection)
        {
            return await base.Update(collection);
        }
        
        /// <summary>
        /// Удаляет коллекцию.
        /// </summary>
        /// <param name="guid">Идентификатор коллекции</param>
        /// <response code="200">Возвращает удаленную коллекцию.</response>
        /// <response code="400">Проблема при удалении коллекции.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Collection), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Delete(Guid guid)
        {
            return await base.Delete(guid);
        }
        
        /// <summary>
        /// Возвращает коллекцию с указанным идентификатором.
        /// </summary>
        /// <param name="guid">Идентификатор коллекции</param>
        /// <response code="200">Возвращает указанную коллекцию.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Collection), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Get(Guid guid)
        {
            return await base.Get(guid);
        }
        
        /// <summary>
        /// Возвращает все коллекции для указанного пользователя.
        /// </summary>
        /// <param name="userId">Идентификатор пользователя.</param>
        /// <response code="200">Возвращает коллекции.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(IEnumerable<Collection>), StatusCodes.Status200OK)]
        public override Task<IActionResult> Get(long userId)
        {
            return base.Get(userId);
        }

        /// <summary>
        /// Возвращает разницу в сохраненных коллекциях со времени последней синхронзации.
        /// </summary>
        /// <param name="userId">Идентификатор пользователя.</param>
        /// <response code="200">Возвращает коллекции для синхронизации.</response>
        /// <response code="400">Проблема при валидации или сохранении коллекции.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(SyncData<Collection>), StatusCodes.Status200OK)]
        public override Task<IActionResult> Synchronize([FromBody]SyncData<Collection> data)
        {
            return base.Synchronize(data);
        }
    }
}