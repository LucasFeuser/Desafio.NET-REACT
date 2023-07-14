using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityUser> BuscarUsuarioPorId(string id);
        Task<IdentityUser> BuscarUsuarioPorEmail(string email);

        Task<bool> ConfirmarEmail(IdentityUser usuario, string token);
        Task<string> BuscarTokenRecuperacaoSenha(IdentityUser usuario);
        Task<string> BuscarTokenConfirmacaoEmail(IdentityUser usuario);
        Task<bool> MudarSenhaUsuario(IdentityUser usuario, string token, string newPassword);
    }
}
