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

namespace backend.v2.Controllers
{
    [Authorize(AuthenticationSchemes = JWTDefaults.AuthenticationScheme)]
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

        [HttpGet]
        [Route("[action]/{newMail:maxlength(128)}")]
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

        [HttpGet]
        [Route("[action]")]
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

        [HttpPost]
        [Route("[action]")]
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
    
        [HttpPost]
        [Route("[action]")]
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
        
        [HttpGet]
        [Route("[action]")]
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
            catch (BookologException ex)
            {
                this.logger.LogError((int)ex.Code, ex, ex.Message);

                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message);

                return StatusCode(500);
            }
        }
    }
}
