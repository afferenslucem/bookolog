using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.AuthenticationExceptions;
using System;
using System.Threading.Tasks;
using backend.Exceptions;
using backend.Models;
using backend.Services;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
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
        [Authorize]
        [Route("[action]")]
        public virtual async Task<IActionResult> Create([FromBody]T model) {
            try
            {
                var book = await this.entityService.Save(model);

                return Ok(book);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex, ex.Message, model);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, model);

                return StatusCode(500);
            }
        }


        [HttpPut]
        [Authorize]
        [Route("[action]")]
        public virtual async Task<IActionResult> Update([FromBody]T model) {
            try
            {
                var book = await this.entityService.Update(model);

                return Ok(book);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex, ex.Message, model);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, model);

                return StatusCode(500);
            }
        }
    
        [HttpDelete]
        [Authorize]
        [Route("[action]/{guid:guid}")]
        public virtual async Task<IActionResult> Delete(Guid guid) {
            try
            {
                var book = await this.entityService.GetByGuid(guid);
            
                await this.entityService.Delete(guid);

                return Ok(book);
            }
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex, ex.Message, guid);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, guid);

                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("[action]/{guid:guid}")]
        public virtual async Task<IActionResult> Get(Guid guid) {
            try
            {
                var book = await this.entityService.GetByGuid(guid);

                return Ok(book);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, guid);

                return StatusCode(500);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public virtual async Task<IActionResult> CreateMany([FromBody]T[] data) {
            try
            {
                var result = await this.entityService.SaveMany(data);

                return Ok(result);
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

        [HttpPut]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> UpdateMany([FromBody]T[] data) {
            try
            {
                var result = await this.entityService.UpdateMany(data);

                return Ok(result);
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

        [HttpGet]
        [Route("User/{userId:long}")]
        public async Task<IActionResult> Get(long userId) {
            try
            {
                this.logger.LogDebug(String.Format("Get books for user {0}", userId));

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
        [Authorize]
        public async Task<IActionResult> Synchronize([FromBody]SyncData<T> data) {
            try
            {
                data.Update = data.Update ?? new T[] {};
                data.Delete = data.Delete ?? new Guid[] {};

                var answer = await this.entityService.Synch(data);

                this.session.UpdateLastSyncTime();

                return Ok(answer);
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

        [HttpDelete]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> DeleteMany([FromBody]Guid[] data) {
            try
            {
                await this.entityService.DeleteMany(data);

                return Ok();
            }
            catch (BookologException ex)
            {
                this.logger.LogError(500, ex, ex.Message, data);

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