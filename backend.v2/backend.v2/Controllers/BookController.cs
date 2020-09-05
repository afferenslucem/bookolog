using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.Authentication;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Exceptions;
using backend.Models;
using backend.Models.Authentication;
using backend.Services;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService bookService;
        private readonly ILogger<BookController> logger;

        public BookController(IBookService bookService, ILogger<BookController> logger)
        {
            this.bookService = bookService;
            this.logger = logger;
        }

        /// <summary>
        /// Creates Book item
        /// </summary>
        /// <param name="model">Book description model</param>
        /// <returns>Created book with filled guid</returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="400">Returns error description</response>
        /// <response code="500">Returns error response</response>
        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> Create([FromBody]Book model) {
            try
            {
                var book = await this.bookService.Save(model);

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

        /// <summary>
        /// Updates Book item
        /// </summary>
        /// <param name="model">Book description model</param>
        /// <returns>Created book with filled guid</returns>
        /// <response code="200">Returns the updated item</response>
        /// <response code="400">Returns error description</response>
        /// <response code="500">Returns error response</response>
        [HttpPut]
        [Authorize]
        [Route("[action]/{guid}")]
        public async Task<IActionResult> Update([FromBody]Book model) {
            try
            {
                var book = await this.bookService.Update(model);

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
    
        /// <summary>
        /// Deletes Book item
        /// </summary>
        /// <param name="guid">Book guid</param>
        /// <returns>Deleted item</returns>
        /// <response code="200">Returns the deleted item</response>
        /// <response code="400">Returns error description</response>
        /// <response code="500">Returns error response</response>
        [HttpDelete]
        [Authorize]
        [Route("[action]/{guid}")]
        public async Task<IActionResult> Delete(Guid guid) {
            try
            {
                var book = await this.bookService.GetByGuid(guid);
            
                await this.bookService.Delete(guid);

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

        /// <summary>
        /// Returns Book by guid
        /// </summary>
        /// <param name="guid">Book guid</param>
        /// <returns>Item</returns>
        /// <response code="200">Returns requested item</response>
        /// <response code="500">Returns error response</response>
        [HttpGet]
        [Route("[action]/{guid}")]
        public async Task<IActionResult> Get(Guid guid) {
            try
            {
                var book = await this.bookService.GetByGuid(guid);

                return Ok(book);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, guid);

                return StatusCode(500);
            }
        }

        /// <summary>
        /// Returns array of books by user id
        /// </summary>
        /// <param name="userId">Id of user</param>
        /// <returns>Users items</returns>
        /// <response code="200">Returns requested items</response>
        /// <response code="500">Returns error response</response>
        [HttpGet]
        [Route("User/{userId}")]
        public async Task<IActionResult> Get(long userId) {
            try
            {
                var books = await this.bookService.GetByUserId(userId);

                return Ok(books);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, userId);

                return StatusCode(500);
            }
        }
    }
}