using Microsoft.AspNetCore.Identity;
using PraticaNetCore.Models;
using PraticaNetCore.ViewModel;
using PraticaNetCore.ViewModel.Types;
using System.Threading.Tasks;

namespace PraticaNetCore.Services.Interfaces
{
    public interface IHelpers
    {
        AutenticacaoEnum EnviarEmailConfirmacao(IdentityUser user, string currentUrl);
        AutenticacaoEnum EnviarEmailUsuarioBloqueado(LoginModel usuario);
    }
}
