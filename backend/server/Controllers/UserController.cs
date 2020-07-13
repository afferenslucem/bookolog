using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IUserSession session;
        private IBookService bookService;

        public UserController(IUserSession session, IBookService bookService)
        {
            this.session = session;
            this.bookService = bookService;
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<User>> Me()
        {
            try
            {
                var user = await session.GetUser();

                return Ok(user);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}