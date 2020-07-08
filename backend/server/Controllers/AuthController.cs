using log4net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Exceptions.Authentication;
using Server.Models;
using Server.Models.Authentication;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Server.Controllers.AuthControllers
{
    [Route("[controller]")]
    public class AuthenticateController : Controller
    {
        private readonly ILog logger = LogManager.GetLogger(typeof(AuthenticateController));
        private readonly IUserService userService;

        public AuthenticateController(IUserService userService)
        {
            this.userService = userService;
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
                this.logger.Info(e);
                return StatusCode(500);
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
        private async Task<User> CheckUser(string login, string password)
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
