using System.ComponentModel.DataAnnotations;

namespace PraticaNetCore.ViewModel
{
    public class EmailConfirmationModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

        public string CurrentUrl { get; set; }
    }
}
