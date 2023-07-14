using Microsoft.AspNetCore.Identity;
using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using System.Threading.Tasks;

namespace PraticaNetCore.Services
{
    public class AccountService : IAccount
    {

        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<string> BuscarTokenConfirmacaoEmail(IdentityUser usuario)
        {
            return await _accountRepository.BuscarTokenConfirmacaoEmail(usuario);
        }

        public async Task<IdentityUser> BuscarUsuarioPorEmail(string email)
        {
            return await _accountRepository.BuscarUsuarioPorEmail(email);
        }

        public async Task<string> BuscarTokenRecuperacaoSenha(IdentityUser usuario)
        {
            return await _accountRepository.BuscarTokenRecuperacaoSenha(usuario);
        }

        public async Task<IdentityUser> BuscarUsuarioPorId(string id)
        {
            return await _accountRepository.BuscarUsuarioPorId(id);
        }

        public async Task<bool> ConfirmarEmail(IdentityUser usuario, string token)
        {
            return await _accountRepository.ConfirmarEmail(usuario, token);
        }

        public bool MudarSenhaUsuario(PasswordChangedModel registro)
        {
            var user = BuscarUsuarioPorEmail(registro.Email).Result;

            if (user == null) return false;

            return _accountRepository.MudarSenhaUsuario(user, registro.Token, registro.Password).Result;
        }
    }
}
