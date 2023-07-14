using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using PraticaNetCore.ViewModel.Types;

namespace PraticaNetCore.Controllers
{
    [ApiController]
    [Route("api/Helper")]
    public class HelperController : Controller
    {
        #region CONSTANTS
        private const string EMAILCONFIRMSENDSUBJECT = "Confirmação de email";
        #endregion

        private readonly IMail _mailService;

        public HelperController(IMail mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("EmailSend")]
        public IActionResult SendEmail(SendMail sendMail)
        {

            _mailService.SendMail(sendMail.Email, "Teste", "Teste", EmailEnum.Generic, sendMail.currentUrl, false);

            return Ok();
        }
    }
}
