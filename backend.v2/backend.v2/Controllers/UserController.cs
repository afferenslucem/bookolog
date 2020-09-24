using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.Authentication;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Models;
using backend.Utils;
using backend.Models.Authentication;
using backend.Services;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly ILogger<AuthController> logger;
        private readonly IUserSession userSession;

        public UserController(IUserService userService, IUserSession userSession, ILogger<AuthController> logger)
        {
            this.userService = userService;
            this.userSession = userSession;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize]
        [Route("[action]/{newMail}")]
        public async Task<IActionResult> ChangePassword(string newMail)
        {
            try
            {
                var emailRegExp = new Regex(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

                if(emailRegExp.IsMatch(newMail)) {
                    var user = await this.userSession.User;

                    user.Email = newMail;

                    var result = await this.userService.Update(user);

                    return Ok(result.WithoutPrivate());
                } else {
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
    }
}
