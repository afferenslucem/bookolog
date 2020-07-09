using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

                var result = await this.bookService.SaveForUser(book, user);

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

                var tasks = books.Select(async (item) => await this.bookService.SaveForUser(item, user));

                var result = await Task.WhenAll(tasks);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        public ActionResult Edit(int id, [FromBody] Book book)
        {
            return Ok();
        }


        [HttpDelete]
        public ActionResult Delete(int id)
        {
            return Ok();
        }
    }
}