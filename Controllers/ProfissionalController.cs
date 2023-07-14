using Microsoft.AspNetCore.Mvc;
using PraticaNetCore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PraticaNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfissionalController : Controller
    {
        private readonly IProfissional _profissional;
        public ProfissionalController(IProfissional profissional)
        {
            _profissional = profissional;
        }

        [HttpGet]
        public async Task Consultas()
        {
            throw new NotImplementedException();
        }

        [HttpPost("LogOut")]
        public async Task LogOut()
        {

        } 
    }
}
