using System.ComponentModel.DataAnnotations;

namespace backend.v2.Models.Authentication
{
    /// <summary>
    /// Модель для смены пароля пользователя
    /// </summary>
    public class PasswordChangeModel
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
