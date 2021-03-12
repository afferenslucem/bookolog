using System.ComponentModel.DataAnnotations;

namespace backend.v2.Models.Authentication
{
    /// <summary>
    /// Модель для авторизации пользователя
    /// </summary>
    public class AuthenticateModel
    {
        [Required]
        public string Login { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
