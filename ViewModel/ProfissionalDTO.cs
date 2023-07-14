
using Challenge.Application.DTOs;
using System.Collections.Generic;

namespace PraticaNetCore.ViewModel
{
    public class ProfissionalDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Especialidade { get; set; }
        public string Identificador { get; set; }
        public ICollection<ProfissionalPaciente> ProfissionalPacientes { get; set; }
    }
}


