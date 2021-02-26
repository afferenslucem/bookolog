using System.ComponentModel.DataAnnotations;

namespace backend.v2.Models.Authentication
{
    public class PasswordChangeModel
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
