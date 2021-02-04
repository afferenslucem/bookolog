using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Exceptions.AuthenticationExceptions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using backend.v2.Utils;
using backend.Models.Authentication;
using backend.v2.Services;
using Microsoft.Extensions.Logging;
using backend.v2.Authentication.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly ILogger<AuthController> logger;
        private readonly IUserSession userSession;
        private readonly IMailService mailService;

        public AuthController(IUserService userService, IUserSession userSession, IMailService mailService, ILogger<AuthController> logger)
        {
            this.userService = userService;
            this.userSession = userSession;
            this.mailService = mailService;
            this.logger = logger;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] AuthenticateModel model)
        {
            try
            {
                this.logger.LogDebug($"Log user {model.Login}");

                var user = await this.CheckUser(model.Login, model.Password);

                await this.AuthenticateUser(user);

                this.logger.LogDebug($"{model.Login} was logged in");

                return Ok(user);
            }
            catch (IncorrectCredentianlsException)
            {
                this.logger.LogInformation("Incorrect login or password", model.Login);
                return Unauthorized("Incorrect login or password");
            }
            catch (Exception e)
            {
                this.logger.LogError(500, e.Message, e, model.Login);
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                this.logger.LogDebug($"Register user {user.Login} {user.Email}");

                var result = await this.userService.RegisterUser(user);

                var withoutPrivate = result.WithoutPrivate();

                this.logger.LogDebug(String.Format($"Registered user {user.Login} {user.Email}"));

                return Ok(withoutPrivate);
            }
            catch (UserWithSameEmailAlreadyExistsException e)
            {
                this.logger.LogError(400, e.Message, user, e);
                return StatusCode(400, "User with same email already exisists");
            }
            catch (UserWithSameLoginAlreadyExistsException e)
            {
                this.logger.LogError(400, e.Message, user, e);
                return StatusCode(400, "User with same login already exisists");
            }
            catch (Exception e)
            {
                this.logger.LogError(500, e.Message, e, user);
                return StatusCode(500, "Can't register user");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordChangeModel changeData)
        {
            var user = this.userSession.User;

            try
            {
                this.logger.LogDebug(String.Format($"Password change for {user.Login}"));

                await this.userService.ChangePassword(user.Id, changeData.OldPassword, changeData.NewPassword);

                return Ok();
            }
            catch (IncorrectCredentianlsException)
            {
                this.logger.LogInformation("Incorrect old password", user.Login);

                return StatusCode(403, "Incorrect old password");
            }
            catch (Exception e)
            {
                this.logger.LogError(500, e.Message, e, changeData);
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

            await HttpContext.SignInAsync(
                JWTDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                });
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

        [HttpGet]
        [Route("[action]/{email:maxlength(128)}")]
        public async Task<IActionResult> RecoverPassword(string email)
        {
            try
            {
                this.logger.LogInformation(String.Format("Password recover {0}", email));

                var user = await this.userService.GetByEmail(email);

                if (user.Email == email)
                {
                    var newPassword = RandomString.GetRandomString(6);
                    await this.userService.SetNewPassword(user.Id, newPassword);
                    await this.mailService.SendPasswordRecover(user, newPassword);
                }

                return Ok();
            }
            catch (Exception e)
            {
                this.logger.LogError(500, e.Message, e, email);
                return StatusCode(500, "Can't send email");
            }
        }
    }
}
