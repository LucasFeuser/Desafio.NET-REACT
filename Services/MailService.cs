using Microsoft.Extensions.Options;
using PraticaNetCore.Common.Util;
using PraticaNetCore.Configuration;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel.Types;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace PraticaNetCore.Services
{
    public class MailService : IMail
    {
        private string CURRENTURL = "";

        private bool emailBloqueado = false;
        private Dictionary<int, string> parametrosEmail;

        private readonly EmailSettings _emailSettings;

        public MailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public void SendMail(string email, string subject, string token, EmailEnum emailTipo, string currentUrl, bool isHtml = false )
        {
            string body = string.Empty;

            CURRENTURL = Util.TratarURL(currentUrl);

             PrepararDadosEmail(emailTipo);
            
            if (isHtml) { body = MontarCorpoHtml(email, token); }

            StructSmtp(email, subject, body, isHtml);
        }

        private void TratarUrl()
        {
            string url = "http://localhost:3005/";

            Uri uri = new Uri(url);
        }

        private void StructSmtp(string email, string subject, string body, bool isHtml)
        {
            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(_emailSettings.EmailFromAddress);
                mailMessage.To.Add(email);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = isHtml;
                using (SmtpClient smtp = new SmtpClient(_emailSettings.SmtpAddress, _emailSettings.PortNumber))
                {
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(_emailSettings.EmailFromAddress, _emailSettings.Password);
                    smtp.Send(mailMessage);
                }
            }
        }

        private void PrepararDadosEmail(EmailEnum emailTipo)
        {
            parametrosEmail = new Dictionary<int, string>();

            switch (emailTipo)
            {
                case EmailEnum.EmailConfirmation:
                        parametrosEmail.Add(1, "Confirmação de Email");
                        parametrosEmail.Add(2, "Estamos enviando sua confirmação para autenticação do email.");
                        parametrosEmail.Add(3, "confirmar seu email");
                        parametrosEmail.Add(4, "CONFIRMAR EMAIL");
                        parametrosEmail.Add(5, "<p></p>");
                        parametrosEmail.Add(6, "<p></p>");
                        parametrosEmail.Add(7, "EmailConfirm");
                    break;
                case EmailEnum.PasswordReset:
                        parametrosEmail.Add(1, "Redefinição de senha");
                        parametrosEmail.Add(2, "Recebemos sua solicitação de redefinição de senha do Consultório Pró.");
                        parametrosEmail.Add(3, "redefinir sua senha.");
                        parametrosEmail.Add(4, "REDEFINIR SENHA");
                        parametrosEmail.Add(5, "<p>Esta deve ser uma senha de acesso exclusiva do usuário,que não deve ser compartilhada com terceiros.</p>");
                        parametrosEmail.Add(6, "<p>Se necessário, a senha pode ser alterada posteriormente através do menu 'Alterar minha senha' no Consultório Pró.</p>");
                        parametrosEmail.Add(7, "PasswordChanged");
                    break;
                case EmailEnum.AccountLocked:
                        parametrosEmail.Add(1, "Conta bloqueada!");
                        parametrosEmail.Add(2, "Sua conta foi bloqueada. Os logins excederam o limite permitido");
                        parametrosEmail.Add(3, "redefinir sua senha.");
                        parametrosEmail.Add(4, "REDEFINIR SENHA");
                        parametrosEmail.Add(5, "<p>Esta deve ser uma senha de acesso exclusiva do usuário,que não deve ser compartilhada com terceiros.</p>");
                        parametrosEmail.Add(6, "<p>Se necessário, a senha pode ser alterada posteriormente através do menu 'Alterar minha senha' no Consultório Pró.</p>");
                        parametrosEmail.Add(7, "PasswordChanged");
                        emailBloqueado = true;
                    break;
            }
        }

        private string MontarCorpoHtml(string email, string token)
        {
            var stringBuilder = new StringBuilder();

            stringBuilder.Append("<html>");
            stringBuilder.Append("  <body>");
            stringBuilder.AppendFormat("      <div style=\"{0}\">","width: 330px; height: 430px; background-color: #E1E8E7;");
            stringBuilder.AppendFormat("          <div style=\"{0}\">", "width: 100%; height: 25%; background-color: #3E9F96;");
            stringBuilder.AppendFormat("              <div style=\"{0}\">", "display:flex; justify-content:flex-start; padding: 30px; font-size: 22px; color: #fff");
            stringBuilder.AppendFormat("                  <p> {0} </p>", parametrosEmail[1]);
            stringBuilder.Append("              </div>");
            stringBuilder.Append("          </div>");
            stringBuilder.AppendFormat("            <div style=\"{0}\">", "font-size: 10px; padding:25px");
            stringBuilder.Append("              <p>Olá,</p>");
            stringBuilder.AppendFormat("              <p>{0}</p>", parametrosEmail[2]);
            stringBuilder.AppendFormat("              <p>Clique no botão abaixo para {0}</p>", parametrosEmail[3]);
            stringBuilder.AppendFormat("              <div style=\"{0}\">", "display:flex; padding-left: 4vw;");
            stringBuilder.AppendFormat("              <button style=\"{0}\">", "border-radius:17px; background: #3E9F96; box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25); color: #fff; border: none; padding:10px; text-align:center; display:inline-block; font-size:16px; margin:4px 2px; cursor: pointer;");      
            
            if(!emailBloqueado)
                stringBuilder.AppendFormat("                <a style=\"{0}\" href=\"{1}\">{2}</a>","font-size: 15px; text-decoration:none; color:#fff", $"//{CURRENTURL}/{parametrosEmail[7]}?token={HttpUtility.UrlEncode(token)}&email={HttpUtility.UrlEncode(email)}", parametrosEmail[4]);
            
            stringBuilder.Append("              </button>");
            stringBuilder.Append("              </div>");
            stringBuilder.AppendFormat("              <div style=\"{0}\">", "color: rgba(0, 0, 0, 0.74);");
            stringBuilder.AppendFormat("                {0}", parametrosEmail[5]);
            stringBuilder.AppendFormat("                {0}", parametrosEmail[6]);
            stringBuilder.Append("              </div>");
            stringBuilder.Append("            </div>");
            stringBuilder.Append("      </div>");
            stringBuilder.Append("  </body>");
            stringBuilder.Append("</html>	");

            parametrosEmail.Clear();
            return stringBuilder.ToString();
        }

    }
}
