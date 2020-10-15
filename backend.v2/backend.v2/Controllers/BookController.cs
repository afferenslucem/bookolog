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
    [Route("[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService bookService;
        private readonly ILogger<BookController> logger;
        private readonly IUserSession session;

        public BookController(IBookService bookService, IUserSession session, ILogger<BookController> logger)
        {
            this.bookService = bookService;
            this.logger = logger;
            this.session = session;
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> Create([FromBody]Book model) {
            try
            {
                this.logger.LogDebug(String.Format("Create book {0}", model.Name));

                var book = await this.bookService.Save(model);

                this.logger.LogDebug(String.Format("Created book"));

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
        public async Task<IActionResult> Update([FromBody]Book model) {
            try
            {
                this.logger.LogDebug(String.Format("Update book {0}", model));

                var book = await this.bookService.Update(model);

                this.logger.LogDebug("Updated book");

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
        public async Task<IActionResult> Delete(Guid guid) {
            try
            {
                this.logger.LogDebug(String.Format("Delete book {0}", guid));

                var book = await this.bookService.GetByGuid(guid);
            
                await this.bookService.Delete(guid);

                this.logger.LogDebug(String.Format("Deleted book {0}", guid));

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
        public async Task<IActionResult> Get(Guid guid) {
            try
            {
                this.logger.LogDebug(String.Format("Get book {0}", guid));

                var book = await this.bookService.GetByGuid(guid);
                
                this.logger.LogDebug(String.Format("Geted book {0}", guid));

                return Ok(book);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, guid);

                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("User/{userId:long}")]
        public async Task<IActionResult> Get(long userId) {
            try
            {
                this.logger.LogDebug(String.Format("Get books for user {0}", userId));

                var books = await this.bookService.GetByUserId(userId);

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
        public async Task<IActionResult> Synchronize([FromBody]BookSyncModel data) {
            try
            {
                data.Update = data.Update ?? new Book[] {};
                data.DeleteGuids = data.DeleteGuids ?? new Guid[] {};

                var answer = await this.bookService.Synch(data);

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

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> CreateMany([FromBody]Book[] data) {
            try
            {
                var result = await this.bookService.SaveMany(data);

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
        public async Task<IActionResult> UpdateMany([FromBody]Book[] data) {
            try
            {
                var result = await this.bookService.UpdateMany(data);

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

        [HttpDelete]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> DeleteMany([FromBody]Guid[] data) {
            try
            {
                var result = await this.bookService.DeleteMany(data);

                return Ok(result);
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