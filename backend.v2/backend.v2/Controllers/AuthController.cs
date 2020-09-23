using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.Authentication;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Authentication;
using backend.Services;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly ILogger<AuthController> logger;
        private readonly IUserSession userSession;

        public AuthController(IUserService userService, IUserSession userSession, ILogger<AuthController> logger)
        {
            this.userService = userService;
            this.userSession = userSession;
            this.logger = logger;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody]AuthenticateModel model)
        {
            try
            {
                var user = await this.CheckUser(model.Login, model.Password);

                await this.AuthenticateUser(user);

                return Ok(user);
            }
            catch (IncorrectCredentianlsException)
            {
                return Unauthorized("Incorrect login or password");
            }
            catch (Exception e)
            {
                this.logger.LogDebug(500, e, "Can't log in user");
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register([FromBody]User user)
        {
            try
            {
                var result = await this.userService.RegisterUser(user);

                var withoutPrivate = result.WithoutPrivate();

                return Ok(withoutPrivate);
            }
            catch (UserWithSameEmailAlreadyExistsException e)
            {
                this.logger.LogDebug(400, e, "User with same email already exisists", user);
                return StatusCode(400, "User with same email already exisists");
            }
            catch (UserWithSameLoginAlreadyExistsException e)
            {
                this.logger.LogDebug(400, e, "User with same login already exisists", user);
                return StatusCode(400, "User with same login already exisists");
            }
            catch (Exception e)
            {
                this.logger.LogDebug(500, e, "Can't register user", user);
                return StatusCode(500, "Can't register user");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> ChangePassword([FromBody]PasswordChangeModel changeData)
        {
            try
            {
                var id = (await this.userSession.User).Id;

                await this.userService.ChangePassword(id, changeData.OldPassword, changeData.NewPassword);

                return Ok();
            }
            catch (IncorrectCredentianlsException)
            {
                return StatusCode(403, "Incorrect old password");
            }
            catch (Exception e)
            {
                this.logger.LogDebug(500, e, "Can't change password");
                return StatusCode(500, "Can't change password");
            }
        }
        private async Task AuthenticateUser(User user)
        {

            var claims = new List<Claim>() {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Login)
            };
            
            var identity = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
        }
        public async Task<User> CheckUser(string login, string password)
        {
            return await this.userService.Authenticate(login, password);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }
    }
}
