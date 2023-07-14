using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using PraticaNetCore.Common.Util;
using PraticaNetCore.Common.Util.Interfaces;
using PraticaNetCore.Services;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using PraticaNetCore.ViewModel.Types;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PraticaNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAuthenticate _authenticate;
        private readonly ITokenFactory _tokenFactory;
        private readonly IDistributedCache _cache;
        private readonly ILogLogin _logLogin;
        private readonly IAccount _account;
        private readonly IMail _mail;

        public AccountController(ITokenFactory tokenFactory,
                                 IAuthenticate authenticate,
                                 IDistributedCache cache,
                                 ILogLogin logLogin,
                                 IAccount account,
                                 IMail mail
                                 )
        {
            _tokenFactory = tokenFactory;
            _authenticate = authenticate;
            _logLogin = logLogin;
            _account = account;
            _cache = cache;
            _mail = mail;
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult> CreateUser(RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("ConfirmPassword", "Senhas não conferem");
                return BadRequest(ModelState);
            }

            var result = await _authenticate.RegisterUser(model.Nome, model.Email, model.Password);

            if (result)
                return Ok($"Usuario {model.Email} criado com sucesso");
            else
            {
                ModelState.AddModelError("CreateUser", "Registro inválido ou já existe");
                return BadRequest(ModelState);
            }
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> LoginUser(LoginModel user)
        {
            var result = await _authenticate.Authenticate(user);

            switch (result)
            {
                case AutenticacaoEnum.EmailNaoConfirmado:
                    _logLogin.LogError(user.Email, "Email não confirmado", false , DateTime.Now);
                    return Ok("Email confirmação enviado.");
                case AutenticacaoEnum.UsuarioBloqueado:
                    _logLogin.LogError(user.Email, "Usuario bloqueado", false, DateTime.Now);
                    return Ok("Usuario de bloqueado.");
                case AutenticacaoEnum.NaoEncotrado:
                    _logLogin.LogError(user.Email, "Usuario não encontrado", false, DateTime.Now);
                    return NotFound();
                case AutenticacaoEnum.CredenciaisInvalidas:
                    _logLogin.LogError(user.Email, "Credenciais invalidas", false, DateTime.Now);
                    return NotFound();
            }


            return _tokenFactory.GenerateToken(user);
        }

        [HttpPost("PasswordChanged")]
        public IActionResult PasswordChanged(PasswordChangedModel register)
        {
            bool trocaSenha = _account.MudarSenhaUsuario(register);         
            
            if (!trocaSenha) return BadRequest("Não foi possivel mudar a senha. Tente novamente mais tarde.");

            return Ok();
        }

        [HttpPost("PasswordRecovery")]
        public async Task<ActionResult> PasswordRecoveryEmail(SendMail sendMail)
        {
            var user = await _account.BuscarUsuarioPorEmail(sendMail.Email);

            if (user == null) return BadRequest("Email para recuperação não encontrado");

            string token = await _account.BuscarTokenRecuperacaoSenha(user);

            try
            {
                _mail.SendMail(sendMail.Email, sendMail.Subject, token, EmailEnum.PasswordReset, sendMail.currentUrl , sendMail.IsHtml);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Format("Erro no envio do email. Erro {0}", ex.InnerException.Message));
            }

            return Ok(user.Id);
        }

        [HttpPost("EmailConfirmation")]
        public async Task<ActionResult> EmailConfirmation(EmailConfirmationModel emailConfirmation)
        {
            var user = await _account.BuscarUsuarioPorEmail(emailConfirmation.Email);

            if (user == null) return BadRequest("Email para confirmação não encontrado. Tente novamente.");

            bool emailConfirm = await _account.ConfirmarEmail(user, emailConfirmation.Token);

            if (!emailConfirm) return BadRequest("Erro no momento da confirmação do email");

            return Ok();
        }
    }
}
