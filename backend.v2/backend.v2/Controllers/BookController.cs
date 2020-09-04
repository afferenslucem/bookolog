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
        private readonly IUserSession userSession;
        private readonly ILogger<BookController> logger;

        public BookController(IBookService bookService, IUserSession session, ILogger<BookController> logger)
        {
            this.bookService = bookService;
            this.userSession = session;
            this.logger = logger;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<Book>> Create([FromBody]Book model) {
            var user = await this.userSession.GetUser();

            model.User = user;

            var book = this.bookService.Save(model);

            return Ok(book);
        }

        [HttpPut]
        [Route("[action]/{guid}")]
        public async Task<ActionResult<Book>> Update(Guid guid, [FromBody]Book model) {
            var user = await this.userSession.User;

            if(model.UserId != user.Id) {
                return StatusCode(403, "Access Denied");
            }

            var book = await this.bookService.Update(model);

            return Ok(book);
        }

        [HttpGet]
        [Route("[action]/{guid}")]
        public async Task<ActionResult<Book>> Get(Guid guid) {
            var book = await this.bookService.GetByGuid(guid);

            return Ok(book);
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Book>>> Get(long userId) {
            var books = await this.bookService.GetByUserId(userId);

            return Ok(books);
        }
    

        [HttpDelete]
        [Route("[action]/{guid}")]
        public async Task<ActionResult<Book>> Delete(Guid guid) {
            var user = await this.userSession.User;

            var book = await this.bookService.GetByGuid(guid);

            if(book.UserId != user.Id) {
                return StatusCode(403, "Access Denied");
            }

            await this.bookService.Delete(guid);

            return Ok(book);
        }

    }
}