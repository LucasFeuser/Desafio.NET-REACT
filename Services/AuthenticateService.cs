using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;
using PraticaNetCore.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using PraticaNetCore.ViewModel.Types;
using PraticaNetCore.ViewModel;

namespace PraticaNetCore.Services
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly IMail _mail;
        private readonly IHelpers _helpers;
        private readonly IAccountRepository _accountRepository;
        private readonly IAuthenticateRepository _authenticateRepository;


        public AuthenticateService(IAuthenticateRepository authenticateRepository,
                                   IAccountRepository accountRepository,
                                   IHelpers helpers,
                                   IMail mail)
        {
            _authenticateRepository = authenticateRepository;
            _accountRepository = accountRepository;
            _helpers = helpers;
            _mail = mail;
        }

        public async Task<AutenticacaoEnum> Authenticate(LoginModel usuario)
        {
            var user = await _accountRepository.BuscarUsuarioPorEmail(usuario.Email);

            if (user == null) return AutenticacaoEnum.NaoEncotrado;

            var  credenciais = await _authenticateRepository.CheckCredentials(user, usuario.Password);

            if (credenciais.IsLockedOut) return _helpers.EnviarEmailUsuarioBloqueado(usuario);

            if (!credenciais.Succeeded) return AutenticacaoEnum.CredenciaisInvalidas;

            if (!user.EmailConfirmed && credenciais.Succeeded) return _helpers.EnviarEmailConfirmacao(user, usuario.CurrentUrl);

            return AutenticacaoEnum.Aprovado;
        }

        public async Task<bool> RegisterUser(string nome, string email, string password)
        {
            var user = new IdentityUser { UserName = nome, Email = email };

            var buscaUsuario = await _accountRepository.BuscarUsuarioPorEmail(email);

            if (buscaUsuario != null) return false;

            var result = await _authenticateRepository.RegisterUser(user, password);

            if (result == null) return false;

            await _authenticateRepository.SignInAsync(result);
            return true;
        }

        public async Task Logout()
        {
            await _authenticateRepository.Logout();
        }
    }
}
