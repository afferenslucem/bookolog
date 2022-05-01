using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Authentication.Models;
using backend.v2.Exceptions.StorageExceptions;
using backend.v2.Services;
using backend.v2.Utils;
using Microsoft.AspNetCore.Http;

namespace backend.v2.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly ILogger<AuthController> logger;
        private readonly IUserSession userSession;
        private readonly IMailService mailService;

        public AuthController(
            IUserService userService,
            IUserSession userSession,
            IMailService mailService,
            ILogger<AuthController> logger
        ) {
            this.userService = userService;
            this.userSession = userSession;
            this.mailService = mailService;
            this.logger = logger;
        }

        /// <summary>
        /// Аутентифицирует пользователя.
        /// </summary>
        /// <param name="model"></param>
        /// <response code="200">Возвращает данные аутентифицированного пользователя.</response>
        /// <response code="403">Если учетные данные не верны.</response>
        /// <response code="500">Internal server error.</response>
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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

        /// <summary>
        /// Создает нового пользователя.
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// Заметьте, вам не обязательно указывать `avatarName` и `lastSyncTime`.
        /// 
        ///     POST /Auth/Register
        ///     {
        ///       "login": "hrodvitnir",
        ///       "email": "alexshakirov74@gmail.com",
        ///       "password": "qwerty"
        ///     }
        ///     
        /// </remarks>
        /// <response code="201">Возвращает данные нового пользователя.</response>
        /// <response code="400">Если данные конфликтуют с уже существующими пользователями.</response>
        /// <response code="500">Internal server error.</response>
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(typeof(User), 201)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                this.logger.LogDebug($"Register user {user.Login} {user.Email}");

                var result = await this.userService.RegisterUser(user);

                var withoutPrivate = result.WithoutPrivate();

                this.logger.LogDebug(String.Format($"Registered user {user.Login} {user.Email}"));

                return Created(HttpContext.Request.Path, withoutPrivate);
            }
            catch (RegistrationException e)
            {
                this.logger.LogError(400, e.Message, user, e);
                return StatusCode(400, e.Message);
            }
            catch (Exception e)
            {
                this.logger.LogError(500, e.Message, e, user);
                return StatusCode(500, "Can't register user");
            }
        }

        /// <summary>
        /// Изменяет пароль сушествующего пользователя.
        /// </summary>
        /// <param name="changeData"></param>
        /// <response code="401">Если пользователь не авторизован в системе.</response>
        /// <response code="403">Если указан не верный `oldPassword`.</response>
        [HttpPost]
        [Authorize]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
        
        [NonAction]
        public virtual async Task AuthenticateUser(User user)
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
        
        [NonAction]
        public async Task<User> CheckUser(string login, string password)
        {
            return await this.userService.Authenticate(login, password);
        }
        
        /// <summary>
        /// Удаляет сессию пользователя.
        /// </summary>
        [HttpGet]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        /// <summary>
        /// Оправляет новый пароль на указанную почту, если пользователь с такой почтой существует.
        /// </summary>
        /// <param name="email">Почта для отправки пароля.</param>
        [HttpPost]
        [Route("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RecoverPassword([FromBody] string email)
        {
            try
            {
                this.logger.LogInformation($"Password recover {email}");

                var user = await this.userService.GetByEmail(email);

                var newPassword = RandomString.GetRandomString(6);
                await this.userService.SetNewPassword(user.Id, newPassword);
                await this.mailService.SendPasswordRecover(user, newPassword);

                return Ok();
            }
            catch (Exception e)
            {
                return Ok();
            }
        }
    }
}
