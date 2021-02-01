using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.AuthenticationExceptions;
using System;
using System.Threading.Tasks;
using backend.Exceptions;
using backend.Models;
using backend.v2.Services;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
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