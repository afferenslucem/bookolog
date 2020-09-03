using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.v2.Models;
using backend.v2.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.v2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            using (BookologContext db = new BookologContext())
            {
                User user1 = new User {
                    Email = "alex",
                    LastAction = DateTime.Now,
                    Login = "admin",
                    PasswordHash = "trololo",
                    Salt = "123"
                };

                // добавляем их в бд
                db.Users.Add(user1);
                db.SaveChanges();

                // получаем объекты из бд и выводим на консоль
                return db.Users.ToList();
            }
        }
    }
}
