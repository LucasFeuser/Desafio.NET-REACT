using FluentEmail.Core;
using Microsoft.AspNetCore.Identity;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using PraticaNetCore.ViewModel.Types;
using System.Security.Principal;
using System.Threading.Tasks;

namespace PraticaNetCore.Services
{
    public class HelpersService : IHelpers
    {
        private readonly IMail _mail;
        private readonly IAccount _account;
        public HelpersService(IAccount account,
                              IMail mail)
        {
            _account = account;
            _mail = mail;
        }

        public AutenticacaoEnum EnviarEmailConfirmacao(IdentityUser user, string currentUrl)
        {
            string token = BuscaToken(user);
            _mail.SendMail(user.Email, "Confirmaçao email", token, EmailEnum.EmailConfirmation, currentUrl, true);
            return AutenticacaoEnum.EmailNaoConfirmado;
        }

        private string BuscaToken(IdentityUser user)
        {
            return _account.BuscarTokenConfirmacaoEmail(user).Result;
        }

        public AutenticacaoEnum EnviarEmailUsuarioBloqueado(LoginModel usuario)
        {
            _mail.SendMail(usuario.Email, @"Alguem tentou logar na sua conta foi voce? Por questoes de segurança seu email foi bloqueado.",
                          "", EmailEnum.AccountLocked, usuario.CurrentUrl, true);

            return AutenticacaoEnum.UsuarioBloqueado;
        }
    }
}
