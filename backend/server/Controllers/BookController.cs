using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class BookController : Controller
    {
        private IUserSession session;
        private IBookService bookService;

        public BookController(IUserSession session, IBookService bookService)
        {
            this.session = session;
            this.bookService = bookService;
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<Book[]>> All()
        {
            try
            {
                var user = await session.GetUser();

                var books = await this.bookService.GetByUserId(user.Id);

                return Ok(books);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<Book>> Create([FromBody] Book book)
        {
            try
            {
                var user = await session.GetUser();

                book.UserId = user.Id;

                var result = await this.bookService.Save(book);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<Book>> CreateMany([FromBody] Book[] books)
        {
            try
            {
                var user = await session.GetUser();

                var tasks = books.Select(async (item) => {
                    item.UserId = user.Id;
                    return await this.bookService.Save(item);
                });

                var result = await Task.WhenAll(tasks);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        [Route("[action]/{guid}")]
        public async Task<ActionResult<Book>> Edit(string guid, [FromBody] Book book)
        {
            try
            {
                var user = await session.GetUser();
                var oldState = await bookService.GetByGuid(guid);

                if(user.Id != oldState.UserId)
                {
                    return new StatusCodeResult(403);
                }

                book.UserId = user.Id;
                book.Guid = guid;

                await bookService.Update(book);

                return Ok(book);
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [HttpDelete]
        [Route("[action]/{guid}")]
        public async Task<ActionResult> Delete(string guid)
        {
            try
            {
                var user = await session.GetUser();
                var oldState = await bookService.GetByGuid(guid);

                if (user.Id != oldState.UserId)
                {
                    return new StatusCodeResult(403);
                }

                await bookService.Delete(oldState);

                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}