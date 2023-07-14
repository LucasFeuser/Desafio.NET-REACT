using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        public AccountRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityUser> BuscarUsuarioPorId(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return null;

            return user;
        }

        public async Task<IdentityUser> BuscarUsuarioPorEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return null;

            return user;
        }

        public async Task<bool> MudarSenhaUsuario(IdentityUser usuario, string token, string newPassword)
        {
            var user = await _userManager.ResetPasswordAsync(usuario, token, newPassword);
            if (user == null) return false;

            return user.Succeeded;
        }
         
        public async Task<bool> ConfirmarEmail(IdentityUser usuario, string token)
        {
            var user = await _userManager.ConfirmEmailAsync(usuario, token);
            if (user == null) return false;

            return user.Succeeded;
        }

        public async Task<string> BuscarTokenRecuperacaoSenha(IdentityUser usuario)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(usuario);
        }

        public async Task<string> BuscarTokenConfirmacaoEmail(IdentityUser usuario)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(usuario);
        }
    }
}
