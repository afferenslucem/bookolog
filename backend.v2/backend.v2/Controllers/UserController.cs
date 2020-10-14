using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.Extensions.Logging;
using backend.Models;
using System.IO;
using Microsoft.AspNetCore.Http;
using backend.Exceptions.StorageExceptions;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IBookService bookService;
        private readonly IFileService fileService;
        private readonly ILogger<AuthController> logger;
        private readonly IUserSession userSession;

        public UserController(IUserService userService, IUserSession userSession, IBookService bookService, IFileService fileService, ILogger<AuthController> logger)
        {
            this.userService = userService;
            this.bookService = bookService;
            this.fileService = fileService;
            this.userSession = userSession;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize]
        [Route("[action]/{newMail}")]
        public async Task<IActionResult> ChangeEmail(string newMail)
        {
            try
            {
                var emailRegExp = new Regex(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

                if (emailRegExp.IsMatch(newMail))
                {
                    var user = await this.userSession.User;

                    user.Email = newMail;

                    var result = await this.userService.Update(user);

                    return Ok(result.WithoutPrivate());
                }
                else
                {
                    return BadRequest("Incorrect email");
                }
            }
            catch (Exception e)
            {
                this.logger.LogDebug(500, e, "Can't change email");
                return StatusCode(500, "Can't change email");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> Me()
        {
            var user = await this.userSession.User;

            return Ok(user.WithoutPrivate());
        }

        [HttpGet]
        [Route("{login}")]
        public async Task<IActionResult> Snapshot(string login)
        {
            try
            {
                var user = await this.userService.GetByLogin(login);
                var books = await this.bookService.GetByUserId(user.Id);

                var result = new UserSnapshot
                {
                    Books = books.Where(item => item.Status == Status.Done).Select(item => item.ToShortBook()),
                    User = user.WithoutPrivate()
                };

                return Ok(result);
            }
            catch (StorageReadException ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> UploadAvatar()
        {
            try
            {
                var user = await this.userSession.User;

                var file = Request.Form.Files.First();

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
                return BadRequest();
            }
        }
    }
}
