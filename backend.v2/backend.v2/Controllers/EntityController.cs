using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using backend.v2.Exceptions;
using backend.v2.Models;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;

namespace backend.v2.Controllers
{
    
    [Authorize]
    public class EntityController<T> : Controller where T: class, IEntity
    {
        private readonly IEntityService<T> entityService;
        private readonly ILogger<EntityController<T>> logger;
        private readonly IUserSession session;

        public EntityController(IEntityService<T> entityService, IUserSession session, ILogger<EntityController<T>> logger)
        {
            this.entityService = entityService;
            this.logger = logger;
            this.session = session;
        }

        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Create([FromBody]T model) {
            try
            {
                this.logger.LogDebug("Create entity");
                var book = await this.entityService.Save(model);

                return Created(HttpContext.Request.Path, book);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, model);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex, model);

                return StatusCode(500);
            }
        }
        
        [HttpPut]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Update([FromBody]T model) {
            try
            {
                this.logger.LogDebug("Update entity");
                var book = await this.entityService.Update(model);

                return Ok(book);
            }
            catch (EntityAccessDeniedException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, model);

                return StatusCode(403, ex.Message);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, model);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex, model);

                return StatusCode(500);
            }
        }
    
        [HttpDelete]
        [Route("[action]/{guid:guid}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Delete(Guid guid) {
            try
            {
                this.logger.LogDebug("Delete entity");
                
                var entity = await this.entityService.Delete(guid);

                return Ok(entity);
            }
            catch (EntityAccessDeniedException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, guid);

                return StatusCode(403, ex.Message);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, guid);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex, guid);

                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("[action]/{guid:guid}")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Get(Guid guid) {
            try
            {
                this.logger.LogDebug("Get entity");
                var book = await this.entityService.GetByGuid(guid);

                return Ok(book);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex, guid);

                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("User/{userId:long}")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Get(long userId) {
            try
            {
                this.logger.LogDebug($"Get all entities for user {userId}");

                var books = await this.entityService.GetByUserId(userId);

                this.session.UpdateLastSyncTime();

                return Ok(books);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, userId);

                return StatusCode(500);
            }
        }
    
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Synchronize([FromBody]SyncData<T> data) {
            try
            {
                this.logger.LogDebug("Sync entities");
                
                data.Update = data.Update ?? new T[] {};
                data.Delete = data.Delete ?? new Guid[] {};

                var answer = await this.entityService.Synch(data);

                this.session.UpdateLastSyncTime();

                return Ok(answer);
            }
            catch (EntityAccessDeniedException ex)
            {
                this.logger.LogError((int)ex.Code, ex.Message, ex, data);

                return StatusCode(403, ex.Message);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex, ex.Message, data);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, data);

                return StatusCode(500);
            }
        }
    }
}