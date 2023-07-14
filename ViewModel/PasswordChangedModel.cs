using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace PraticaNetCore.ViewModel
{
    public class PasswordChangedModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

        public string Password { get; set; }
    }
}
