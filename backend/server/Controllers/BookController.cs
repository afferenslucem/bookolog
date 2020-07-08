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
    public class BookController : Controller
    {
        private IUserSession session;
        private IBookService bookService;

        public BookController(IUserSession session, IBookService bookService)
        {
            this.session = session;
            this.bookService = bookService;
        }

        // GET: Book/Details/5
        public ActionResult All()
        {
            return Ok();
        }

        // GET: Book/Create
        public ActionResult Create([FromBody] Book book)
        {
            return Ok();
        }

        // GET: Book/Edit/5
        public ActionResult Edit(int id, [FromBody] Book book)
        {
            return Ok();
        }

        // GET: Book/Delete/5
        public ActionResult Delete(int id)
        {
            return Ok();
        }
    }
}