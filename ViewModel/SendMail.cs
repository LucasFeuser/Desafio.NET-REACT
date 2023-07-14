using PraticaNetCore.ViewModel.Types;

namespace PraticaNetCore.ViewModel
{
    public class SendMail
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtml { get; set; }
        public  string currentUrl { get; set; }
        public EmailEnum EmailTipo { get; set; }
    }
}
