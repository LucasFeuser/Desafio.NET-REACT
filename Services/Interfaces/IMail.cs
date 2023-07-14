using Microsoft.AspNetCore.Identity;
using PraticaNetCore.ViewModel.Types;
using System.Threading.Tasks;

namespace PraticaNetCore.Services.Interfaces
{
    public interface IMail
    {
        void SendMail(string email, string subject, string idUsuarioKey, EmailEnum emailTipo, string currentUrl, bool isHtml = false);
    }
}
