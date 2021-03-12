using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using backend.v2.Exceptions;
using backend.v2.Models;
using backend.v2.Authentication.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;

namespace backend.v2.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IBookService bookService;
        private readonly ICollectionService collectionService;
        private readonly IFileService fileService;
        private readonly ILogger<UserController> logger;
        private readonly IUserSession userSession;

        public UserController
        (
            IUserService userService,
            IUserSession userSession,
            IBookService bookService,
            ICollectionService collectionService,
            IFileService fileService,
            ILogger<UserController> logger
        )
        {
            this.userService = userService;
            this.collectionService = collectionService;
            this.bookService = bookService;
            this.fileService = fileService;
            this.userSession = userSession;
            this.logger = logger;
        }

        /// <summary>
        /// Изменяет почту авторизованного пользователя.
        /// </summary>
        /// <param name="newMail">Новая почта.</param>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [HttpGet]
        [Route("[action]/{newMail:maxlength(128)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ChangeEmail(string newMail)
        {
            try
            {
                this.logger.LogDebug($"Change email {newMail}");

                var emailRegExp = new Regex(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

                if (emailRegExp.IsMatch(newMail))
                {
                    var user = this.userSession.User;

                    user.Email = newMail;

                    this.logger.LogDebug($"Change valid email {newMail} {user.Login}");

                    var result = await this.userService.Update(user);

                    return Ok(result.WithoutPrivate());
                }
                else
                {
                    return BadRequest("Incorrect email");
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex);
                return StatusCode(500, "Can't change email");
            }
        }
        
        /// <summary>
        /// Возвращает данные авторизованного пользователя.
        /// </summary>
        /// <response code="200">Объект пользователя.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [HttpGet]
        [Route("[action]")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Me()
        {
            try {
                this.logger.LogDebug("Get me");
                var user = this.userSession.User;
                this.logger.LogDebug($"Fount user {user.Login}");

                return Ok(user.WithoutPrivate());
            }
            catch(Exception ex) {
                this.logger.LogError(500, ex.Message, ex);
                return StatusCode(500);
            }
        }
        
        /// <summary>
        /// Устанавливает загруженное изображение как аватар пользователя.
        /// </summary>
        /// <response code="200">Название нового аватара.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadAvatar()
        {
            try
            {
                var user = this.userSession.User;

                var file = Request.Form.Files.FirstOrDefault();

                var avatar = await this.fileService.Save(file);

                var oldAvatarId = user.AvatarId;

                user.Avatar = avatar;
                await this.userService.Update(user);

                if (oldAvatarId.HasValue)
                {
                    await this.fileService.Delete(oldAvatarId.Value);
                }

                return Ok(user.Avatar.Name);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex.Message, ex);
                return BadRequest();
            }
        }
    
        /// <summary>
        /// Синхронизирует данные пользователя.
        /// </summary>
        /// <response code="200">Изменение в данных с момента последней синхронизации.</response>
        /// <response code="400">Проблема при валидации или сохранении сущности.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(typeof(AppSyncData), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Synchronize([FromBody]AppSyncData data) {
            try
            {
                this.logger.LogDebug("Started sync");

                var collectionSync = await this.collectionService.Synch(data.Collections ?? new SyncData<Collection>());
                var bookSync = await this.bookService.Synch(data.Books ?? new SyncData<Book>());

                this.userSession.UpdateLastSyncTime();

                this.logger.LogDebug("Synced");

                return Ok(new AppSyncData {
                    Books = bookSync,
                    Collections = collectionSync,
                });
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
        
    
        /// <summary>
        /// Вовращает все данные пользоввателя.
        /// </summary>
        /// <response code="200">Все данные пользоввателя.</response>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        [HttpGet]
        [Route("[action]")]
        [ProducesResponseType(typeof(AppData), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LoadAll() {
            try
            {
                var user = this.userSession.User;

                var collectionLoad = this.collectionService.GetByUserId(user.Id);
                var bookLoad = this.bookService.GetByUserId(user.Id);

                await Task.WhenAll(bookLoad, collectionLoad);

                this.userSession.UpdateLastSyncTime();

                return Ok(new AppData {
                    Books = bookLoad.Result,
                    Collections = collectionLoad.Result,
                });
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message);

                return StatusCode(500);
            }
        }
    }
}
