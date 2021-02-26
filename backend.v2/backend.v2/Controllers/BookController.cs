using Microsoft.AspNetCore.Mvc;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.Extensions.Logging;

namespace backend.v2.Controllers
{
    [Route("[controller]")]
    public class BookController : EntityController<Book>
    {
        private readonly IBookService bookService;
        private readonly ILogger<BookController> logger;
        private readonly IUserSession session;

        public BookController(IBookService bookService, IUserSession session, ILogger<BookController> logger): base(bookService, session, logger)
        {
            this.bookService = bookService;
            this.logger = logger;
            this.session = session;
        }
    }
}