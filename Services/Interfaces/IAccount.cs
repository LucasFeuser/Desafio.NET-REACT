using Microsoft.AspNetCore.Identity;
using PraticaNetCore.ViewModel;
using System.Threading.Tasks;

namespace PraticaNetCore.Services.Interfaces
{
    public interface IAccount
    {
        Task<IdentityUser> BuscarUsuarioPorId(string id);
        Task<IdentityUser> BuscarUsuarioPorEmail(string email);
        bool MudarSenhaUsuario(PasswordChangedModel user);
        Task<bool> ConfirmarEmail(IdentityUser usuario, string token);
        Task<string> BuscarTokenRecuperacaoSenha(IdentityUser usuario);
        Task<string> BuscarTokenConfirmacaoEmail(IdentityUser usuario);
    }
}
