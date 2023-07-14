using Microsoft.AspNetCore.Mvc;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using System.Collections.Generic;

namespace PraticaNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : Controller
    {
        private readonly ILogLogin _logLogin;
        public LogController(ILogLogin logLogin)
        {
            _logLogin = logLogin;
        }

        [HttpGet("BuscarTentativasLogin")]
        public ActionResult<List<Models.LogsLogin>> BuscarTentativasLogin(int horas)
        {
            if (horas > 24) return BadRequest("Não é possivel consultar mais que 24Horas. Utilize o log diario");
             var log = _logLogin.BuscarTentativasLogin(horas);
            if (log == null) return NotFound("Não existem logins ma data vigente");

            return Ok(log);
        }

        [HttpGet("BuscarLogLoginsDiario")]
        public ActionResult<List<Models.LogsLogin>> BuscarLogLoginsDiario()
        {
            var logins = _logLogin.BuscarTentativasLoginDiario();
            if(logins == null) return NotFound("Não existem logins ma data vigente");

            return Ok(logins);
        }
    }
}
