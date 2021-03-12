using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.v2.Exceptions;
using Microsoft.AspNetCore.Mvc;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace backend.v2.Controllers
{
    [Route("[controller]")]
    public class BookController : EntityController<Book>
    {
        public BookController(IBookService bookService, IUserSession session, ILogger<BookController> logger): base(bookService, session, logger)
        {
        }
        
        /// <summary>
        /// Создает новую книгу.
        /// </summary>
        /// <param name="book"></param>
        /// <response code="201">Возвращает новую книгу.</response>
        /// <response code="400">Проблема при валидации или сохранении книги.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Book), StatusCodes.Status201Created)]
        public override async Task<IActionResult> Create([FromBody]Book book)
        {
            return await base.Create(book);
        }
        
        /// <summary>
        /// Обновляет книгу.
        /// </summary>
        /// <param name="book"></param>
        /// <response code="200">Возвращает обновленную книгу.</response>
        /// <response code="400">Проблема при валидации или обновлении книги.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Update([FromBody]Book book)
        {
            return await base.Update(book);
        }
        
        /// <summary>
        /// Удаляет книгу.
        /// </summary>
        /// <param name="guid">Идентификатор книги</param>
        /// <response code="200">Возвращает удаленную книгу.</response>
        /// <response code="400">Проблема при удалении книги.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Delete(Guid guid)
        {
            return await base.Delete(guid);
        }
        
        /// <summary>
        /// Возвращает книгу с указанным идентификатором.
        /// </summary>
        /// <param name="guid">Идентификатор книги</param>
        /// <response code="200">Возвращает указанную книгу.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
        public override async Task<IActionResult> Get(Guid guid)
        {
            return await base.Get(guid);
        }
        
        /// <summary>
        /// Возвращает все книги для указанного пользователя.
        /// </summary>
        /// <param name="userId">Идентификатор пользователя.</param>
        /// <response code="200">Возвращает книги.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(IEnumerable<Book>), StatusCodes.Status200OK)]
        public override Task<IActionResult> Get(long userId)
        {
            return base.Get(userId);
        }

        /// <summary>
        /// Возвращает разницу в сохраненных книгах со времени последней синхронзации.
        /// </summary>
        /// <param name="userId">Идентификатор пользователя.</param>
        /// <response code="200">Возвращает книги для синхронизации.</response>
        /// <response code="400">Проблема при валидации или сохранении книги.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [ProducesResponseType(typeof(SyncData<Book>), StatusCodes.Status200OK)]
        public override Task<IActionResult> Synchronize([FromBody]SyncData<Book> data)
        {
            return base.Synchronize(data);
        }
    }
}