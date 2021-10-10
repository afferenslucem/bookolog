using System.Web.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.v2.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class PingController : Controller
    {
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IActionResult Ping()
        {
            return Ok("Ah, ha, ha, ha, stayin' alive, stayin' alive");
        }
    }
}